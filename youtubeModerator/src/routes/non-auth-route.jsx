import { lazy } from "react";
import Header from "../Components/Header";
// import FAQ from "../pages/FAQ";
const ContactUs = lazy(()=> import ("../pages/ContactUs"));
// import ContactUs from "../pages/ContactUs";
const Services = lazy(()=> import('../pages/Services'));
const Signup = lazy(() => import("../pages/SignUp"));
const FAQ = lazy(() => import("../pages/FAQ"));
const routes = [
  { name: "Register", path: "/signUp", element: <><Header isScrolled={60}/><Signup /> </>},
  {name:'ContactUsNonAuth',path:'/contactUsNonAuth',element:<><Header isScrolled={60}/><ContactUs/></>},
  {name:'ServicesNonAuth',path:'/servicesNonAuth',element:<><Header isScrolled={60}/><Services/></>},
  {name:'FAQNonAuth',path:'/FAQNonAuth',element:<><Header isScrolled={60}/><FAQ/></>}

];

export default routes;
