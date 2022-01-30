import { Box, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {
  fetch_select_project_request,
  fetch_select_project_success,
} from "../../store/selectProject.tsx/selectProjectAction";

const Project = () => {
  const { project_id } = useParams<{ project_id?: string }>();
  const dispatch = useDispatch();

  function handleSelector(state: { project: { project: any; }; }) {
    const { project } = state.project;
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
    };
  }

  const store = useSelector(handleSelector);
  

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
      <Heading>
        {store.title}
      </Heading>
      <Box>
        {store.body}
      </Box>
      <Box>
        {store.dateCreated}
      </Box>
    </>
  );
};

export default Project;
