import { Box, HStack, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { BugInterface } from "../../interface/projectInterface";
import About from "../About";
import Date from "../Date";
import Title from "../Title";

interface Props {
  bug: BugInterface
}

const BugListItem = (props: Props) => {
  const { bug } = props;
  const { title, body, date_opened, _id, user } = bug;
  console.log(user)
  return (
    <>
      <Box>
        <HStack>
          <Link as={NavLink} to={"/bug/" + _id}>
            <Title title={title} />
          </Link>
          <Date dateCreated={date_opened} />
        </HStack>
        <About user={user} />
        <Box>{body}</Box>
      </Box>
    </>
  );
};

export default BugListItem;
