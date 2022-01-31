import { Box } from "@chakra-ui/react";
import moment from "moment";

const About = (props: any) => {
  const { dateCreated } = props;

  return (
    <>
      <Box>
        {
          moment(dateCreated).fromNow()
        }
      </Box>
    </>
  )
}

export default About;