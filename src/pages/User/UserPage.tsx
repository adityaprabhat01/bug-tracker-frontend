import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";

interface User {
  email: string;
  name: string;
  date_joined: string;
  username: string;
}

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const params = useParams();

  function handlePreFetch() {}
  function handlePostFetch(data: any) {
    setUser(data);
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

  console.log(user);
  return (
    <>
      User Page
      {user !== null ? (
        <Box>
          {user.email}
          {user.name}
          {user.username}
          {user.date_joined}
        </Box>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserPage;
