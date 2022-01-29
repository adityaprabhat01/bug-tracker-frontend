import { Input } from "@chakra-ui/react";
import { useField } from "formik";
import Error from "./Error";

interface Props {
  message: string;
  name: string;
}

const InputForm = (props: Props) => {
  const { message, name } = props;
  const [field, meta] = useField(name);
  console.log(field)
  return (
    <>
      <Input
        placeholder={message}
        {...field}
        meta={meta}
        variant="filled"
        size={"lg"}
      />
      {meta.touched && meta.error ? (
        <Error message={meta.error} />
      ) : null}
    </>
  );
};

export default InputForm;
