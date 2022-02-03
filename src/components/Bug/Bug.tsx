import { Box } from "@chakra-ui/react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { User } from "../../interface/userInterface";
import {
  bug_fetch_failure,
  bug_fetch_request,
  bug_fetch_success,
} from "../../store/bug/bugAction";
import Loading from "../Loading";
import Title from "../Title";
import AddMemberBug from "./AddMemberBug";
import Body from "./Body";
import BugMember from "./BugMember";

const Bug = () => {
  const { bug_id } = useParams<{ bug_id?: string }>();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootStateOrAny) => state.bug.loading);
  const error = useSelector((state: RootStateOrAny) => state.bug.error);
  const bug = useSelector((state: RootStateOrAny) => state.bug.bug);

  function handlePreFetch() {
    dispatch(bug_fetch_request());
  }

  function handlePostFetch(data: any) {
    if ("error" in data || "message" in data) {
      return handleFailure(data);
    }
    dispatch(bug_fetch_success(data));
  }

  function handleFailure(data: any) {
    dispatch(bug_fetch_failure(data));
  }
  useFetch(
    {
      pathname: "/getBug/" + bug_id,
      method: "GET",
    },
    handlePreFetch,
    handlePostFetch,
    null
  );

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          <Box>{bug.isOpen.isOpen}</Box>
          <Box>
            <Title title={bug.title} />
          </Box>
          <Body body={bug.body} user={bug.user} />
          <AddMemberBug bug_id={bug._id} />
          {
            bug.members.members.map((member: User) => <BugMember key={member._id} member={member} />)
          }
        </>
      )}
    </>
  );
};

export default Bug;
