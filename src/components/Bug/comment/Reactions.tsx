import { Box, Divider, HStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { api } from "../../../api";
import { ReactionsInterface } from "../../../interface/bugInterface";
import { update_reactions } from "../../../store/bug/bugAction";
import { FcLike } from "react-icons/fc";
import { FaLaughBeam, FaAngry } from "react-icons/fa";
import { motion } from "framer-motion";

interface Props {
  reactions: Array<ReactionsInterface>;
  comment_id: string;
}

const emojis = [
  <FcLike />,
  <FaLaughBeam color="#d0d018c7" />,
  <FaAngry color="#f44336" />,
];

const MotionBox = motion(Box)

const Reactions = (props: Props) => {
  const { reactions, comment_id } = props;
  const dispatch = useDispatch();

  function handleUpdate(index: number) {
    api
      .post("/reactToComment", {
        index,
        comment_id,
      })
      .then((res) => {
        const { data } = res;
        dispatch(update_reactions(data));
      });
  }

  return (
    <>
      <HStack>
        {reactions.map((reaction, i) => (
          <Box _hover={{
            cursor: "pointer"
          }}>
            <HStack>
              <MotionBox onClick={() => handleUpdate(i)} whileHover={{ scale: 1.5 }}>
              {emojis[i]}
              </MotionBox>
              
              <Box as={"span"}>{reaction.count}</Box>
              <Box height={"20px"}>
              <Divider orientation='vertical' />
              </Box>
              
            </HStack>
          </Box>
        ))}
      </HStack>
    </>
  );
};

export default Reactions;
