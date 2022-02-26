import {
  Box,
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { User } from "../interface/userInterface";
import RemoveMemberBug from "./Bug/member/RemoveMember";
import RemoveMember from "./Project/RemoveMember";

interface Props {
  members: Array<User>;
  loading: boolean;
  error: string;
  source: string;
}

const MemberList = (props: Props) => {
  const { members, source } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor={"blue.400"}
        color={"white"}
        borderRadius={"full"}
        _hover={{
          backgroundColor: "blue.300",
        }}
      >
        Participants
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Participants</ModalHeader>
          <ModalCloseButton />
          {members.map((member) => (
            <Box key={member._id}>
              <HStack>
                <Box>{member.name}</Box>
                {source === "SelectedProjectPage" ? (
                  <RemoveMember user_id={member.user_id} />
                ) : (
                  <RemoveMemberBug user_id={member.user_id} />
                )}
              </HStack>
            </Box>
          ))}
        </ModalContent>
      </Modal>
    </>
  );
};

export default MemberList;
