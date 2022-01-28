import { Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { object, string } from "yup";
import {
  signup_failure,
  signup_request,
  signup_success,
} from "../../store/auth/authActions";
import { url } from "../../url";

import ButtonForm from "../../components/Auth/Form/ButtonForm";
import InputForm from "../../components/Auth/Form/InputForm";

interface InitialValuesInterface {
  name: string;
  username: string;
  email: string;
  password: string;
}

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  const signupSchema = object({
    name: string().required(),
    username: string().required(),
    email: string().required().email("Must be a valid email"),
    password: string().required().min(4, "Must have atleast 4 characters"),
  });

  function handleSubmit(values: InitialValuesInterface, fn: Function) {
    const { name, username, email, password } = values;
    dispatch(signup_request());
    api
      .post("/signup", {
        name,
        username,
        email,
        password,
      })
      .then((res) => {
        const { data } = res;
        dispatch(signup_success(data));
      })
      .catch((err) => {
        dispatch(
          signup_failure({
            error: "An error occured",
          })
        );
      });
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
            validationSchema={signupSchema}
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
