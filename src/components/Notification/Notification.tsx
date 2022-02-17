import { Avatar, Box, HStack, Wrap, WrapItem } from "@chakra-ui/react";
import { NotificationItemInterface } from "../../interface/notificationInterface";

interface Props {
  notification: NotificationItemInterface;
}

const Notification = (props: Props) => {
  const { notification } = props;
  return (
    <>
      <Box backgroundColor={"gray.300"} borderRadius={"4px"} mt={2}>
        <HStack>
          <Box>
            <Wrap>
              <WrapItem>
                <Avatar size="sm" name={notification.payload.auth} />{" "}
              </WrapItem>
            </Wrap>
          </Box>
          <Box as={"span"}>{notification.message}</Box>
        </HStack>
      </Box>
    </>
  );
};

export default Notification;
