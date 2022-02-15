import { Box, HStack } from "@chakra-ui/react";
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
              <Box
                fontWeight="17px"
                borderRadius={"full"}
                backgroundColor={"#acf9ac"}
                color={"#049204"}
                padding={"6px"}
                mt={2}
              >
                {label.name}
              </Box>
            ) : null}
          </Box>
        ))}
        <AddLabel labels={labels} />
      </HStack>
    </>
  );
};

export default Label;
