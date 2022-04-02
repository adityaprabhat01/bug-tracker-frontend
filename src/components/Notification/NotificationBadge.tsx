import { Badge, Box, Link } from "@chakra-ui/react";
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
        <Badge padding={"8px"} ml="1" fontSize="1em" colorScheme="white">
          <Box color={"white"} as="span">Notification</Box>  <Box as={"span"} color="red">{count}</Box>
        </Badge>
      </Link>
    </>
  );
};

export default NotificationBadge;
