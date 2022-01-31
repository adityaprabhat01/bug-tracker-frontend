import { Box } from "@chakra-ui/react";
import { User } from "../interface/userInterface";

interface Props {
  user: User
}

const About = (props: Props) => {
  const { user } = props;
  return (
    <>
      <Box>Created by {user.username}</Box>
    </>
  )
}

export default About;