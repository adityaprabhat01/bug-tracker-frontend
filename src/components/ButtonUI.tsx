import { Button } from "@chakra-ui/react";

interface Props {
  value: string;
  handleClick: any;
}

const ButtonUI = (props: Props) => {
  const { value, handleClick } = props;
  return (
    <>
      <Button
        backgroundColor={"blue.400"}
        color={"blue.50"}
        borderRadius={"full"}
        _hover={{
          backgroundColor: "blue.300",
        }}
        onClick={handleClick}
      >
        {value}
      </Button>
    </>
  );
};

export default ButtonUI;
