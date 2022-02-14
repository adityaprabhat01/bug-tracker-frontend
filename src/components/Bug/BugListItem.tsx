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
  const { title, body, date_opened, _id, user, isOpen } = bug;
  return (
    <>
      <GridItem colStart={colStart} colEnd={colEnd}>
        <Link
          as={NavLink}
          to={"/bug/" + _id}
          _hover={{
            textDecoration: "none",
            backgroundColor: "#8892ff38",
          }}
        >
          <Box
            border={"2px solid #8e90a482"}
            borderRadius={"5px"}
            padding={2}
            mt={7}
            mr={2}
            mb={4}
            maxH={"auto"}
            minH={"auto"}
            minW={"150px"}
            maxW={"320px"}
            backgroundColor="#bdc2f838"
            _hover={{
              textDecoration: "none",
              backgroundColor: "#8892ff38",
            }}
          >
            <Title title={title} />
            {isOpen === true ? (
              <Box
                fontWeight="17px"
                borderRadius={"full"}
                backgroundColor={"#acf9ac"}
                color={"#049204"}
                padding={"6px"}
                mt={2}
                width={"55px"}
              >
                Open
              </Box>
            ) : (
              <Box>Closed</Box>
            )}

            <Divider mt={1} />
            <Box mt={2} fontSize={14} color={"gray.600"}>
              <About user={user} />
              <Box>
                <Date dateCreated={date_opened} />
              </Box>
            </Box>

            <Box color={"#495261f0"} mt={2}>
              {body}
            </Box>
          </Box>
        </Link>
      </GridItem>
    </>
  );
};

export default BugListItem;
