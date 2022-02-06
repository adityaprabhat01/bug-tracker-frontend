import { Box } from "@chakra-ui/react";
import { RootStateOrAny, useSelector } from "react-redux";
import AddLabel from "./AddLabel";

const Label = () => {
  
  const labels = useSelector((state: RootStateOrAny) => state.bug.bug.labels);
  return (
    <>
      {labels.labels.map((label: any) => (
        <Box key={label._id}>
          {label.assigned === true ? (
            <Box color={"green.400"}>{label.name}</Box>
          ) : null}
        </Box>
      ))}
      
      <AddLabel labels={labels} />
     
    </>
  );
};

export default Label;
