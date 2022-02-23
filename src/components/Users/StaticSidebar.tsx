import { Avatar, Box, Center, Wrap, WrapItem } from "@chakra-ui/react";
import { RootStateOrAny, useSelector } from "react-redux";

interface Props {
  name: string;
  username: string;
  date_joined: string;
  email: string;
}

const StaticSidebar = (props: Props) => {
  const { name, username, date_joined, email } = props;
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
                    <Avatar size="xl" name={name} />{" "}
                  </WrapItem>
                </Wrap>
              </Box>
            </Center>
          </Box>

          <Box mt={4}>
            <Center>{name}</Center>
          </Box>

          <Box mt={4}>
            <Center>
              <Box color={"#868e9c"}>@{username}</Box>
            </Center>
          </Box>

          <Box mt={4}>
            <Center>
              <Box color={"#868e9c"}>{email}</Box>
            </Center>
          </Box>

          <Box mt={4}>
            <Center>
              <Box color={"#868e9c"}>{date_joined}</Box>
            </Center>
          </Box>

        </Box>
      </Box>
    </>
  );
};

export default StaticSidebar;
