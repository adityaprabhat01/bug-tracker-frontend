import { Box } from "@chakra-ui/react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { CommentInterface } from "../../interface/bugInterface";
import { User } from "../../interface/userInterface";
import {
  bug_fetch_failure,
  bug_fetch_request,
  bug_fetch_success,
} from "../../store/bug/bugAction";
import About from "../About";
import Loading from "../Loading";
import Title from "../Title";
import AddMemberBug from "./member/AddMemberBug";
import Body from "./Body";
import BugMember from "./member/BugMember";
import Comment from "./comment/Comment";
import PostComment from "./comment/PostComment";
import Label from "./Label/Label";

const Bug = () => {
  const { bug_id } = useParams<{ bug_id?: string }>();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootStateOrAny) => state.bug.loading);
  const error = useSelector((state: RootStateOrAny) => state.bug.error);
  const bug = useSelector((state: RootStateOrAny) => state.bug.bug);

  function handlePreFetch() {
    dispatch(bug_fetch_request());
  }

  function handlePostFetch(data: any) {
    if ("error" in data || "message" in data) {
      return handleFailure(data);
    }
    dispatch(bug_fetch_success(data));
  }

  function handleFailure(data: any) {
    dispatch(bug_fetch_failure(data));
  }
  useFetch(
    {
      pathname: "/getBug/" + bug_id,
      method: "GET",
    },
    handlePreFetch,
    handlePostFetch,
    null
  );
  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          <Box>
            <Title title={bug.title} />
          </Box>
          <About user={bug.user} />
          <Label />
          <Box>Status:</Box>
          {bug.isOpen.isOpen === true ? (
            <Box color={"green.400"}>Open</Box>
          ) : (
            <Box color={"red.400"}>Closed</Box>
          )}
          <Body />
          <AddMemberBug bug_id={bug._id} />
          {bug.members.members.map((member: User) => (
            <BugMember key={member._id} member={member} />
          ))}
          <PostComment bug_id={bug_id} />
          {bug.comments.comments.map((comment: CommentInterface) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </>
      )}
    </>
  );
};

export default Bug;
