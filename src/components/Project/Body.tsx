import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api";
import { ErrorFetched, MessageFetched } from "../../interface/errorInterface";
import { User } from "../../interface/userInterface";
import {
  update_project_body_failure,
  update_project_body_request,
  update_project_body_success,
} from "../../store/selectProject.tsx/selectProjectAction";
import ButtonUI from "../ButtonUI";

interface Props {
  body: string;
  user: User;
  techStack: Array<any>;
  project_id: string;
}

const Body = (props: Props) => {
  const { body, project_id } = props;
  const [value, setValue] = useState(body);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  function handlePreFetch() {
    dispatch(update_project_body_request());
  }
  function handlePostFetch(
    data: { body: string } | ErrorFetched | MessageFetched
  ) {
    if ("error" in data || "message" in data) {
      return handleFailure(data);
    }
    dispatch(update_project_body_success(data));
    setIsOpen(false);
  }
  function handleFailure(data: ErrorFetched | MessageFetched) {
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

  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute(
      "style",
      "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
    );
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(this: any) {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  function f() {
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        "style",
        "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
      );
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(this: any) {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }
  }

  return (
    <>
      <Box mt={"3"}>
        {isOpen === true ? (
          <>
            <Textarea
              autoFocus
              value={value}
              border="none"
              borderRadius={"10px"}
              padding="2px"
              variant="flushed"
              onChange={(event) => setValue(event.target.value)}
              backgroundColor={"#ebedf0"}
              onFocus={f}
            />
            <Box mt={3}>
              <Button
                onClick={handleUpdate}
                backgroundColor={"blue.400"}
                color={"white"}
                borderRadius={"full"}
                _hover={{
                  backgroundColor: "blue.300",
                }}
                _active={{
                  backgroundColor: "#4299e1",
                }}
              >Update</Button>
            </Box>
          </>
        ) : (
          <Box>{value}</Box>
        )}
      </Box>

      <Box
        mt={3}
        width={"30px"}
        height={"30px"}
        backgroundColor={"#393838"}
        borderRadius="4px"
        _hover={{
          backgroundColor: "#595959",
          cursor: "pointer",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30"
          height="30"
          viewBox="0 0 172 172"
          style={{ fill: "#000000" }}
          onClick={handleOpen}
        >
          <g
            fill="none"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
            style={{ mixBlendMode: "normal" }}
          >
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g fill="#ffffff">
              <path d="M130.88125,17.2c-2.93403,0 -5.86843,1.12051 -8.10729,3.35938l-13.84062,13.84063l28.66667,28.66667l13.84062,-13.84063c4.47773,-4.47773 4.47773,-11.73685 0,-16.21458l-12.45208,-12.45208c-2.23887,-2.23887 -5.17326,-3.35937 -8.10729,-3.35937zM97.46667,45.86667l-67.31068,67.31067c0,0 5.26186,-0.47147 7.22266,1.48933c1.9608,1.9608 0.34669,14.792 2.75469,17.2c2.408,2.408 15.15831,0.71299 16.98724,2.54192c1.82894,1.82893 1.70209,7.43542 1.70209,7.43542l67.31067,-67.31067zM22.93333,131.86667l-5.40859,15.31875c-0.21262,0.60453 -0.32239,1.24042 -0.32474,1.88125c0,3.16643 2.5669,5.73333 5.73333,5.73333c0.64083,-0.00235 1.27672,-0.11212 1.88125,-0.32474c0.0187,-0.00737 0.03737,-0.01483 0.05599,-0.02239l0.14557,-0.04479c0.01122,-0.00743 0.02242,-0.01489 0.03359,-0.0224l15.08359,-5.31901l-8.6,-8.6z"></path>
            </g>
          </g>
        </svg>
      </Box>
    </>
  );
};

export default Body;
