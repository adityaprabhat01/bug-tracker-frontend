import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  stack: Array<any>;
  handleUpdate: any;
  isOpen: boolean;
}

const TechStack = (props: Props) => {
  const { stack, handleUpdate, isOpen } = props;
  const [value, setValue] = useState("");

  function handleClick() {
    handleUpdate(value);
  }
  
  return (
    <>
      <Box>
        <HStack>
          {stack.map((tech: any) => (
            <Box
              backgroundColor={"blue.200"}
              borderRadius={"full"}
              padding={"6px"}
              key={tech._id}
            >
              {tech.name}
            </Box>
          ))}
        </HStack>
        
        {
          isOpen === true ? 
          <Box mt={"3"}>
          <Input
            width={"small"}
            variant="flushed"
            onChange={(event) => setValue(event.target.value)}
          />
          <Button ml={"3"} onClick={handleClick}>Update</Button>
        </Box> : null
        }
        
      </Box>
    </>
  );
};

export default TechStack;
