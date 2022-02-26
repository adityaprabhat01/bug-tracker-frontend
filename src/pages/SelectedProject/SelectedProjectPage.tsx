import {
  AvatarGroup,
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Wrap,
} from "@chakra-ui/react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddBug from "../../components/Bug/AddBug";
import BugListItem from "../../components/Bug/BugListItem";
import About from "../../components/About";
import Loading from "../../components/Loading";
import AddMember from "../../components/Project/AddMember";
import Body from "../../components/Project/Body";
import Member from "../../components/Project/Member";
import useFetch from "../../hooks/useFetch";
import {
  BugInterface,
  selectProjectInitStateInterface,
  ProjectInterface,
} from "../../interface/projectInterface";
import { User } from "../../interface/userInterface";
import {
  fetch_select_project_failure,
  fetch_select_project_request,
  fetch_select_project_success,
} from "../../store/selectProject.tsx/selectProjectAction";
import Date from "../../components/Date";
import useAuthCookies from "../../hooks/useAuthCookies";
import { checkOnlineStatus } from "../../socket";
import { useEffect } from "react";
import MemberList from "../../components/MemberList";
import TechStack from "../../components/Project/TechStack";
import Sidebar from "../../components/Sidebar";
import Error from "../../components/Form/Error";
import { ErrorFetched, MessageFetched } from "../../interface/errorInterface";

const startCol = [3, 6, 9];
const endCol = [6, 9, 12];

const Project: React.FC = () => {
  useAuthCookies();
  const { project_id } = useParams<{ project_id?: string }>();
  let selectedProject: selectProjectInitStateInterface = useSelector(
    (state: RootStateOrAny) => state.project
  );
  const { project, loading, error } = selectedProject;
  useFetch(
    {
      method: "GET",
      pathname: "/getProject/" + project_id,
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
    dispatch(fetch_select_project_request());
  }
  function handlePostFetch(
    data: ProjectInterface | ErrorFetched | MessageFetched
  ) {
    if ("error" in data || "message" in data) {
      return handleFailure(data);
    }
    dispatch(fetch_select_project_success(data));
  }
  function handleFailure(data: ErrorFetched | MessageFetched) {
    dispatch(fetch_select_project_failure(data));
  }

  return (
    <>
      <Grid templateColumns="repeat(11, 1fr)">
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
                  <>
                    <HStack>
                      <Heading>{project.title}</Heading>
                    </HStack>

                    <About user={project.user} />
                    <Date dateCreated={project.date_opened} />
                    <Body
                      body={project.body.body}
                      user={project.user}
                      techStack={project.techStack.techStack}
                      project_id={project._id}
                    />

                    <AddBug />
                  </>
                </GridItem>
                <GridItem colStart={9} colEnd={12}>
                  <Wrap mt={4}>
                    <AvatarGroup max={4}>
                      {project.members.members.map((member: User) => (
                        <Member key={member._id} member={member} />
                      ))}
                    </AvatarGroup>
                  </Wrap>

                  <br />
                  <HStack mt={3}>
                    <AddMember />
                    <MemberList
                      {...project.members}
                      source={"SelectedProjectPage"}
                    />
                  </HStack>
                  <Box mt={"3"}>
                    <TechStack stack={project.techStack.techStack} />
                  </Box>
                </GridItem>

                {project.bugs.bugs.map((bug: BugInterface, i: number) => (
                  <BugListItem
                    key={bug._id}
                    bug={bug}
                    colStart={startCol[i % 3]}
                    colEnd={endCol[i % 3]}
                  />
                ))}
                
              </>
            ) : (
              <GridItem colStart={6} colEnd={8}>
                <Box marginTop={"300px"}>
                  <Error message={error} />
                </Box>
              </GridItem>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default Project;
