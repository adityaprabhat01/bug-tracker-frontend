import { Button } from "@chakra-ui/react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../api";
import { ErrorFetched, MessageFetched } from "../../interface/errorInterface";
import {
  remove_member_failure,
  remove_member_request,
  remove_member_success,
} from "../../store/selectProject.tsx/selectProjectAction";
import Error from "../Form/Error";

interface Props {
  user_id: string;
}

const RemoveMember = (props: Props) => {
  const { user_id } = props;
  const loading = useSelector(
    (state: RootStateOrAny) => state.project.project.members.loading
  );
  const error = useSelector(
    (state: RootStateOrAny) => state.project.project.members.error
  );

  const project_id = useSelector(
    (state: RootStateOrAny) => state.project.project._id
  );

  const dispatch = useDispatch();
  function handlePreFetch() {
    dispatch(remove_member_request());
  }
  function handlePostFetch(
    data: { user_id: string } | ErrorFetched | MessageFetched
  ) {
    if ("error" in data || "message" in data) {
      return handleFailure(data);
    }
    dispatch(remove_member_success(data));
  }
  function handleFailure(data: ErrorFetched | MessageFetched) {
    dispatch(remove_member_failure(data));
  }

  function handleRemove() {
    handlePreFetch();
    api
      .post("/removeMember", {
        user_id,
        project_id,
      })
      .then((res) => {
        const { data } = res;
        handlePostFetch(data);
      })
      .catch((err) => {});
  }

  return (
    <>
      {error === "" ? null : <Error message={error} />}
      <Button isLoading={loading} loadingText="Removing" onClick={handleRemove}>
        Remove
      </Button>
    </>
  );
};

export default RemoveMember;
