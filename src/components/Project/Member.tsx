import { Avatar, Box, HStack, Link, Tooltip, WrapItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { User } from "../../interface/userInterface";
import RemoveMember from "./RemoveMember";

interface Props {
  member: User;
}

const Member = (props: Props) => {
  const { member } = props;
  return (
    <>
      <WrapItem>
        <Link
          as={NavLink}
          to={"/user/" + member.username}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Tooltip label={member.name}>
            <Avatar name={member.name} />
          </Tooltip>
        </Link>

        {/* <HStack as={"span"}>
        <Box>{member.name}</Box>
        <Box>{member.username}</Box>
      </HStack>
      <RemoveMember user_id={member.user_id} /> */}
      </WrapItem>
    </>
  );
};

export default Member;
