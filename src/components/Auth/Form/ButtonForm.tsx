import { Button } from "@chakra-ui/react"

interface Props {
  message: string
}

const ButtonForm = (props: Props) => {
  const { message } = props
  return (
    <>
      <Button size={"lg"}>
        {message}
      </Button>
    </>
  )
}

export default ButtonForm;