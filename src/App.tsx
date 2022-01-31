import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import ProjectPage from "./pages/Project/ProjectPage";
import Project from "./pages/SelectedProject/SelectedProjectPage";

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/project/:project_id" element={<Project />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
