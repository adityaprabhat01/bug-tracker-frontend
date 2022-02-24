import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Wrap,
} from "@chakra-ui/react";
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
import AddMemberBug from "../../components/Bug/member/AddMemberBug";
import Body from "../../components/Bug/Body";
import BugMember from "../../components/Bug/member/BugMember";
import Comment from "../../components/Bug/comment/Comment";
import PostComment from "../../components/Bug/comment/PostComment";
import Label from "../../components/Bug/Label/Label";
import useAuthCookies from "../../hooks/useAuthCookies";
import Status from "../../components/Bug/Status";
import { checkOnlineStatus } from "../../socket";
import { useEffect } from "react";
import {
  fetch_select_project_request,
  fetch_select_project_success,
} from "../../store/selectProject.tsx/selectProjectAction";
import Member from "../../components/Project/Member";
import CloseBug from "../../components/Bug/CloseBug";
import BugMenu from "../../components/Bug/BugMenu";
import AddLabel from "../../components/Bug/Label/AddLabel";
import MemberList from "../../components/MemberList";
import Sidebar from "../../components/Sidebar";

const BugPage = () => {
  const { bug_id } = useParams<{ bug_id?: string }>();
  useAuthCookies();
  useFetch(
    {
      pathname: "/getBug/" + bug_id,
      method: "GET",
    },
    handlePreFetch,
    handlePostFetch,
    null
  );

  const dispatch = useDispatch();
  const loading = useSelector((state: RootStateOrAny) => state.bug.loading);
  const error = useSelector((state: RootStateOrAny) => state.bug.error);
  const bug = useSelector((state: RootStateOrAny) => state.bug.bug);
  const auth = useSelector((state: RootStateOrAny) => state.auth);

  useEffect(() => {
    checkOnlineStatus(auth);
  }, [auth]);

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

  return (
    <>
      <Grid templateColumns="repeat(11, 1fr)" gap={2}>
        {loading === true ? (
          <GridItem colStart={6} colEnd={8}>
            <Box marginTop={"300px"}>
              <Loading />
            </Box>
          </GridItem>
        ) : (
          <>
            <GridItem colStart={0} colEnd={2}>
              <Box>
                <Sidebar />
              </Box>
            </GridItem>
            <GridItem colStart={3} colEnd={8}>
              <HStack>
                <Heading>{bug.title}</Heading>
                <Status isOpen={bug.isOpen} />
                <BugMenu>
                  <CloseBug bug_id={bug_id} isOpen={bug.isOpen} />
                  <AddLabel labels={bug.labels} />
                </BugMenu>
              </HStack>

              <About user={bug.user} />
              <Label />

              <Body />
            </GridItem>

            <GridItem colStart={9} colEnd={12}>
              <Wrap mt={4}>
                {bug.members.members.map((member: User) => (
                  <Member key={member._id} member={member} />
                ))}
              </Wrap>
              <HStack mt={3}>
                <AddMemberBug bug_id={bug._id} />
                <MemberList {...bug.members} source={"BugPage"} />
              </HStack>
            </GridItem>

            <GridItem colStart={3} colEnd={9} mt={2}>
              {bug.comments.comments.map((comment: CommentInterface) => (
                <Box key={comment._id}>
                  <Comment comment={comment} />
                  <Box height={"50px"} ml="40px">
                    <Divider
                      orientation="vertical"
                      borderLeftWidth="2px"
                      borderLeftColor={"#535353"}
                    />
                  </Box>
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
