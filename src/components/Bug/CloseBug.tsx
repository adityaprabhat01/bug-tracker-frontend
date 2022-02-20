import { Button } from "@chakra-ui/react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../api";
import { close_bug_success } from "../../store/bug/bugAction";

interface Props {
  bug_id: string | undefined;
  isOpen: any;
}

const CloseBug = (props: Props) => {
  const user_id = useSelector((state: RootStateOrAny) => state.auth.user_id);
  const dispatch = useDispatch();
  function handleCloseBug() {
    api
      .post("closeBug", {
        bug_id,
        user_id,
      })
      .then((res) => {
        const { data } = res;
        dispatch(close_bug_success(data));
      })
      .catch((err) => {});
  }

  function handleReOpenBug() {
    api
    .post("reopenBug", {
      bug_id,
      user_id,
    })
    .then((res) => {
      const { data } = res;
      dispatch(close_bug_success(data));
    })
    .catch((err) => {});
  }
  const { bug_id, isOpen } = props;
  return (
    <>
      {isOpen.isOpen === true ? (
        <Button onClick={handleCloseBug}>Close Bug</Button>
      ) : (
        <Button onClick={handleReOpenBug}>Reopen Bug</Button>
      )}
    </>
  );
};

export default CloseBug;
