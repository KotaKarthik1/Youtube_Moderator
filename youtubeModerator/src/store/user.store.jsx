import { atom } from "recoil";

const userState = atom({
  key: "UserState",
  default: {
    isLoggedIn: false,
    userType: "", 
    Id: "",
    name: "",
    profilePicture: "",
    username: "",
    email: "",
    onBoarding:false,
    isActive: false,
  },
});

export default userState;
