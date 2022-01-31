import { Box, Heading } from "@chakra-ui/react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import AddMember from "../../components/Project/AddMember";
import ProjectMember from "../../components/Project/ProjectMembers";
import useFetch from "../../hooks/useFetch";
import { selectProjectInitStateInterface } from "../../interface/projectInterface";
import { User } from "../../interface/userInterface";
import {
  fetch_select_project_request,
  fetch_select_project_success,
} from "../../store/selectProject.tsx/selectProjectAction";
import { isObjectEmpty } from "../../utils";

const Project = () => {
  const { project_id } = useParams<{ project_id?: string }>();
  const dispatch = useDispatch();

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
      error
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
      {project.loading === true ? <Loading /> : null}
      <Heading>{project.title}</Heading>
      <Box>{project.body}</Box>
      <Box>{project.dateCreated}</Box>
      <AddMember />
      {
        project.members.map((member: User) => <ProjectMember key={member._id} member={member} />)
      }
    </>
  );
};

export default Project;
