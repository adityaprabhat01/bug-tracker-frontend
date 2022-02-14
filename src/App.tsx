import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import ProjectPage from "./pages/Project/ProjectPage";
import Project from "./pages/SelectedProject/SelectedProjectPage";
import BugPage from "./pages/Bug/BugPage";
import { useEffect } from "react";
import { socket } from "./socket";

function App() {

  useEffect(() => {
    socket.on("added-to-bug-success", payload => {
      console.log(payload)
    })

    socket.on("comment-on-bug-success", payload => {
      console.log(payload)
    })
  }, [])

  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/project/:project_id" element={<Project />} />
            <Route path="/bug/:bug_id" element={<BugPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
