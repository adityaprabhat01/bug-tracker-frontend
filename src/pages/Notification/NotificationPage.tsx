import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "../../components/Form/Error";
import Loading from "../../components/Loading";
import Notification from "../../components/Notification/Notification";
import useAuthCookies from "../../hooks/useAuthCookies";
import useFetch from "../../hooks/useFetch";
import { ErrorFetched, MessageFetched } from "../../interface/errorInterface";
import {
  NotificationInterface,
  NotificationItemInterface,
} from "../../interface/notificationInterface";
import { checkOnlineStatus } from "../../socket";
import {
  fetch_notification_failure,
  fetch_notification_request,
  fetch_notification_success,
} from "../../store/notification/notificationAction";

const NotificationPage: React.FC = () => {
  useAuthCookies();
  const { user_id } = useParams<{ user_id?: string }>();
  useFetch(
    {
      pathname: "/getNotification/" + user_id,
      method: "GET",
    },
    handlePreFetch,
    handlePostFetch,
    null
  );

  const notifications = useSelector(
    (state: RootStateOrAny) => state.notification
  );
  const { notification, loading, error } = notifications;
  
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  console.log(loading)
  useEffect(() => {
    checkOnlineStatus(auth);
  }, [auth]);

  const dispatch = useDispatch();
  function handlePreFetch() {
    dispatch(fetch_notification_request());
  }
  function handlePostFetch(
    data: NotificationInterface | MessageFetched | ErrorFetched
  ) {
    if ("error" in data || "message" in data) {
      return handleFailure(data);
    }
    dispatch(fetch_notification_success(data));
  }
  function handleFailure(data: MessageFetched | ErrorFetched) {
    dispatch(fetch_notification_failure(data));
  }

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          {error === "" ? (
            <>
              {notification.notifications.map(
                (notification: NotificationItemInterface) => 
                  <Notification
                    key={notification._id}
                    notification={notification}
                  />
              )}
            </>
          ) : (
            <>
              <Error message={error} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default NotificationPage;
