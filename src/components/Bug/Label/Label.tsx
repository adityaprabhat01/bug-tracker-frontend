import { Badge, Box, HStack } from "@chakra-ui/react";
import { RootStateOrAny, useSelector } from "react-redux";
import AddLabel from "./AddLabel";

const Label = () => {
  const labels = useSelector((state: RootStateOrAny) => state.bug.bug.labels);
  return (
    <>
      <HStack>
        {labels.labels.map((label: any) => (
          <Box key={label._id}>
            {label.assigned === true ? (
              <Badge
                variant="subtle"
                borderRadius={"full"}
                colorScheme="green"
                padding={"6px"}
                mt={2}
              >
                {label.name}
              </Badge>
            ) : null}
          </Box>
        ))}
        <AddLabel labels={labels} />
      </HStack>
    </>
  );
};

export default Label;
