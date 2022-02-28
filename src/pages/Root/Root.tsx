import { Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Link
        as={NavLink}
        to={"/login"}
        _hover={{
          textDecoration: "none",
          backgroundColor: "#8892ff38",
        }}
      >Login</Link>
      <Link
        as={NavLink}
        to={"/signup"}
        _hover={{
          textDecoration: "none",
          backgroundColor: "#8892ff38",
        }}
      >SignUp</Link>
    </>
  );
};

export default Root;
