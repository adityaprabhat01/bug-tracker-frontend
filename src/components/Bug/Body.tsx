import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../api";
import {
  update_bug_body_failure,
  update_bug_body_request,
  update_bug_body_success,
} from "../../store/bug/bugAction";
import ButtonUI from "../ButtonUI";

const Body = () => {
  const bug_id = useSelector((state: RootStateOrAny) => state.bug.bug._id);
  const body = useSelector((state: RootStateOrAny) => state.bug.bug.body);

  const [value, setValue] = useState(body.body);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  function handlePreFetch() {
    dispatch(update_bug_body_request());
  }

  function handlePostFetch(data: any) {
    if ("error" in data || "message" in data) {
      handleFailure(data);
    }
    dispatch(update_bug_body_success(data));
    setIsOpen(!isOpen);
  }

  function handleFailure(data: any) {
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
            {body.loading === true ? (
              <Button
                isLoading={body.loading}
                loadingText="Submitting"
                size={"lg"}
                type="submit"
              >
                Updating
              </Button>
            ) : (
              <Box mt={2}>
                <ButtonUI value="update" handleClick={handleUpdate} />
              </Box>
            )}
          </>
        ) : (
          <Box>{value}</Box>
        )}
      </Box>

      <Box mt={3}>
        <ButtonUI handleClick={handleOpen} value="Edit" />
      </Box>
    </>
  );
};

export default Body;
