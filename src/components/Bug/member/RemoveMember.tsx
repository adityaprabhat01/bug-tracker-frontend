import { Button } from "@chakra-ui/react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../../api";
import {
  ErrorFetched,
  MessageFetched,
} from "../../../interface/errorInterface";
import {
  remove_member_failure,
  remove_member_request,
  remove_member_success,
} from "../../../store/bug/bugAction";
import Error from "../../Form/Error";

interface Props {
  user_id: string;
}

const RemoveMemberBug = (props: Props) => {
  const { user_id } = props;

  const { bug_id } = useParams<{ bug_id?: string }>();
  const loading = useSelector(
    (state: RootStateOrAny) => state.bug.bug.members.loading
  );
  const error = useSelector(
    (state: RootStateOrAny) => state.bug.bug.members.error
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
      {error === "" ? null : <Error message={error} />}
      <Button
        isLoading={loading}
        loadingText="Removing"
        onClick={handleRemove}
        backgroundColor={"blue.400"}
        color={"white"}
        borderRadius={"full"}
        _hover={{
          backgroundColor: "blue.300",
        }}
        _active={{
          backgroundColor: "#4299e1",
        }}
      >
        Remove
      </Button>
    </>
  );
};

export default RemoveMemberBug;
