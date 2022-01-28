import { Box } from "@chakra-ui/react"

interface Props {
  message: string
}

const Error = (props: Props) => {
  const { message } = props
  return (
    <>
      <Box color={"#f54242"}>{ message }</Box>
    </>
  )
}

export default Error;