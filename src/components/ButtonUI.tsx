import { Button } from "@chakra-ui/react";

interface Props {
  value: string;
  handleClick?: any;
  backgroundColor?: string;
  color?: string;
  hoverBackgroundColor?: string;
  height?: string;
  width?: string;
  isLoading?: string;
  loadingText?: string;
  onClick?: any;
  borderRadius?: string
}

const ButtonUI = (props: Props) => {
  const {
    value,
    handleClick,
    backgroundColor = "blue.400",
    color = "blue.50",
    hoverBackgroundColor = "blue.300",
    borderRadius = "full"
  } = props;

  return (
    <>
      <Button
        backgroundColor={backgroundColor}
        color={color}
        borderRadius={borderRadius}
        _hover={{
          backgroundColor: hoverBackgroundColor,
        }}
        onClick={handleClick}
      >
        {value}
      </Button>
    </>
  );
};

export default ButtonUI;
