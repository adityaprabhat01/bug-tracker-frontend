import { Box } from "@chakra-ui/react";

interface Props {
  value:
    | string
    | { bug_id: string; mentionId: number | null; project_id: string };
  handleMention: any;
}

const MentionItem = (props: Props) => {
  const { value } = props;
  const { handleMention } = props;
  function handleClick() {
    handleMention(value);
  }
  if (typeof value === "object") {
    return (
      <Box onClick={handleClick} mt={2} _hover=
      {{
        backgroundColor: "gray.200",
        cursor: "pointer",
      }}>
        {value.mentionId} 
      </Box>
    );
  }
  return (
    <>
      <Box
        onClick={handleClick}
        mt={2}
        _hover={{
          backgroundColor: "gray.200",
          cursor: "pointer",
        }}
      >
        {value}
      </Box>
    </>
  );
};

export default MentionItem;
