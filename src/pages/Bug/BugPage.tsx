import { Box, Grid, GridItem } from "@chakra-ui/react";
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
import About from "../../components/About";
import Loading from "../../components/Loading";
import Title from "../../components/Title";
import AddMemberBug from "../../components/Bug/member/AddMemberBug";
import Body from "../../components/Bug/Body";
import BugMember from "../../components/Bug/member/BugMember";
import Comment from "../../components/Bug/comment/Comment";
import PostComment from "../../components/Bug/comment/PostComment";
import Label from "../../components/Bug/Label/Label";
import useAuthCookies from "../../hooks/useAuthCookies";
import Status from "../../components/Bug/Status";

const BugPage = () => {
  useAuthCookies();
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
      <Grid templateColumns="repeat(11, 1fr)" gap={2}>
        {loading === true ? (
          <Loading />
        ) : (
          <>
            <GridItem colStart={3} colEnd={8}>
              <Title title={bug.title} />
              <About user={bug.user} />
              <Label />
              <Status isOpen={bug.isOpen} />
              <Body />
            </GridItem>

            <GridItem colStart={9} colEnd={12}>
              {bug.members.members.map((member: User) => (
                <BugMember key={member._id} member={member} />
              ))}
              <AddMemberBug bug_id={bug._id} />
            </GridItem>

            <GridItem colStart={3} colEnd={9}>
              
              {bug.comments.comments.map((comment: CommentInterface) => (
                <Box mt={3}>
                  <Comment key={comment._id} comment={comment} />
                </Box>
              ))}
              <PostComment bug_id={bug_id} />
            </GridItem>
          </>
        )}
      </Grid>
    </>
  );
};

export default BugPage;
