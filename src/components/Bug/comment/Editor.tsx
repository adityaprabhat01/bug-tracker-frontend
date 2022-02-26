import { Box } from "@chakra-ui/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  text: string;
}

const Editor = (props: Props) => {
  const { text } = props;
  const [value, setValue] = useState(text);
  return (
    <>
      <Box minHeight={"300px"} padding={4}>
        <ReactMarkdown children={value} />
      </Box>
    </>
  );
};

export default Editor;
