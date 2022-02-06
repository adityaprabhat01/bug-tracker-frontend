import { Box } from "@chakra-ui/react";
import { User } from "../../../interface/userInterface";

interface Props {
  member: User
}

const BugMember = (props: Props) => {
  const { member } = props;  
  return (
    <>
      <Box>
        {member.name}
      </Box>
      <Box>
        {member.username}
      </Box>
    </>
  )
}

export default BugMember;