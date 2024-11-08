import { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import TestFileUploader from "./Components/FileUpload";
import SuspenseLayout from "./Components/SuspenseLayout/indes";
import ProtectedRouter from "./middleware/index";
import navigationRoutes from "./routes/auth-route";
import nonAuthRoute from "./routes/non-auth-route";
import Home from "./pages/Home";
function App() {

  return (
  <>
      <BrowserRouter>
        <Routes>
          <Route element={<SuspenseLayout/>}>
            <Route path='/' element={<Home/>}/>

            <Route element={<ProtectedRouter />}>
            <Route>
              {navigationRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                  {route.children &&
                    route.children.map((child, childIndex) => (
                      <Route
                        key={childIndex}
                        path={child.path}
                        element={child.element}
                      />
                    ))}
                </Route>
              ))}
            </Route>
          
          </Route>
          {/* <Route path="/" element={<><Login/></>}/> */}
          {nonAuthRoute.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
          <Route path="/testupload" element={<><TestFileUploader/></>}/>
          </Route>

        </Routes>
      </BrowserRouter>
  
  </>);
}

export default App;
