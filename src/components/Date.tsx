import { Box } from "@chakra-ui/react";
import moment from "moment";

const Date = (props: any) => {
  const { dateCreated } = props;
  return (
    <>
      <Box color={"#868e9c"}>
        Added&nbsp;
        {
          moment(dateCreated).fromNow()
        }
      </Box>
    </>
  )
}

export default Date;