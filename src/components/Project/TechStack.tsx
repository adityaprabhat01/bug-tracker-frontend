import { Box, HStack } from "@chakra-ui/react";

const TechStack = (props: any) => {
  const { stack } = props;
  return (
    <>
      <HStack>
        {stack.map((tech: any) => (
          <Box key={tech._id}>{tech.name}</Box>
        ))}
      </HStack>
    </>
  );
};

export default TechStack;
