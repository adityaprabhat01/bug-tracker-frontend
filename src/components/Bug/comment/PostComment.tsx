import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Link,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../../api";
import { socket } from "../../../socket";
import {
  post_bug_comment_failure,
  post_bug_comment_request,
  post_bug_comment_success,
} from "../../../store/bug/bugAction";
import { MENTION_REGEX } from "../../../utils";
import ButtonUI from "../../ButtonUI";
import Editor from "./Editor";
import MentionItem from "./MentionItem";

interface Props {
  bug_id: string | undefined;
}

const PostComment = (props: Props) => {
  const { bug_id } = props;
  const [value, setValue] = useState("");
  const [output, setOutput] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const params = useParams<{ project_id: string }>();

  const dispatch = useDispatch();
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  const members = useSelector(
    (state: RootStateOrAny) => state.project.project.members
  );
  const loading = useSelector(
    (state: RootStateOrAny) => state.bug.bug.comments.loading
  );
  const project_id = useSelector(
    (state: RootStateOrAny) => state.project.project._id
  );

  function handleOnChange(event: any) {
    const val = event.target.value;
    let temp = val.match(MENTION_REGEX);
    if (temp !== null) {
      setShowMembers(true);
    } else {
      setShowMembers(false);
    }
    setValue(val);
  }

  function handleMention(username: string) {
    let x = value;
    let temp = value.match(MENTION_REGEX);
    if (temp !== null) {
      const str = temp[0].slice(1, temp[0].length);
      const y = `[${username}](${"http://localhost:3000"}/user/${username})`;
      x = x.replace(str, y);
      setValue(x);
    }
  }

  function handlePreFetch() {
    dispatch(post_bug_comment_request());
  }

  function handlePostFetch(data: any) {
    if ("error" in data || "message" in data) {
      handleFailure(data);
    }
    dispatch(post_bug_comment_success(data));
    setValue("");
    const tx = document.getElementsByTagName("textarea");
    tx[0].setAttribute("style", "height:" + "300px");
  }

  function handleFailure(data: { error: string; message: string }) {
    dispatch(post_bug_comment_failure(data));
  }

  function handlePost() {
    handlePreFetch();
    api
      .post("postComment", {
        body: value,
        bug_id,
        user: {
          name: auth.name,
          user_id: auth.user_id,
          username: auth.username,
        },
        project_id: params.project_id,
        activity: {
          isActivity: false,
          value: "",
        },
      })
      .then((res) => {
        const { data } = res;
        handlePostFetch(data);
        socket.emit("comment-on-bug", {
          members,
          auth: auth.user_id,
          bug_id,
        });
      });
  }

  function increaseHeight() {
    function OnInput(this: any) {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }

    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        "style",
        "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
      );
      tx[i].addEventListener("input", OnInput, false);
    }
  }

  return (
    <>
      <>
        <Box
          border={"2px solid #717475"}
          borderRadius={"5px"}
          height="auto"
          minHeight={"300px"}
          mb={4}
          padding={2}
        >
          <HStack>
            <Wrap>
              <WrapItem>
                <Avatar size="sm" name={auth.name} />
              </WrapItem>
            </Wrap>
            <Center
              variant="ghost"
              onClick={() => setOutput(false)}
              _hover={{
                backgroundColor: "#ebedf0",
                cursor: "pointer",
                borderRadius: "4px",
              }}
              width={"4rem"}
              height={"2rem"}
              padding={1}
              borderBottom={output === false ? "2px" : ""}
            >
              Editor
            </Center>
            <Center
              variant="ghost"
              onClick={() => setOutput(true)}
              _hover={{
                backgroundColor: "#ebedf0",
                cursor: "pointer",
                borderRadius: "4px",
              }}
              width={"5rem"}
              height={"2rem"}
              padding={1}
              borderBottom={output === true ? "2px" : ""}
            >
              Markdown
            </Center>
          </HStack>
          {output === false ? (
            <span>
              <Textarea
                id="comment-textarea"
                value={value}
                height={"auto"}
                minHeight={"300px"}
                resize={"vertical"}
                onChange={handleOnChange}
                onFocus={increaseHeight}
                backgroundColor={"#ebedf0"}
                maxHeight="auto"
                mt={2}
              />
              {showMembers === true
                ? members.map((member: any) => (
                    <MentionItem
                      key={member._id}
                      member={member}
                      handleMention={handleMention}
                    />
                  ))
                : null}
            </span>
          ) : (
            <Box>
              <Editor text={value} />
            </Box>
          )}

          <Box padding={2}>
            <ButtonUI
              isLoading={loading}
              loadingText="Posting"
              handleClick={handlePost}
              value="Post"
              backgroundColor="cyan.400"
              borderRadius="20px"
            />
          </Box>
        </Box>
      </>
    </>
  );
};

export default PostComment;
