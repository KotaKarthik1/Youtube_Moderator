import { lazy } from "react";
import EditorDashboard from "../pages/EditorDashboard";
import EditorProfile from "../pages/EditorProfile";
import EditorTask from "../pages/EditorTask";
import AllOrganizers from "../pages/AllOrganizers";
import FAQ from "../pages/FAQ";
import HeaderEditor from "../Components/HeaderEditor";
import ContactUs from "../pages/ContactUs";
import Services from "../pages/Services";

const navigationRoutes = [
    {name:"EditorDashboard",path:"/EditorDashboard",element:<EditorDashboard/>},
    {name:"EditorProfile",path:"/auth/profile/editor",element:<><HeaderEditor isScrolled={60}/><EditorProfile/></>},
    {name:"EditorServices",path:"/auth/features/editor",element:<><HeaderEditor isScrolled={60}/><Services/></>},
    {name:"EditorContact",path:"/auth/contact/editor",element:<><HeaderEditor isScrolled={60}/><ContactUs/></>},
    {name:"EditorFAQ",path:"/auth/faq/editor",element:<><HeaderEditor isScrolled={60}/><FAQ/></>},
    {name:"EditorTask",path:"/EditorTaskView",element:<><HeaderEditor isScrolled={60}/><EditorTask/></>},
    {name:"AllOrganizers",path:"/AllOrgnizers",element:<><HeaderEditor isScrolled={60}/><AllOrganizers/></>},
];

export default navigationRoutes;

