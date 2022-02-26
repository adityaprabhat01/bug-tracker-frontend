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
  return (
    <>
      <Input
        placeholder={message}
        {...field}
        meta={meta}
        variant="flushed"
        size={"lg"}
        required
      />
      {meta.touched && meta.error ? (
        <Error message={meta.error} />
      ) : null}
    </>
  );
};

export default InputForm;
