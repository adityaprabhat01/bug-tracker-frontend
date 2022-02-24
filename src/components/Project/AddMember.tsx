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
import { ProjectInterface } from "../../interface/projectInterface";
import {
  add_member_failure,
  add_member_request,
  add_member_success,
} from "../../store/selectProject.tsx/selectProjectAction";
import ButtonForm from "../Form/ButtonForm";
import Error from "../Form/Error";
import InputForm from "../Form/InputForm";
import { socket } from "../../socket";
import { useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";

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

  const project: ProjectInterface = useSelector(
    (state: RootStateOrAny) => state.project.project
  );
  const error: string = useSelector(
    (state: RootStateOrAny) => state.project.project.members.error
  );
  const title: string = useSelector(
    (state: RootStateOrAny) => state.project.project.title
  );
  const auth_name = useSelector((state: RootStateOrAny) => state.auth.username);

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
    const { username } = values;
    handlePreFetch();
    api
      .post("/addMembers", {
        username,
        project_id: project._id,
      })
      .then((res) => {
        const { data } = res;
        handlePostFetch(data);
        socket.emit("added-to-project", {
          username,
          title,
          auth: auth_name,
        });
      })
      .catch((err) => {
        handlePostFetch({
          error: "Something went wrong",
        });
      });
  }

  return (
    <>
      <Box>
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
          Add Member
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add member to the team</ModalHeader>
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
                      <InputForm message="Username" name="username" />
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
      </Box>
    </>
  );
};

export default AddMember;
