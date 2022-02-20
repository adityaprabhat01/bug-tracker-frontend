import { Avatar, Box, HStack, Wrap, WrapItem, Text } from "@chakra-ui/react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../api";
import { NotificationItemInterface } from "../../interface/notificationInterface";
import { mark_as_read_success } from "../../store/notification/notificationAction";

interface Props {
  notification: NotificationItemInterface;
}

const Notification = (props: Props) => {
  const { notification } = props;
  const dispatch = useDispatch();
  const user_id = useSelector((state: RootStateOrAny) => state.auth.user_id);

  function handleRead() {
    api
      .post("/markAsread", {
        notification_id: notification._id,
        user_id,
      })
      .then((res) => {
        const { data } = res;
        dispatch(mark_as_read_success(data));
      })
      .catch((err) => {});
  }

  return (
    <>
      <Box
        backgroundColor={notification.seen === false ? "gray.300" : "gray.100"}
        borderRadius={"4px"}
        mt={2}
      >
        <HStack>
          <Box>
            <Wrap>
              <WrapItem>
                <Avatar size="sm" name={notification.payload.auth} />{" "}
              </WrapItem>
            </Wrap>
          </Box>
          <Box as={"span"}>{notification.message}</Box>
          <Box onClick={handleRead}>
            <Text as="u" _hover={{
              cursor: "pointer"
            }}>
              {notification.seen === false ? "Mark as read" : ""}
            </Text>
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default Notification;
