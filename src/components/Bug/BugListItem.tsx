import {
  Badge,
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
import Status from "./Status";

interface Props {
  bug: BugInterface;
  colStart: number;
  colEnd: number;
}

const BugListItem = (props: Props) => {
  const { bug, colStart, colEnd } = props;
  const { title, body, date_opened, _id, user, isOpen, project_id } = bug;
  return (
    <>
      <GridItem colStart={colStart} colEnd={colEnd}>
        
          <Box
            border={"2px solid #3f3f4182"}
            borderRadius={"5px"}
            padding={2}
            mt={7}
            mr={2}
            mb={4}
            maxH={"auto"}
            minH={"auto"}
            minW={"150px"}
            maxW={"320px"}
            backgroundColor="#ebedf0"
            color="#495261f0"
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            _hover={{
              textDecoration: "none",
              backgroundColor: "#c2c3c5",
              color: "#0a1426f0",
            }}
          >
            <Link
          as={NavLink}
          to={"/project/" + project_id + "/bug/" + _id}
          _hover={{
            textDecoration: "none",
            backgroundColor: "#8892ff38",
          }}
        >
            <Title title={title} />
            {isOpen === true ? (
              <>
                <Badge variant="subtle" colorScheme="green">
                  Open
                </Badge>
              </>
            ) : (
              <>
                <Badge variant="subtle" colorScheme="red">
                  Closed
                </Badge>
              </>
            )}

            <Divider mt={2} backgroundColor="#9fa1a4" height={"1px"} />
            <Box mt={2} fontSize={14} color={"gray.600"}>
              <About user={user} />
              <Box>
                <Date dateCreated={date_opened} />
              </Box>
            </Box>

            <Box mt={2}>{body}</Box>
            </Link>
          </Box>
        
      </GridItem>
    </>
  );
};

export default BugListItem;
