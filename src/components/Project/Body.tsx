import { Box, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api";
import { User } from "../../interface/userInterface";
import {
  update_project_body_failure,
  update_project_body_request,
  update_project_body_success,
} from "../../store/selectProject.tsx/selectProjectAction";
import ButtonUI from "../ButtonUI";
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

  function handleUpdate() {
    handlePreFetch();
    api
      .post("/updateProjectBody", {
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
          <>
            <Textarea
              value={value}
              border="none"
              variant="flushed"
              onChange={(event) => setValue(event.target.value)}
            />
            <ButtonUI value="update" handleClick={handleUpdate} />
          </>
        ) : (
          <Box>{value}</Box>
        )}
      </Box>
      <Box mt={"3"}>
        <TechStack isOpen={isOpen} stack={techStack} />
      </Box>
      <Box mt={3}>
        <ButtonUI handleClick={handleOpen} value="Edit" />
      </Box>
    </>
  );
};

export default Body;
