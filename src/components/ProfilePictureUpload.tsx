import { Button } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { RootStateOrAny, useSelector } from "react-redux";
import { storage } from "../firebase";

const ProfilePictureUpload = () => {
  const [show, setShow] = useState(false);
  const inputRef = useRef<any>();

  const user_id = useSelector((state: RootStateOrAny) => state.auth.user_id);

  function handleOenFileSelector() {
    setShow(!show);
  }

  function handleUploadPhoto() {
    if (inputRef.current.files.length === 0) return;
    const file = inputRef.current.files[0];
    const storageRef = ref(storage, user_id + ".jpg");
    uploadBytes(storageRef, file).then((snapshot) => {
      setShow(false);
    });
  }

  return (
    <>
      <Button onClick={handleOenFileSelector}>Photo</Button>
      {show === true ? (
        <>
          <input
            ref={inputRef}
            className="ml-3"
            style={{ backgroundColor: "#e2e6e9", width: "15em" }}
            type="file"
            name="photo"
            id="upload-file"
          />
          <Button onClick={handleUploadPhoto}>Upload</Button>
        </>
      ) : null}
    </>
  );
};

export default ProfilePictureUpload;
