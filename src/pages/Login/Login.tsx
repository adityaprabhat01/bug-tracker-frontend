import { Grid, VStack, GridItem, Heading } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import {
  login_failure,
  login_request,
  login_success,
} from "../../store/auth/authActions";
import { url } from "../../url";
import ButtonForm from "../../components/Form/ButtonForm";
import Error from "../../components/Form/Error";
import InputForm from "../../components/Form/InputForm";
import { asyncEmit } from "../../socket";

interface InitialValuesInterface {
  username: string;
  password: string;
}

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

const Login: React.FC = () => {
  function handleSelectors(state: {
    auth: { error: string; isAuthenticated: boolean };
  }) {
    const error = state.auth.error;
    return { error };
  }

  const store = useSelector(handleSelectors);

  const initialValues = {
    username: "",
    password: "",
  };

  const loginSchema = object({
    username: string().required(),
    password: string().required(),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(values: InitialValuesInterface, fn: Function) {
    dispatch(login_request());
    const { username, password } = values;
    api
      .post("/login", {
        username,
        password,
      })
      .then((res) => {
        const { data } = res;
        if ("error" in data || "message" in data) {
          return dispatch(login_failure(data));
        }
        dispatch(login_success(data));
        (async function () {
          const a = await asyncEmit("login", "success", {
            name: data.name,
            username: data.username,
            user_id: data.user_id,
          });
          console.log(a);
          navigate("/projects");
        })();
      })
      .catch((err) => {
        dispatch(
          login_failure({
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
            Log into your account
          </Heading>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
          >
            <Form>
              <VStack>
                <InputForm message="username" name="username" />
                <InputForm message="Password" name="password" />
                <ButtonForm message="LogIn" />
                {store.error !== "" ? <Error message={store.error} /> : null}
              </VStack>
            </Form>
          </Formik>
        </GridItem>
      </Grid>
    </>
  );
};

export default Login;
