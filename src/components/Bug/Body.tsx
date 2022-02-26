import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../api";
import {
  update_bug_body_failure,
  update_bug_body_request,
  update_bug_body_success,
} from "../../store/bug/bugAction";
import { AiTwotoneEdit } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { ErrorFetched, MessageFetched } from "../../interface/errorInterface";

const Body = () => {
  const bug_id = useSelector((state: RootStateOrAny) => state.bug.bug._id);
  const body = useSelector((state: RootStateOrAny) => state.bug.bug.body);

  const [value, setValue] = useState(body.body);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  function handlePreFetch() {
    dispatch(update_bug_body_request());
  }
  function handlePostFetch(data: { body: string } | ErrorFetched | MessageFetched) {
    if ("error" in data || "message" in data) {
      return handleFailure(data);
    }
    dispatch(update_bug_body_success(data));
    setIsOpen(!isOpen);
  }
  function handleFailure(data: ErrorFetched | MessageFetched) {
    dispatch(update_bug_body_failure(data));
  }

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  function handleUpdate() {
    handlePreFetch();
    api
      .post("/updateBug", {
        body: value,
        bug_id,
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
              backgroundColor={"#ebedf0"}
              onFocus={f}
              onChange={(event) => setValue(event.target.value)}
            />
            {body.loading === true ? (
              <Box mt={2}>
                <Button
                  isLoading={body.loading}
                  loadingText="Updating"
                  type="submit"
                  backgroundColor={"blue.400"}
                >
                  Updating
                </Button>
              </Box>
            ) : (
              <Box mt={2}>
                <Button
                  onClick={handleUpdate}
                  backgroundColor={"blue.400"}
                  color={"white"}
                  borderRadius={"full"}
                  _hover={{
                    backgroundColor: "blue.300",
                  }}
                  leftIcon={<GrUpdate color="white" size={"0.8rem"} />}
                >
                  Update
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box>{value}</Box>
        )}
      </Box>

      <Box
        mt={3}
        width={"30px"}
        height={"30px"}
        backgroundColor={"gray.100"}
        borderRadius="4px"
        onClick={handleOpen}
        _hover={{
          backgroundColor: "gray.50",
          cursor: "pointer",
        }}
      >
        <AiTwotoneEdit size={"2rem"} />
      </Box>
    </>
  );
};

export default Body;
