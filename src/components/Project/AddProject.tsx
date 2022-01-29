import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api";
import {
  add_project_request,
  add_project_success,
} from "../../store/project/projectAction";
import ButtonForm from "../Auth/Form/ButtonForm";
import InputForm from "../Auth/Form/InputForm";

interface InitialValuesInterface {
  title: string;
  body: string;
}

const AddProject = () => {

  function handleSelector (state: { auth: any; }) {
    const user = state.auth;
    return { user }
  }

  const dispatch = useDispatch();
  const store = useSelector(handleSelector)
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialValues = {
    title: "",
    body: "",
  };

  function handlePreFetch() {
    dispatch(add_project_request());
  }

  function handlePostFetch(data: any) {
    dispatch(add_project_success(data));
    onClose();
  }

  function handleSubmit(values: InitialValuesInterface, fn: Function) {
    const { title, body } = values;
    const { name, username, user_id } = store.user;
    handlePreFetch();
    api.post("/addProject", {
      title, 
      body,
      user: {
        name,
        username,
        user_id
      }
    })
    .then(res => {
      const { data } = res;
      handlePostFetch(data)
    })
    .catch(err => {

    })
  }

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
          >
            <>
              <Form>
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <InputForm message="Title" name="title" />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <InputForm message="Description" name="body" />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <ButtonForm message="Submit" /> 
                </ModalFooter>
              </Form>
            </>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProject;
