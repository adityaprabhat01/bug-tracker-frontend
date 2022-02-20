import { Button } from "@chakra-ui/react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../../api";
import { delete_comment_success } from "../../../store/bug/bugAction";

interface Props {
  bug_id: string;
  comment_id: string;
}

const DeleteComment = (props: Props) => {
  const user_id = useSelector((state: RootStateOrAny) => state.auth.user_id);
  const { bug_id, comment_id } = props;
  const dispatch = useDispatch();
  function handleDelete() {
    api
      .post("deleteComment", {
        user_id,
        bug_id,
        comment_id,
      })
      .then((res) => {
        const { data } = res;
        dispatch(delete_comment_success(data._id));
      })
      .catch((err) => {});
  }
  return (
    <>
      <Button onClick={handleDelete} ml={3}>Delete</Button>
    </>
  );
};

export default DeleteComment;
