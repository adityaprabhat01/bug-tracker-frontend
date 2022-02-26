import { Box, HStack, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Date from "../Date";
import Title from "../Title";

const ProjectListItem = (props: any) => {
  const { project } = props;
  const { title, body, dateCreated, _id } = project;
  return (
    <>
      <Box maxW={"100px"} maxH={"100px"}>
        <HStack>
          <Link as={NavLink} to={"/project/" + _id}>
            <Title title={title} />
          </Link>
          <Date dateCreated={dateCreated} />
        </HStack>
        <Box>{body}</Box>
      </Box>
    </>
  );
};

export default ProjectListItem;
