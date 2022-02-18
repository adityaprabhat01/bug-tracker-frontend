import { Badge, Link } from "@chakra-ui/react";
import { RootStateOrAny, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NotificationBadge = () => {
  const count = useSelector(
    (state: RootStateOrAny) => state.notification.notification.count
  );
  const user_id = useSelector((state: RootStateOrAny) => state.auth.user_id);
  return (
    <>
      <Link as={NavLink} to={"/notification/" + user_id}>
        <Badge ml="1" fontSize="0.8em" colorScheme="red">
          Notification {count}
        </Badge>
      </Link>
    </>
  );
};

export default NotificationBadge;
