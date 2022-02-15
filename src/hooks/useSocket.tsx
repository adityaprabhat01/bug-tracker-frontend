import { useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { socket } from "../socket";

const useSocket = () => {
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  const { name, username, user_id } = auth;
  useEffect(() => {
    socket.emit("login", {
      name,
      username,
      user_id,
    });

    socket.on("success", (payload: any) => {});
  }, [name, user_id, username]);
};

export default useSocket;
