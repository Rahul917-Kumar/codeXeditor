import React from 'react'
import Editor from './Components/editorPage/Editor';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Project from './Components/ProjectCollection/Project';
import Signup from './Components/SignUp/Signup';
import SignIn from './Components/SignIn/SignIn';
import Navbar from './Components/Navbar/Navbar';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<SignIn/>} />
        <Route exact path="/auth/signup" element={<Signup/>} />
        <Route exact path='/editor/:userId/:id' element={<Editor/>} />
        <Route exact path="/projects" element={<Project/>} />
      </Routes>
    </Router>
   
  );
}

export default App;
