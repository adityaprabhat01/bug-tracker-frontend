import { Avatar } from "@chakra-ui/react";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase";

interface Props {
  name: string;
  user_id: string;
  size: string;
}

const ProfilePicture = (props: Props) => {
  const { user_id, name, size } = props;
  const [src, setSrc] = useState("");
  useEffect(() => {
    const image = user_id + ".jpg";
    getDownloadURL(ref(storage, image))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        //xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
        //xhr.withCredentials = false;
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        setSrc(url);
      })
      .catch((error) => {});
  }, [user_id]);
  return (
    <>
      <Avatar size={size} name={name} src={src} />{" "}
    </>
  );
};

export default ProfilePicture;
