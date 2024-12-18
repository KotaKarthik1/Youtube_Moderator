import { lazy } from "react";
import OrganizerDashboard from "../pages/OrganizerDashboard";
import OrgProfile from "../pages/OrgProfile";
import HeaderOrg from "../Components/HeaderOrg";
import Services from "../pages/Services";
import ContactUs from "../pages/ContactUs";
import FAQ from "../pages/FAQ";
import OrgTasks from "../pages/OrgTasks";
import OrgRequests from "../pages/OrgRequests";
import CreateTaskByOrg from "../pages/CreateTaskByOrg";
import OrgTaskView from "../pages/OrgTaskView";

const navigationOrgRoutes = [
    {name:"OrgContact",path:"/auth/contact/org",element:<><HeaderOrg isScrolled={60}/><ContactUs/></>},
    {name:"OrgFAQ",path:"/auth/faq/org",element:<><HeaderOrg isScrolled={60}/><FAQ/></>},
    {name:"OrgDashboard",path:"/OrgDashboard",element:<><HeaderOrg isScrolled={60}/><OrganizerDashboard/></>},
    {name:"OrgProfile",path:"/auth/profile/org",element:<><HeaderOrg isScrolled={60}/><OrgProfile/></>},
    {name:"OrgFeatures",path:"/auth/features/org",element:<><HeaderOrg isScrolled={60}/><Services/></>},
    {name:"OrgTasks",path:"/AllTasks",element:<><HeaderOrg isScrolled={60}/><OrgTasks/></>},
    {name:"OrgRequests",path:"/OrgRequests",element:<><HeaderOrg isScrolled={60}/><OrgRequests/></>},
    {name:"OrgCreateTask",path:"/createTask",element:<><HeaderOrg isScrolled={60}/><CreateTaskByOrg/></>},    
    {name:"OrgTaskView",path:'/OrgTaskView',element:<><HeaderOrg isScrolled={60}/><OrgTaskView/></>}
];

export default navigationOrgRoutes;