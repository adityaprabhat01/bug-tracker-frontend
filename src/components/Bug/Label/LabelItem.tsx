import { Button } from "@chakra-ui/react";

interface Props {
  name: string;
  assigned: boolean;
  _id: string;
  selectLabel: Function;
  index: number;
}

const LabelItem = (props: Props) => {
  const { name, assigned, _id, selectLabel, index } = props;
  function handleClick() {
    selectLabel(index)
    console.log(index)
  }

  return (
    <>
      <Button onClick={handleClick} backgroundColor={"blue.100"} mt="2" key={_id}>
        {name}
      </Button>
    </>
  );
};

export default LabelItem;
