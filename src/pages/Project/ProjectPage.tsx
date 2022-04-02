import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Error from "../../components/Form/Error";
import Loading from "../../components/Loading";
import AddProject from "../../components/Project/AddProject";
import ProjectListItem from "../../components/Project/ProjectListItem";
import Sidebar from "../../components/Sidebar";
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

const startCol = [3, 6, 9];
const endCol = [6, 9, 12];

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
                <GridItem colStart={3} colEnd={4}>
                  <Box mt={3}>
                  <AddProject />
                  </Box>
                </GridItem>

                {projects.map((project: ProjectInterface, i: number) => (
                  <ProjectListItem
                    key={project._id}
                    project={project}
                    colStart={startCol[i % 3]}
                    colEnd={endCol[i % 3]}
                  />
                ))}
                
              </>
            ) : (
              <>
                <Error message={error} />
                
              </>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default ProjectPage;
