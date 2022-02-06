import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../../api";
import {
  update_bug_body_success,
  update_label_failure,
  update_label_request,
} from "../../../store/bug/bugAction";
import LabelItem from "./LabelItem";

interface Props {
  labels: any;
}

const AddLabel = (props: Props) => {
  const { labels } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [labelState, setLabelState] = useState(labels);
  const bug_id = useSelector((state: RootStateOrAny) => state.bug.bug._id)
  const dispatch = useDispatch();

  function handlePreFetch() {
    dispatch(update_label_request());
  }
  function handlePostFetch(data: any) {
    if ("error" in data || "message" in data) {
      handleFailure(data);
    }
    dispatch(update_bug_body_success(data));
  }

  function handleFailure(data: { error: string; message: string }) {
    dispatch(update_label_failure(data));
  }

  function handleUpdate() {
    handlePreFetch();
    api
      .post("/updateLabel", {
        ...labelState,
        bug_id
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
      <Button onClick={() => setShowEdit(!showEdit)}>Edit Labels</Button>
      {showEdit === true ? (
        <>
          {labels.labels.map((label: any, index: number) => (
            <LabelItem
              key={label._id}
              {...label}
              selectLabel={selectLabel}
              index={index}
            />
          ))}
          <Button onClick={handleUpdate}>Update</Button>
        </>
      ) : null}
    </>
  );
};

export default AddLabel;
