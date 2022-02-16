import { Box } from "@chakra-ui/react";
import { NotificationItemInterface } from "../../interface/notificationInterface";

interface Props {
  notification: NotificationItemInterface
}

const Notification = (props: Props) => {
  const { notification } = props;
  return (
    <>
      <Box backgroundColor={"gray.300"} borderRadius={"4px"} mt={2}>
        <Box>
          {notification.message}
        </Box>
      </Box>
    </>
  );
};

export default Notification;
