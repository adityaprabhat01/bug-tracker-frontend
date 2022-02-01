import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api";
import { User } from "../../interface/userInterface";
import {
  update_project_body_failure,
  update_project_body_request,
  update_project_body_success,
} from "../../store/selectProject.tsx/selectProjectAction";
import TechStack from "./TechStack";

interface Props {
  body: string;
  user: User;
  techStack: Array<any>;
  project_id: string;
}

const Body = (props: Props) => {
  const { body, techStack, project_id } = props;
  const [value, setValue] = useState(body);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  function handlePreFetch() {
    dispatch(update_project_body_request());
  }

  function handlePostFetch(data: any) {
    if ("error" in data || "message" in data) {
      handleFailure(data);
    }
    dispatch(update_project_body_success(data));
  }

  function handleFailure(data: any) {
    dispatch(update_project_body_failure(data));
  }

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  function handleUpdate(stack: string) {
    handlePreFetch();
    const obj = {
      name: stack,
    };
    api
      .post("/updateProject", {
        techStack: obj,
        body: value,
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
      <Box mt={"3"}>
        {isOpen === true ? (
          <Textarea
            value={value}
            border="none"
            variant="flushed"
            onChange={(event) => setValue(event.target.value)}
          />
        ) : (
          <Box>{value}</Box>
        )}
      </Box>
      <Box mt={"3"}>
        <TechStack
          isOpen={isOpen}
          stack={techStack}
          handleUpdate={handleUpdate}
        />
      </Box>

      <Button mt={3} onClick={handleOpen}>Edit</Button>
    </>
  );
};

export default Body;
