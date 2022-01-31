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
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../api";
import {
  add_member_failure,
  add_member_request,
  add_member_success,
} from "../../store/selectProject.tsx/selectProjectAction";
import ButtonForm from "../Form/ButtonForm";
import Error from "../Form/Error";
import InputForm from "../Form/InputForm";

interface InitialValuesInterface {
  user_id: string;
  username: string;
  name: string;
  project_id: string;
}

const initialValues: InitialValuesInterface = {
  user_id: "",
  username: "",
  name: "",
  project_id: "",
};

const AddMember = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const error: string = useSelector(
    (state: RootStateOrAny) => state.project.error
  );

  function handlePreFetch() {
    dispatch(add_member_request());
  }

  function handlePostFetch(data: any) {
    if ("message" in data || "error" in data) {
      return handFailure(data);
    }
    dispatch(add_member_success(data));
    onClose();
  }

  function handFailure(data: any) {
    dispatch(add_member_failure(data));
    onClose();
  }

  function handleSubmit(values: InitialValuesInterface, fn: Function) {
    const { user_id, username, name, project_id } = values;
    handlePreFetch();
    api
      .post("/addMembers", {
        user_id,
        username,
        name,
        project_id,
      })
      .then((res) => {
        const { data } = res;
        handlePostFetch(data);
      })
      .catch((err) => {
        handlePostFetch({
          error: "Something went wrong"
        })
      });
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
                    <FormLabel>Uerr ID</FormLabel>
                    <InputForm message="User ID" name="user_id" />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Username</FormLabel>
                    <InputForm message="Username" name="username" />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Name</FormLabel>
                    <InputForm message="Name" name="name" />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Project ID</FormLabel>
                    <InputForm message="Project ID" name="project_id" />
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
      {error !== "" ? <Error message={error} /> : null}
    </>
  );
};

export default AddMember;
