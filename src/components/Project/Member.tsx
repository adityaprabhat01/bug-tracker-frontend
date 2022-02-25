import { Link, Tooltip, WrapItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { User } from "../../interface/userInterface";
import ProfilePicture from "../ProfilePicture";

interface Props {
  member: User;
}

const Member = (props: Props) => {
  const { member } = props;
  return (
    <>
      <WrapItem ml={2}>
        <Link
          as={NavLink}
          to={"/user/" + member.username}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Tooltip label={member.name}>
            <ProfilePicture
              size="md"
              name={member.name}
              user_id={member.user_id}
            />
          </Tooltip>
        </Link>
      </WrapItem>
    </>
  );
};

export default Member;
