import { Button } from "@chakra-ui/react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../../api";
import { BugInterface } from "../../../interface/bugInterface";
import {
  remove_member_failure,
  remove_member_request,
  remove_member_success,
} from "../../../store/bug/bugAction";

interface Props {
  user_id: string;
}

const RemoveMemberBug = (props: Props) => {
  const { user_id } = props;
  const dispatch = useDispatch();
  const { bug_id } = useParams<{ bug_id?: string }>();
  const loading = useSelector(
    (state: RootStateOrAny) => state.bug.bug.members.loading
  );
  const error = useSelector(
    (state: RootStateOrAny) => state.bug.bug.members.error
  );

  function handlePreFetch() {
    dispatch(remove_member_request());
  }

  function handlePostFetch(data: any) {
    if ("error" in data || "message" in data) {
      handleFailure(data);
    }
    const { user_id } = data;
    dispatch(remove_member_success(user_id));
  }

  function handleFailure(data: any) {
    dispatch(remove_member_failure(data));
  }

  function handleRemove() {
    handlePreFetch();
    api
      .post("/removeMemberBug", {
        user_id,
        bug_id,
      })
      .then((res) => {
        const { data } = res;
        handlePostFetch(data);
      })
      .catch((err) => {});
  }

  return (
    <>
      <Button isLoading={loading} loadingText="Removing" onClick={handleRemove}>
        Remove
      </Button>
    </>
  );
};

export default RemoveMemberBug;
