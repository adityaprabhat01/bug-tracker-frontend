import { Button } from "@chakra-ui/react"

interface Props {
  message: string
}

const ButtonForm = (props: Props) => {
  const { message } = props
  return (
    <>
      <Button size={"lg"} type="submit">
        {message}
      </Button>
    </>
  )
}

export default ButtonForm;