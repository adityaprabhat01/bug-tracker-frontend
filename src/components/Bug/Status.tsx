import { Box } from "@chakra-ui/react";

interface Props {
  isOpen: {
    isOpen: boolean;
    error: string;
    loading: boolean;
  };
}

const Status = (props: Props) => {
  const { isOpen } = props;

  return (
    <>
      {isOpen.isOpen === true ? (
        <Box>
          <Box
            ml={4}
            as={"span"}
            backgroundColor={"green.100"}
            color={"green.400"}
            fontWeight={"bold"}
            borderRadius={"4px"}
            padding={1}
          >
            Open
          </Box>
        </Box>
      ) : (
        <Box>
          <Box
            ml={4}
            as={"span"}
            backgroundColor={"red.100"}
            color={"red.400"}
            fontWeight={"bold"}
            borderRadius={"4px"}
            padding={1}
          >
            Closed
          </Box>
        </Box>
      )}
    </>
  );
};

export default Status;
