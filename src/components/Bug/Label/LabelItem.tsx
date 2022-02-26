import { Box } from "@chakra-ui/react";

interface Props {
  name: string;
  assigned: boolean;
  _id: string;
  selectLabel: Function;
  index: number;
}

const LabelItem = (props: Props) => {
  const { name, assigned, selectLabel, index } = props;
  function handleClick() {
    selectLabel(index);
  }

  return (
    <>
      <Box
        width={"100%"}
        fontWeight={assigned === true ? "bold" : ""}
        onClick={handleClick}
      >
        {name}
      </Box>
    </>
  );
};

export default LabelItem;
