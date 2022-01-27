import { Input } from '@chakra-ui/react'

interface Props {
  message: string
}

const InputForm = (props: Props) => {
  const { message } = props;
  return (
    <>
      <Input placeholder={message} variant="filled" size={"lg"} />
    </>
  )
}

export default InputForm;