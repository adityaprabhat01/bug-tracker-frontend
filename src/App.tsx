import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import ProjectPage from "./pages/Project/ProjectPage";
import Project from "./pages/SelectedProject/SelectedProjectPage";
import BugPage from "./pages/Bug/BugPage";
import { useEffect } from "react";
import { socket } from "./socket";
import NotificationPage from "./pages/Notification/NotificationPage";
import { useDispatch } from "react-redux";
import { receive_notification } from "./store/notification/notificationAction";
import NotificationBadge from "./components/Notification/NotificationBadge";
import UserPage from "./pages/User/UserPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("added-to-bug-success", (payload) => {
      console.log(payload);
    });

    socket.on("comment-on-bug-success", (payload) => {
      console.log(payload);
      dispatch(receive_notification(payload.count));
    });

    socket.on("added-to-project-success", (payload) => {
      console.log(payload);
      dispatch(receive_notification(payload.count));
    });
  }, [dispatch]);

  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/project/:project_id" element={<Project />} />
            <Route path="/project/:project_id/bug/:bug_id" element={<BugPage />} />
            <Route
              path="/notification/:user_id"
              element={<NotificationPage />}
            />
            <Route path="/user/:username" element={<UserPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
