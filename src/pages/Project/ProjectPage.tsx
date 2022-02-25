import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import AddProject from "../../components/Project/AddProject";
import ProjectListItem from "../../components/Project/ProjectListItem";
import useAuthCookies from "../../hooks/useAuthCookies";
import useFetch from "../../hooks/useFetch";
import { ProjectInterface } from "../../interface/projectInterface";
import { checkOnlineStatus } from "../../socket";
import {
  fetch_project_request,
  fetch_project_sucess,
} from "../../store/project/projectAction";

const ProjectPage = () => {
  useAuthCookies();
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  const dispatch = useDispatch();
  const store = useSelector(handleSelectors);

  useEffect(() => {
   checkOnlineStatus(auth)
  }, [auth]);

  function handleSelectors(state: {
    auth: { user_id: any };
    projects: { projects: any; loading: any };
  }) {
    const user_id = state.auth.user_id;
    const projects = state.projects.projects;
    const loading = state.projects.loading;
    return { user_id, projects, loading };
  }

  function handlePreFetch() {
    dispatch(fetch_project_request());
  }

  function handlePostFetch(data: any) {
    dispatch(fetch_project_sucess(data));
  }

  useFetch(
    {
      method: "GET",
      pathname: "getProjectsOfUser" + "/" + store.user_id,
    },
    handlePreFetch,
    handlePostFetch,
    {}
  );

  return (
    <>
      ProjectPage
      {store.loading === true ? (
        <Loading />
      ) : (
        store.projects.map((project: ProjectInterface) => (
          <ProjectListItem key={project._id} project={project} />
        ))
      )}
      <AddProject />
    </>
  );
};

export default ProjectPage;
