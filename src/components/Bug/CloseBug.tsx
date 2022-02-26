import { Box } from "@chakra-ui/react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import { ErrorFetched, MessageFetched } from "../../interface/errorInterface";
import { close_bug_failure, close_bug_request, close_bug_success, post_bug_comment_success } from "../../store/bug/bugAction";

interface Props {
  bug_id: string | undefined;
  isOpen: any;
}

const CloseBug = (props: Props) => {
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  const params = useParams<{project_id: string}>();

  const dispatch = useDispatch();
  function handlePreFetch() {
    dispatch(close_bug_request());
  }
  function handlePostFetch(values: any) {
    if("message" in values[0].data || "message" in values[1].data) {
      handlePostFailure(values[0].data);
    } else {
      dispatch(close_bug_success(values[0].data));
      dispatch(post_bug_comment_success(values[1].data));
    }
  }
  function handlePostFailure(data: MessageFetched | ErrorFetched) {
    dispatch(close_bug_failure(data));
  }

  
  function handleCloseBug() {
    handlePreFetch();
    Promise.all([
      api
      .post("closeBug", {
        bug_id,
        user_id: auth.user_id,
      }),
      api.post("postComment", {
        user: {
          name: auth.name,
          username: auth.username,
          user_id: auth.user_id
        },
        body: `${auth.username} closed the bug`,
        project_id: params.project_id,
        bug_id,
        activity: {
          isActivity: true,
          value: "close"
        }
      })
    ]).then(values => {
      handlePostFetch(values);
    }).catch(err => {})
  }

  function handleReOpenBug() {
    Promise.all([
      api
      .post("reopenBug", {
        bug_id,
        user_id: auth.user_id,
      }),
      api.post("postComment", {
        user: {
          name: auth.name,
          username: auth.username,
          user_id: auth.user_id
        },
        body: `${auth.username} reopened the bug`,
        project_id: params.project_id,
        bug_id,
        activity: {
          isActivity: true,
          value: "open"
        }
      })
    ]).then(values => {
      handlePostFetch(values);
    }).catch(err => {})
  }
  const { bug_id, isOpen } = props;
  return (
    <>
      {isOpen.isOpen === true ? (
        <Box width={"100%"} onClick={handleCloseBug}>Close Bug</Box>
      ) : (
        <Box width={"100%"} onClick={handleReOpenBug}>Reopen Bug</Box>
      )}
    </>
  );
};

export default CloseBug;
