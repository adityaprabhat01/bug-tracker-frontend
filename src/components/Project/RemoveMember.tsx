import { Button } from "@chakra-ui/react"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../api";
import { selectProjectInitStateInterface } from "../../interface/projectInterface";
import { remove_member_failure, remove_member_request, remove_member_success } from "../../store/selectProject.tsx/selectProjectAction";

interface Props {
  user_id: string
}

const RemoveMember = (props: Props) => {
  const { user_id } = props;
  const project: selectProjectInitStateInterface = useSelector((state: RootStateOrAny) => state.project);
  const dispatch = useDispatch();
  function handleSelector (state: selectProjectInitStateInterface) {
    const { project } = state;
    const { _id } = project;
    return { project_id: _id }
  }

  function handlePreFetch() {
    dispatch(remove_member_request());
  }

  function handlePostFetch(data: any) {
    console.log(data)
    if("error" in data || "message" in data) {
      handleFailure(data)
    }
    const { user_id } = data;
    dispatch(remove_member_success(user_id))
  }

  function handleFailure (data: any) {
    dispatch(remove_member_failure(data))
  }

  function handleRemove() {
    handlePreFetch();
    const project_id = handleSelector(project);
    api.post("/removeMember", {
      user_id,
      ...project_id
    }).then(res => {
      const { data } = res;
      handlePostFetch(data);
    }).catch(err => {})
  }
  
  return (
    <>
      <Button onClick={handleRemove}>
        Remove
      </Button>
    </>
  )
}

export default RemoveMember;