import {
  AvatarGroup,
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
import Comment from "../../components/Bug/comment/Comment";
import PostComment from "../../components/Bug/comment/PostComment";
import Label from "../../components/Bug/Label/Label";
import useAuthCookies from "../../hooks/useAuthCookies";
import Status from "../../components/Bug/Status";
import { checkOnlineStatus } from "../../socket";
import { useEffect } from "react";
import Member from "../../components/Project/Member";
import CloseBug from "../../components/Bug/CloseBug";
import BugMenu from "../../components/Bug/BugMenu";
import AddLabel from "../../components/Bug/Label/AddLabel";
import MemberList from "../../components/MemberList";
import Sidebar from "../../components/Sidebar";
import Error from "../../components/Form/Error";
import { ErrorFetched, MessageFetched } from "../../interface/errorInterface";
import { BugInterface } from "../../interface/projectInterface";
import { motion } from "framer-motion";

const variants = {
  // visible: {
  //   transition: { staggerChildren: 0.5 }
  // },
  // hidden: {
  //   transition: { staggerChildren: 0.05, staggerDirection: -1 }
  // }
};

const MotionBox = motion(Box);

const BugPage: React.FC = () => {
  useAuthCookies();
  const bugState = useSelector((state: RootStateOrAny) => state.bug);
  const { bug, loading, error } = bugState;
  const { bug_id } = useParams<{ bug_id?: string }>();

  useFetch(
    {
      pathname: "/getBug/" + bug_id,
      method: "GET",
    },
    handlePreFetch,
    handlePostFetch,
    null
  );

  const auth = useSelector((state: RootStateOrAny) => state.auth);
  useEffect(() => {
    checkOnlineStatus(auth);
  }, [auth]);

  const dispatch = useDispatch();
  function handlePreFetch() {
    dispatch(bug_fetch_request());
  }
  function handlePostFetch(data: BugInterface | MessageFetched | ErrorFetched) {
    if ("error" in data || "message" in data) {
      return handleFailure(data);
    }
    dispatch(bug_fetch_success(data));
  }
  function handleFailure(data: ErrorFetched | MessageFetched) {
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
            {error === "" ? (
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
                    <AvatarGroup max={4}>
                      {bug.members.members.map((member: User) => (
                        <Member key={member._id} member={member} />
                      ))}
                    </AvatarGroup>
                  </Wrap>
                  <HStack mt={3}>
                    <AddMemberBug bug_id={bug._id} />
                    <MemberList {...bug.members} source={"BugPage"} />
                  </HStack>
                </GridItem>
                <GridItem colStart={3} colEnd={9} mt={2}>
                  <MotionBox variants={variants} animate="visible" initial="hidden">
                    {bug.comments.comments.map((comment: CommentInterface) => (
                      <>
                        <Comment key={comment._id} comment={comment} />
                        <Box height={"50px"} ml="40px">
                          <Divider
                            orientation="vertical"
                            borderLeftWidth="2px"
                            borderLeftColor={"#535353"}
                          />
                        </Box>
                      </>
                    ))}
                    <PostComment bug_id={bug_id} />
                  </MotionBox>
                  
                </GridItem>
              </>
            ) : (
              <>
                <GridItem colStart={6} colEnd={8}>
                  <Box marginTop={"300px"}>
                    <Error message={error} />
                  </Box>
                </GridItem>
              </>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default BugPage;
