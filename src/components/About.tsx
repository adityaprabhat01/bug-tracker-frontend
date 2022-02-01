import { Box } from "@chakra-ui/react";
import { User } from "../interface/userInterface";

interface Props {
  user: User
}

const About = (props: Props) => {
  const { user } = props;
  return (
    <>
      <Box color={"gray.600"}>Created by {user.username}</Box>
    </>
  )
}

export default About;