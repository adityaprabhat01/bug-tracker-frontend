import { Avatar, Box, HStack, Wrap, WrapItem } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { User } from "../../../interface/userInterface";
import Date from "../../Date";
import CommentMenu from "./CommentMenu";
import DeleteComment from "./DeleteComment";
import { motion } from "framer-motion";

interface Props {
  comment: {
    user: User;
    body: string;
    project_id: string;
    bug_id: string;
    dateCreated: string;
    _id: string;
    activity: {
      isActivity: boolean;
      value: string;
    };
  };
}



const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};


const MotionBox = motion(Box);

const Comment = (props: Props) => {
  const { user, body, bug_id, dateCreated, _id, activity } = props.comment;
  if (activity.isActivity) {
    return (
      <>
        <MotionBox variants={variants} border={"2px solid #c7d0d8"} padding={2} borderRadius={"5px"}>
          <HStack>
            <Wrap>
              <WrapItem>
                <Avatar
                  size="sm"
                  name={"!"}
                  backgroundColor={
                    activity.value === "close" ? "red.300" : "green.300"
                  }
                />{" "}
              </WrapItem>
            </Wrap>

            <Box>
              <ReactMarkdown children={body} />
            </Box>
          </HStack>
        </MotionBox>
      </>
    );
  }
  return (
    <>
      <MotionBox variants={variants} border={"2px solid #c7d0d8"} borderRadius={"5px"}>
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
            <Box>
              <CommentMenu>
                <DeleteComment bug_id={bug_id} comment_id={_id} />
                <DeleteComment bug_id={bug_id} comment_id={_id} />
              </CommentMenu>
            </Box>
          </HStack>
          <Box mt={1}>
            <Date dateCreated={dateCreated} />
          </Box>
          <Box>
            <ReactMarkdown children={body} />
          </Box>
        </Box>
      </MotionBox>
    </>
  );
};

export default Comment;
