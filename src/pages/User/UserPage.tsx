import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import StaticItem from "../../components/Users/StaticItem";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import {
  BugInterface,
  ProjectInterface,
} from "../../interface/projectInterface";
import StaticSidebar from "../../components/Users/StaticSidebar";
import Title from "../../components/Title";

interface User {
  email: string;
  name: string;
  date_joined: string;
  username: string;
}

interface Data {
  bugs: Array<BugInterface>;
  projects: Array<ProjectInterface>;
  user_id: string;
  username: string;
  _id: string;
}

const startCol = [3, 6, 9];
const endCol = [6, 9, 12];

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const params = useParams();

  function handlePreFetch() {}
  function handlePostFetch(data: any) {
    setUser(data);
  }
  function handlePostFetchData(data: any) {
    setData(data);
  }
  useFetch(
    {
      method: "GET",
      pathname: "getUser/" + params.username,
    },
    handlePreFetch,
    handlePostFetch,
    null
  );

  useFetch(
    {
      method: "GET",
      pathname: "getUserCache/" + params.username,
    },
    handlePreFetch,
    handlePostFetchData,
    null
  );

  return (
    <>
      {data !== null && user !== null ? (
        <Grid templateColumns="repeat(11, 1fr)">
          <GridItem colStart={0} colEnd={2}>
            <Box>
              <StaticSidebar {...user} />
            </Box>
          </GridItem>

          {data.projects.map((project: ProjectInterface, i: number) => (
            <StaticItem
              key={project._id}
              item={project}
              colStart={startCol[i % 3]}
              colEnd={endCol[i % 3]}
            />
          ))}

          {data.bugs.map((bug: BugInterface, i: number) => (
            <StaticItem
              key={bug._id}
              item={bug}
              colStart={startCol[i % 3]}
              colEnd={endCol[i % 3]}
            />
          ))}
        </Grid>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserPage;
