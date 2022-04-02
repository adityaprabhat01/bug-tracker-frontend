import {
  Box,
  Center,
  Link,
  useMediaQuery,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NotificationBadge from "./Notification/NotificationBadge";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import ProfilePictureUpload from "./ProfilePictureUpload";
import ProfilePicture from "./ProfilePicture";
import { api } from "../api";
import { fetch_notofication_count } from "../store/notification/notificationAction";

const Sidebar = () => {
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  const [isLargerThan1400] = useMediaQuery("(min-width: 1400px)");
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLargerThan1400) setShowSidebar(false);
  }, [isLargerThan1400]);

  useEffect(() => {
    api.get("getNotificationCount/" + auth.user_id).then(res => {
      const { data } = res;
      console.log(data)
      dispatch(fetch_notofication_count(data.count));
    })
  }, [auth.user_id, dispatch])

  return (
    <>
      {isLargerThan1400 || showSidebar ? (
        <Box
          backgroundColor={"#4299e1"}
          position="fixed"
          top={0}
          bottom={0}
          width={"240px"}
        >
          {showSidebar ? (
            <Box
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
            >
              <GiHamburgerMenu />
            </Box>
          ) : null}
          <Box mt={20}>
            <Box>
              <Center>
                <Box>
                  <Wrap>
                    <WrapItem>
                      <ProfilePicture size="2xl" name={auth.name} user_id={auth.user_id} />
                    </WrapItem>
                  </Wrap>
                </Box>
              </Center>
            </Box>

            <Box mt={4}>
              <Center color={"white"}>{auth.name}</Center>
            </Box>

            <Box mt={4}>
              <Center>
                <Box color={"white"}>@{auth.username}</Box>
              </Center>
            </Box>

            <Box mt={4}>
              <Center>
                <NotificationBadge />
              </Center>
            </Box>

            <Box mt={4}>
              <Center color={"white"}r>
                <Link as={NavLink} to={"/projects/"}>
                  Projects
                </Link>
              </Center>
            </Box>

            <Box mt={4}>
              <Center>
                <ProfilePictureUpload />
              </Center>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
        >
          <GiHamburgerMenu />
        </Box>
      )}
    </>
  );
};

export default Sidebar;
