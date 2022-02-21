import { Box, Grid, GridItem, Heading, HStack, Wrap } from "@chakra-ui/react";
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
} from "../../interface/projectInterface";
import { User } from "../../interface/userInterface";
import {
  fetch_select_project_request,
  fetch_select_project_success,
} from "../../store/selectProject.tsx/selectProjectAction";
import { isObjectEmpty } from "../../utils";
import Date from "../../components/Date";
import useAuthCookies from "../../hooks/useAuthCookies";
import { checkOnlineStatus } from "../../socket";
import { useEffect, useState } from "react";
import ProjectMenu from "../../components/Project/ProjectMenu";
import MemberList from "../../components/MemberList";
import TechStack from "../../components/Project/TechStack";

const startCol = [3, 6, 9];
const endCol = [6, 9, 12];

const Project = () => {
  useAuthCookies();
  const { project_id } = useParams<{ project_id?: string }>();
  const dispatch = useDispatch();

  const auth = useSelector((state: RootStateOrAny) => state.auth);

  useEffect(() => {
    checkOnlineStatus(auth);
  }, [auth]);

  function handleSelector(state: selectProjectInitStateInterface) {
    if (isObjectEmpty(state)) return;
    const { project, loading, error } = state;
    const { _id, title, user, body, bugs, dateCreated, members, techStack } =
      project;
    return {
      _id,
      title,
      user,
      body,
      bugs,
      dateCreated,
      members,
      techStack,
      loading,
      error,
    };
  }

  let project = useSelector((state: RootStateOrAny) => state.project);
  project = handleSelector(project);

  function handlePreFetch() {
    dispatch(fetch_select_project_request());
  }

  function handlePostFetch(data: any) {
    dispatch(fetch_select_project_success(data));
  }

  useFetch(
    {
      method: "GET",
      pathname: "/getProject/" + project_id,
    },
    handlePreFetch,
    handlePostFetch,
    null
  );

  return (
    <>
      <Grid templateColumns="repeat(11, 1fr)">
        {project.loading === true ? (
          <GridItem colStart={6} colEnd={8}>
            <Box marginTop={"300px"}>
              <Loading />
            </Box>
          </GridItem>
        ) : (
          <>
            <GridItem colStart={3} colEnd={8}>
              <>
                <HStack>
                <Heading>{project.title}</Heading>
                <ProjectMenu>
                  <MemberList />
                  <MemberList />
                </ProjectMenu>
                </HStack>
                
                <About user={project.user} />
                <Date dateCreated={project.dateCreated} />
                <Body
                  body={project.body}
                  user={project.user}
                  techStack={project.techStack}
                  project_id={project._id}
                />
                
                <AddBug />
              </>
            </GridItem>

            <GridItem colStart={9} colEnd={12}>
              <Wrap>
                {project.members.map((member: User) => (
                  <Member key={member._id} member={member} />
                ))}
              </Wrap>

              <br />
              <AddMember />
              <Box mt={"3"}>
        <TechStack stack={project.techStack} />
      </Box>
            </GridItem>

            {project.bugs.map((bug: BugInterface, i: number) => (
              <BugListItem
                key={bug._id}
                bug={bug}
                colStart={startCol[i % 3]}
                colEnd={endCol[i % 3]}
              />
            ))}
          </>
        )}
      </Grid>
    </>
  );
};

export default Project;
