import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { BugInterface } from "../../interface/projectInterface";
import About from "../About";
import Date from "../Date";
import Title from "../Title";

interface Props {
  bug: BugInterface;
  colStart: number;
  colEnd: number;
}

const BugListItem = (props: Props) => {
  const { bug, colStart, colEnd } = props;
  const { title, body, date_opened, _id, user } = bug;
  return (
    <>
      <GridItem colStart={colStart} colEnd={colEnd}>
        <Box
          border={"2px solid #4299E1"}
          borderRadius={"5px"}
          padding={2}
          mt={4}
          mr={2}
          maxH={"auto"}
          minH={"auto"}
          minW={"150px"}
        >
          <HStack>
            <Link
              _hover={{
                color: "gray.400",
              }}
              as={NavLink}
              to={"/bug/" + _id}
            >
              <Heading as={"h6"} size="md">
                {title}
              </Heading>
            </Link>
          </HStack>
          <Divider mt={1} />
          <Box mt={2} fontSize={14} color={"gray.600"}>
            <About user={user} />
            <Box color={"gray.500"}>
              <Date dateCreated={date_opened} />
            </Box>
          </Box>

          <Box mt={2}>{body}</Box>
        </Box>
      </GridItem>
    </>
  );
};

export default BugListItem;
