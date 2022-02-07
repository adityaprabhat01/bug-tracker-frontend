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
          Status:{" "}
          <Box as={"span"} color={"green.400"}>
            Open
          </Box>
        </Box>
      ) : (
        <Box>
          Status:{" "}
          <Box as={"span"} color={"red.400"}>
            Closed
          </Box>
        </Box>
      )}
    </>
  );
};

export default Status;
