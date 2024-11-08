import { lazy } from "react";

const Signup = lazy(() => import("../pages/SignUp"));
const routes = [
  { name: "Register", path: "/signUp", element: <Signup /> },
  
];

export default routes;
