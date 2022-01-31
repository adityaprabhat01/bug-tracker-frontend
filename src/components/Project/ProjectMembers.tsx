import { Box, HStack } from "@chakra-ui/react";
import { User } from "../../interface/userInterface";
import RemoveMember from "./RemoveMember";

interface Props {
  member: User;
}

const ProjectMember = (props: Props) => {
  const { member } = props;
  return (
    <>
      <HStack as={"span"}>
        <Box>{member.name}</Box>
        <Box>{member.username}</Box>
      </HStack>
      <RemoveMember user_id={member.user_id} />
    </>
  );
};

export default ProjectMember;
