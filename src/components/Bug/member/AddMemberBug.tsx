import {
  Box,
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
import { api } from "../../../api";
import {
  add_member_failure,
  add_member_request,
  add_member_success,
} from "../../../store/bug/bugAction";
import ButtonUI from "../../ButtonUI";
import ButtonForm from "../../Form/ButtonForm";
import Error from "../../Form/Error";
import InputForm from "../../Form/InputForm";

interface InitialValuesInterface {
  username: string;
}

interface Props {
  bug_id: string;
}

const AddMemberBug = (props: Props) => {
  const { bug_id } = props;
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const error: string = useSelector((state: RootStateOrAny) => state.bug.bug.members.error);
  const loading: boolean = useSelector((state: RootStateOrAny) => state.bug.bug.members.loading);

  const initialValues: InitialValuesInterface = {
    username: "",
  };
  function handlePreFetch() {
    dispatch(add_member_request());
  }

  function handlePostFetch(data: any) {
    if ("error" in data || "message" in data) {
      return handleFailure(data);
    }
    dispatch(add_member_success(data));
    onClose();
  }

  function handleFailure(data: any) {
    dispatch(add_member_failure(data));
    onClose();
  }

  function handleSubmit(values: InitialValuesInterface, fn: Function) {
    handlePreFetch();
    const { username } = values;
    api
      .post("addMemberBug", {
        bug_id,
        username,
      })
      .then((res) => {
        const { data } = res;
        handlePostFetch(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Box mt={3}>
        <ButtonUI handleClick={onOpen} value="Add Member" />
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
                      <FormLabel>Username</FormLabel>
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

export default AddMemberBug;