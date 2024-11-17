import { atom } from "recoil";

const userState = atom({
  key: "UserState",
  default: {
    isLoggedIn:false,
    organizerRequestStatus: "",
  _id: "",
  name: "",
  email: "",
  password: "",
  desc:"",
  profileImg:"",
  role: "",
  editorIds: [],
  assignedTasks: [],
  pendingEditors: [],
  organizer:''
  },
});

export default userState;
