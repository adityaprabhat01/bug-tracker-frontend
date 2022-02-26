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
import { api } from "../../../api";
import { socket } from "../../../socket";
import {
  add_member_failure,
  add_member_request,
  add_member_success,
} from "../../../store/bug/bugAction";
import ButtonForm from "../../Form/ButtonForm";
import Error from "../../Form/Error";
import InputForm from "../../Form/InputForm";
import { BsPlusLg } from "react-icons/bs";
import { ErrorFetched, MessageFetched } from "../../../interface/errorInterface";
import { User } from "../../../interface/userInterface";

interface InitialValuesInterface {
  username: string;
}

interface Props {
  bug_id: string;
}

const AddMemberBug = (props: Props) => {
  const { bug_id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const error: string = useSelector(
    (state: RootStateOrAny) => state.bug.bug.members.error
  );
  const loading: boolean = useSelector(
    (state: RootStateOrAny) => state.bug.bug.members.loading
  );
  const auth_name = useSelector((state: RootStateOrAny) => state.auth.username);

  const initialValues: InitialValuesInterface = {
    username: "",
  };

  const dispatch = useDispatch();
  function handlePreFetch() {
    dispatch(add_member_request());
  }
  function handlePostFetch(data: User | ErrorFetched | MessageFetched) {
    if ("error" in data || "message" in data) {
      return handleFailure(data);
    }
    dispatch(add_member_success(data));
    onClose();
  }
  function handleFailure(data: ErrorFetched | MessageFetched) {
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
        socket.emit("added-to-bug", {
          username,
          bug_id,
          auth: auth_name,
          title: bug_id,
        });
      })
      .catch((err) => {
        console.log(err);
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
          _active={{
            backgroundColor: "#4299e1",
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
                    {loading === false ? (
                      <ButtonForm message="Submit" />
                    ) : (
                      <Button isLoading={loading} />
                    )}
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
