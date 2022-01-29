import { Box, HStack, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Date from "../Date";
import Title from "../Title";
import TechStack from "./TechStack";

const ProjectListItem = (props: any) => {
  const { project } = props;
  const { title, body, dateCreated, techStack, _id } = project;
  return (
    <>
      <Box>
        <HStack>
          <Link as={NavLink} to={"/project/" + _id}>
            <Title title={title} />
          </Link>
          <Date dateCreated={dateCreated} />
        </HStack>
        <Box>{body}</Box>
        <TechStack stack={techStack} />
      </Box>
    </>
  );
};

export default ProjectListItem;