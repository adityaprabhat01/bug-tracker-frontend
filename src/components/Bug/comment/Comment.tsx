import { Box } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { User } from "../../../interface/userInterface";
import About from "../../About";

interface Props {
  comment: {
    user: User;
    body: string;
    project_id: string;
    bug_id: string;
  };
}

const Comment = (props: Props) => {
  const { user, body, project_id, bug_id } = props.comment;

  return (
    <>
      <Box border={"2px solid #4299E1"} borderRadius={"5px"}>
        <Box padding={2}>
        <About user={user} />
        <ReactMarkdown children={body} />
        </Box>
        
      </Box>
    </>
  );
};

export default Comment;
