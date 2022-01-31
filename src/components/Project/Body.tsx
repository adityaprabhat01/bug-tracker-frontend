import { Textarea } from "@chakra-ui/react";
import { User } from "../../interface/userInterface";
import About from "../About";

interface Props {
  body: string;
  user: User;
}

const Body = (props: Props) => {
  const { body, user } = props;
  return (
    <>
      <Textarea value={body} border="none" />
      <About user={user} />
    </>
  );
};

export default Body;
