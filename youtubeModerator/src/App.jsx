import { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import TestFileUploader from "./Components/FileUpload";
function App() {

  return (
  <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Login/></>}/>
          <Route path="/testupload" element={<><TestFileUploader/></>}/>

        </Routes>
      </BrowserRouter>
  
  </>);
}

export default App;
