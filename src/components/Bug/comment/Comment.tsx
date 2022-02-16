import { Avatar, Box, HStack, Wrap, WrapItem } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { User } from "../../../interface/userInterface";
import About from "../../About";
import Date from "../../Date";

interface Props {
  comment: {
    user: User;
    body: string;
    project_id: string;
    bug_id: string;
    dateCreated: string;
  };
}

const Comment = (props: Props) => {
  const { user, body, project_id, bug_id, dateCreated } = props.comment;
  return (
    <>
      <Box border={"2px solid #c7d0d8"} borderRadius={"5px"}>
        <Box padding={2}>
          <HStack>
            <Wrap>
              <WrapItem>
                <Avatar size="sm" name={user.name} />{" "}
              </WrapItem>
            </Wrap>
            <Box fontWeight={"bold"} color={"#868e9c"}>
              {user.username}
            </Box>
          </HStack>
          <Box mt={1}>
            <Date dateCreated={dateCreated} />
          </Box>
          <Box>
            <ReactMarkdown children={body} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Comment;
