import { Grid, VStack, GridItem, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import ButtonForm from "./Form/ButtonForm";
import InputForm from "./Form/InputForm";

interface InitialValuesInterface {
  email: string,
  password: string
}

const Login: React.FC = () => {
  const initialValues = {
    email: '',
    password: ''
  }

  function handleSubmit(values: InitialValuesInterface, fn: Function) {
    console.log(values);
  }

  return (
    <>
      <Grid templateColumns="repeat(9, 1fr)">
        <GridItem colStart={4} colEnd={7} mt={"200px"}>
          <Heading alignContent={"center"} mb={4} as="h2" size="xl">
            Log into your account
          </Heading>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
          >
            <Form>
              <VStack>
                <InputForm message="Email" name="email" />
                <InputForm message="Password" name="password" />
                <ButtonForm message="LogIn" />
              </VStack>
            </Form>
          </Formik>
        </GridItem>
      </Grid>
    </>
  );
};

export default Login;
