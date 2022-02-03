import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../api";
import { update_project_techstack_failure, update_project_techStack_request, update_project_techStack_success } from "../../store/selectProject.tsx/selectProjectAction";
import CloseUI from "../CloseUI";

interface Props {
  stack: Array<any>;
  isOpen: boolean;
}

const TechStack = (props: Props) => {
  const { stack, isOpen } = props;
  const [value, setValue] = useState("");
  const project_id = useSelector((state: RootStateOrAny) => state.project.project._id);
  const dispatch = useDispatch();
  function handleAddPreFetch() {
    dispatch(update_project_techStack_request())
  }
  function handleAddPostFetch(data: any) {
    if("error" in data || "message" in data) {
      handleAddFailure(data)
    }
    dispatch(update_project_techStack_success(data));
  }
  function handleAddFailure(data: any) {
    dispatch(update_project_techstack_failure(data))
  }

  function handleAdd() {
    handleAddPreFetch();
    api.post("/updateProjectTechStack", {
      type: "ADD",
      project_id,
      name: value
    }).then(res => {
      const { data } = res;
      handleAddPostFetch(data);
    }).catch(err => {})
  }

  function handleRemove (techStack_id: string) {
    handleAddPreFetch();
    api.post("/updateProjectTechStack", {
      type: "REMOVE",
      project_id,
      techStack_id
    }).then(res => {
      const { data } = res;
      handleAddPostFetch(data)
    }).catch(err => {})
  }

  return (
    <>
      <Box>
        <HStack>
          {stack.map((tech: any) => (
            <Box key={tech._id}>
              <Box
                backgroundColor={"blue.200"}
                borderRadius={"full"}
                padding={"6px"}
                key={tech._id}
                position="relative"
              >
                {
                  isOpen === true ? <CloseUI techStack_id={tech._id} handleRemove={handleRemove} /> : null
                }
                
                {tech.name}
              </Box>
            </Box>
          ))}
        </HStack>

        {isOpen === true ? (
          <Box mt={"3"}>
            <Input
              width={"small"}
              variant="flushed"
              onChange={(event) => setValue(event.target.value)}
            />
            <Button ml={"3"} onClick={handleAdd}>
              Update
            </Button>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default TechStack;
