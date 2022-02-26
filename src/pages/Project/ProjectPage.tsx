import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Error from "../../components/Form/Error";
import Loading from "../../components/Loading";
import AddProject from "../../components/Project/AddProject";
import ProjectListItem from "../../components/Project/ProjectListItem";
import useAuthCookies from "../../hooks/useAuthCookies";
import useFetch from "../../hooks/useFetch";
import { ErrorFetched, MessageFetched } from "../../interface/errorInterface";
import { ProjectInterface } from "../../interface/projectInterface";
import { checkOnlineStatus } from "../../socket";
import {
  fetch_project_failure,
  fetch_project_request,
  fetch_project_sucess,
} from "../../store/project/projectAction";

const ProjectPage: React.FC = () => {
  useAuthCookies();
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  useFetch(
    {
      method: "GET",
      pathname: "getProjectsOfUser/" + auth.user_id,
    },
    handlePreFetch,
    handlePostFetch,
    null
  );

  const projectsState = useSelector((state: RootStateOrAny) => state.projects);
  const { projects, loading, error } = projectsState;

  useEffect(() => {
    checkOnlineStatus(auth);
  }, [auth]);

  const dispatch = useDispatch();
  function handlePreFetch() {
    dispatch(fetch_project_request());
  }
  function handlePostFetch(
    data: Array<ProjectInterface> | ErrorFetched | MessageFetched
  ) {
    if ("error" in data || "message" in data) {
      return handleFailure(data);
    }
    dispatch(fetch_project_sucess(data));
  }
  function handleFailure(data: ErrorFetched | MessageFetched) {
    dispatch(fetch_project_failure(data));
  }

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          {error === "" ? (
            projects.map((project: ProjectInterface) => (
              <ProjectListItem key={project._id} project={project} />
            ))
          ) : (
            <>
              <Error message={error} />
            </>
          )}
        </>
      )}
      <AddProject />
    </>
  );
};

export default ProjectPage;
