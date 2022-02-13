import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import AddProject from "../../components/Project/AddProject";
import ProjectListItem from "../../components/Project/ProjectListItem";
import useAuthCookies from "../../hooks/useAuthCookies";
import useFetch from "../../hooks/useFetch";
import useSocket from "../../hooks/useSocket";
import { ProjectInterface } from "../../interface/projectInterface";
import { socket } from "../../socket";
import {
  fetch_project_request,
  fetch_project_sucess,
} from "../../store/project/projectAction";

const ProjectPage = () => {

  const auth = useSelector((state: RootStateOrAny) => state.auth);
  useAuthCookies();
  const dispatch = useDispatch();
  const store = useSelector(handleSelectors);
  useSocket();
  // const { name, username, user_id } = auth;
  // useEffect(() => {
  //   socket.emit("check-online-status", {
  //     socket_id: socket.id
  //   })

  //   socket.on("success", (payload: any) => {
  //     console.log(payload)
  //   })

  //   socket.on("online-status", payload => {
  //     console.log(payload)
  //     if(payload.online === false) {
  //       socket.emit("login", {
  //         name,
  //         username,
  //         user_id
  //       })
  //     }
  //   })
  // }, [])

  function handleSelectors(state: { auth: { user_id: any; }; projects: { projects: any; loading: any; }; }) {
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
      {
        store.loading === true ? <Loading /> :
        store.projects.map((project: ProjectInterface) => <ProjectListItem key={project._id} project={project} />)
      }
      <AddProject />
    </>
  );
};

export default ProjectPage;
