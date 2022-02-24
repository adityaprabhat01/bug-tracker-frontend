import {
  Box,
  Button,
  FormControl,
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
  add_bug_failure,
  add_bug_request,
  add_bug_success,
} from "../../store/selectProject.tsx/selectProjectAction";
import ButtonForm from "../Form/ButtonForm";
import Error from "../Form/Error";
import InputForm from "../Form/InputForm";
import { BsPlusLg } from "react-icons/bs";

interface InitialValuesInterface {
  title: string;
  body: string;
}

const AddBug = () => {
  const initialValues = {
    title: "",
    body: "",
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const project = useSelector((state: RootStateOrAny) => state.project);

  function handlePreFetch() {
    dispatch(add_bug_request());
  }

  function handlePostFetch(data: any) {
    onClose();
    if ("error" in data || "message" in data) {
      handleFailure(data);
    }
    dispatch(add_bug_success(data));
  }

  function handleFailure(data: any) {
    onClose();
    dispatch(add_bug_failure(data));
  }

  function handleSubmit(values: InitialValuesInterface, fn: Function) {
    handlePreFetch();
    const { title, body } = values;
    const { _id, user } = project.project;
    api
      .post("/addBug", {
        title,
        body,
        project_id: _id,
        user,
      })
      .then((res) => {
        const { data } = res;
        handlePostFetch(data);
      })
      .catch((err) => {});
  }

  return (
    <>
      <Box mt={3}>
      <Button
          onClick={onOpen}
          backgroundColor={"blue.400"}
          color={"white"}
          borderRadius={"full"}
          _hover={{
            backgroundColor: "blue.300",
          }}
          leftIcon={<BsPlusLg color="white" size={"0.8rem"} />}
        >
          Add Bug
        </Button>
      </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Report Bug in the project</ModalHeader>
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
                    <FormControl mt={4}>
                      <InputForm message="Title" name="title" />
                    </FormControl>

                    <FormControl mt={4}>
                      <InputForm message="body" name="body" />
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

      {project.error !== "" ? <Error message={project.error} /> : null}
    </>
  );
};

export default AddBug;
