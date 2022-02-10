import { Box } from "@chakra-ui/react";
import { User } from "../../../interface/userInterface";

interface Props {
  member: User;
  handleMention: any;
}

const MentionItem = (props: Props) => {
  const { name, username, user_id } = props.member;
  const { handleMention } = props;
  function handleClick() {
    handleMention(username)
  }
  return (
    <>
      <Box onClick={handleClick}>
        {username}
      </Box>
    </>
  )
}

export default MentionItem;