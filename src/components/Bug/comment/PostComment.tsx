import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../../api";
import {
  post_bug_comment_failure,
  post_bug_comment_request,
  post_bug_comment_success,
} from "../../../store/bug/bugAction";
import ButtonUI from "../../ButtonUI";
import Editor from "./Editor";

interface Props {
  bug_id: string | undefined;
}

const PostComment = (props: Props) => {
  const { bug_id } = props;
  const [value, setValue] = useState("");
  const [output, setOutput] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  const loading = useSelector(
    (state: RootStateOrAny) => state.bug.bug.comments.loading
  );
  const project_id = useSelector(
    (state: RootStateOrAny) => state.project.project._id
  );

  function handlePreFetch() {
    dispatch(post_bug_comment_request());
  }

  function handlePostFetch(data: any) {
    if ("error" in data || "message" in data) {
      handleFailure(data);
    }
    dispatch(post_bug_comment_success(data));
    setValue("");
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
        project_id,
      })
      .then((res) => {
        const { data } = res;
        handlePostFetch(data);
      });
  }

  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute(
      "style",
      "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
    );
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(this: any) {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  return (
    <>
      <>
        <Box border={"2px solid #4299E1"} height="auto" minHeight={"300px"}>
          <Button onClick={() => setOutput(false)}>Editor</Button>
          <Button onClick={() => setOutput(true)}>Markdown</Button>
          {output === false ? (
            <span>
              <Textarea
                id="comment-textarea"
                value={value}
                height={"auto"}
                minHeight={"300px"}
                overflow="hidden"
                resize={"vertical"}
                onChange={(event) => setValue(event.target.value)}
              />
            </span>
          ) : (
            <Editor text={value} />
          )}
        </Box>
      </>

      <ButtonUI
        isLoading={loading}
        loadingText="Posting"
        onClick={handlePost}
        value="Post"
        backgroundColor="cyan.400"
        borderRadius="20px"
      />
    </>
  );
};

export default PostComment;
