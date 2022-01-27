import { Input } from '@chakra-ui/react'
import { useField } from 'formik'

interface Props {
  message: string,
  name: string
}

const InputForm = (props: Props) => {
  const { message, name } = props;
  const [field, meta] = useField(name)
  
  return (
    <>
      <Input placeholder={message} {...field} meta={meta} variant="filled" size={"lg"} />
    </>
  )
}

export default InputForm;