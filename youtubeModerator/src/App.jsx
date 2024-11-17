import { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestFileUploader from "./Components/FileUpload";
import SuspenseLayout from "./Components/SuspenseLayout/indes";
import ProtectedRouter from "./middleware/index";
import ProtectedOrgRouter from "./middleware/OrgIndex";
import navigationRoutes from "./routes/auth-route";
import navigationOrgRoutes from "./routes/Org-auth-route";
import nonAuthRoute from "./routes/non-auth-route";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import VideoTest from "./pages/VideoTest";
function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer autoClose={3000} />
        <Routes>
          <Route element={<SuspenseLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/videocheck" element={<VideoTest/>}/>

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
            <Route element={<ProtectedOrgRouter />}>
              <Route>
                {navigationOrgRoutes.map((route, index) => (
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
            {/* <Route path="/testupload" element={<><TestFileUploader/></>}/> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
