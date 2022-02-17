import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Notification from "../../components/Notification/Notification";
import useAuthCookies from "../../hooks/useAuthCookies";
import useFetch from "../../hooks/useFetch";
import { NotificationItemInterface } from "../../interface/notificationInterface";
import { checkOnlineStatus } from "../../socket";
import {
  fetch_notification_failure,
  fetch_notification_request,
  fetch_notification_success,
} from "../../store/notification/notificationAction";

const NotificationPage = () => {
  useAuthCookies()
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootStateOrAny) => state.notification);
  const { notification, loading, error } = notifications

  const { user_id } = useParams<{ user_id?: string }>();

  const auth = useSelector((state: RootStateOrAny) => state.auth);
  
  useEffect(() => {
    checkOnlineStatus(auth)
  }, [auth]);

  function handlePreFetch() {
    dispatch(fetch_notification_request());
  }

  function handlePostFetch(data: any) {
    if ("error" in data || "message" in data) {
      handleFailure(data);
    }
    dispatch(fetch_notification_success(data));
  }
  function handleFailure(data: any) {
    dispatch(fetch_notification_failure(data));
  }
  useFetch(
    {
      pathname: "/getNotification/" + user_id,
      method: "GET",
    },
    handlePreFetch,
    handlePostFetch,
    null
  );
  return (
    <>
      {
        notification.notifications.map((notification: NotificationItemInterface) => <Notification key={notification._id} notification={notification} />)
      }
    </>
  );
};

export default NotificationPage;
