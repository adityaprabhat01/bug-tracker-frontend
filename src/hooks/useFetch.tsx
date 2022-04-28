import axios from "axios";
import { useEffect } from "react";
import { url } from "../url";

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

const useFetch = (
  options: any,
  handlePreFetch: Function,
  handlePostFetch: Function,
  postData: any
) => {
  handlePreFetch();
  useEffect(() => {
    switch (options.method) {
      case "GET": {
        api
          .get(options.pathname)
          .then((res) => {
            const { data } = res;
            handlePostFetch(data);
          })
          .catch((err) => {});

        break;
      }
      case "POST": {
        handlePreFetch();
        api
          .post(options.pathname, postData)
          .then((res) => {
            const { data } = res;
            handlePostFetch(data);
          })
          .catch((err) => {});
        break;
      }
      default:
        return;
    }
  }, []);
};

export default useFetch;
