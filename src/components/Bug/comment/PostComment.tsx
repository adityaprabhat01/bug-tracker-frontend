import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../../api";
import {
  post_bug_comment_failure,
  post_bug_comment_request,
  post_bug_comment_success,
} from "../../../store/bug/bugAction";
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
  const loading = useSelector((state: RootStateOrAny) => state.bug.bug.comments.loading);
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
    setValue("")
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

  return (
    <>
      <>
        <Box border={"2px solid #4299E1"} height="200px" overflow={"scroll"}>
          <Button onClick={() => setOutput(false)}>Editor</Button>
          <Button onClick={() => setOutput(true)}>Markdown</Button>
          {output === false ? (
            <Textarea value={value} height={"140px"} onChange={(event) => setValue(event.target.value)} />
          ) : (
            <Editor text={value} />
          )}
        </Box>
      </>

      <Button isLoading={loading} loadingText='Posting' onClick={handlePost}>Post</Button>
    </>
  );
};

export default PostComment;
