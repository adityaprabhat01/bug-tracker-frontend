import { Avatar, Box, Center, Link, Wrap, WrapItem } from "@chakra-ui/react";
import { RootStateOrAny, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NotificationBadge from "./Notification/NotificationBadge";

const Sidebar = () => {
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  return (
    <>
      <Box
        backgroundColor={"purple.50"}
        position="fixed"
        top={0}
        bottom={0}
        width={"240px"}
      >
        <Box mt={20}>
          <Box>
            <Center>
              <Box>
                <Wrap>
                  <WrapItem>
                    <Avatar size="xl" name={auth.name} />{" "}
                  </WrapItem>
                </Wrap>
              </Box>
            </Center>
          </Box>

          <Box mt={4}>
            <Center>{auth.name}</Center>
          </Box>

          <Box mt={4}>
            <Center>
              <Box color={"#868e9c"}>@{auth.username}</Box>
            </Center>
          </Box>

          <Box mt={4}>
            <Center>
              <NotificationBadge />
            </Center>
          </Box>

          <Box mt={4}>
            <Center>
              <Link as={NavLink} to={"/projects/"}>
                Projects
              </Link>
            </Center>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
