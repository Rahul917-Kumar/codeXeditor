import React from 'react'
import Editor from './Components/editorPage/Editor';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Project from './Components/ProjectCollection/Project';
import Signup from './Components/SignUp/Signup';
import SignIn from './Components/SignIn/SignIn';
import Navbar from './Components/Navbar/Navbar';
import DeployProject from './Components/DeployProject/DeployProjectView/DeployProject';
import DeployProjectCode from './Components/DeployProject/DeployprojectCode/DeployProjectCode';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/auth/signup" element={<Signup />} />
        <Route exact path="/editor/:id" element={<Editor />} />
        <Route exact path="/deploy/:userId/:id" element={<DeployProject />} />
        <Route
          exact
          path="/deploy/editor/:userId/:id"
          element={<DeployProjectCode />}
        />
        <Route exact path="/projects" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default App;
