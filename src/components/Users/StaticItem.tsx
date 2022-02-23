import {
  Badge,
  Box,
  Divider,
  GridItem,
} from "@chakra-ui/react";
import { BugInterface, ProjectInterface } from "../../interface/projectInterface";
import About from "../About";
import Date from "../Date";
import Title from "../Title";

interface Props {
  item: BugInterface | ProjectInterface
  colStart: number;
  colEnd: number;
}

const StaticItem = (props: Props) => {
  const { item, colStart, colEnd } = props;
  const { title, body, _id, user, date_opened } = item;
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
          <Title title={title} />
          
          {/* {"isOpen" in item === true ? (
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
          )} */}

          <Divider mt={2} backgroundColor="#9fa1a4" height={"1px"} />
          <Box mt={2} fontSize={14} color={"gray.600"}>
            <About user={user} />
            <Box>
              <Date dateCreated={date_opened} />
            </Box>
          </Box>

          <Box mt={2}>{body}</Box>
        </Box>
      </GridItem>
    </>
  );
};

export default StaticItem;
