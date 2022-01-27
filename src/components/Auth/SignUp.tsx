import { Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import ButtonForm from "./Form/ButtonForm";
import InputForm from "./Form/InputForm";

interface InitialValuesInterface {
  name: string;
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  function handleSubmit(values: InitialValuesInterface, fn: Function) {
    console.log(values);
  }

  return (
    <>
      <Grid templateColumns="repeat(9, 1fr)">
        <GridItem colStart={4} colEnd={7} mt={"200px"}>
          <Heading alignContent={"center"} mb={4} as="h2" size="xl">
            Create a free account
          </Heading>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
          >
            <Form>
              <VStack>
                <InputForm message="Name" name="name" />
                <InputForm message="Username" name="username" />
                <InputForm message="Email" name="email" />
                <InputForm message="Password" name="password" />
                <ButtonForm message="Sign Up" />
              </VStack>
            </Form>
          </Formik>
        </GridItem>
      </Grid>
    </>
  );
};

export default SignUp;
