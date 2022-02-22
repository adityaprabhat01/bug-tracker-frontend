import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../../api";
import {
  update_label_failure,
  update_label_request,
  update_label_success,
} from "../../../store/bug/bugAction";
import LabelItem from "./LabelItem";

interface Props {
  labels: any;
}

const AddLabel = (props: Props) => {
  const { labels } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [labelState, setLabelState] = useState(labels);
  const bug_id = useSelector((state: RootStateOrAny) => state.bug.bug._id);
  const dispatch = useDispatch();

  function handlePreFetch() {
    dispatch(update_label_request());
  }
  function handlePostFetch(data: any) {
    if ("error" in data || "message" in data) {
      handleFailure(data);
    }
    dispatch(update_label_success(data));
    document.getElementById("edit-labels")?.click();
  }

  function handleFailure(data: { error: string; message: string }) {
    dispatch(update_label_failure(data));
  }

  function handleUpdate() {
    handlePreFetch();
    api
      .post("/updateLabel", {
        ...labelState,
        bug_id,
      })
      .then((res) => {
        const { data } = res;
        handlePostFetch(data);
      })
      .catch((err) => {});
  }

  function selectLabel(index: number) {
    const newObj = { ...labelState };
    newObj.labels[index].assigned = !newObj.labels[index].assigned;
    setLabelState(newObj);
  }

  return (
    <>
      <Menu closeOnSelect={false}>
        {({ isOpen }) => (
          <>
            <MenuButton>
              <Box
                width={"100%"}
                onClick={() => setShowEdit(!showEdit)}
                _hover={{
                  cursor: "pointer",
                }}
              >
                <Button backgroundColor={"white"} id="edit-labels">Edit Labels</Button>
              </Box>
            </MenuButton>

            <MenuList>
              <>
                {labelState.labels.map((label: any, index: number) => (
                  <MenuItem key={label._id}>
                    <LabelItem
                      {...label}
                      selectLabel={selectLabel}
                      index={index}
                    />
                  </MenuItem>
                ))}
                <Button onClick={handleUpdate}>Update</Button>
              </>
            </MenuList>
          </>
        )}
      </Menu>
    </>
  );
};

export default AddLabel;
