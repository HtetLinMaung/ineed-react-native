import HomeScreen from "./screens/HomeScreen";
import CreateNeedScreen from "./screens/CreateNeedScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import BasicInfoScreen from "./screens/BasicInfoScreen";
import EditNeedScreen from "./screens/EditNeedScreen";
import NeedDetailScreen from "./screens/NeedDetailScreen";
import EditProfileScreen from "./screens/EditProfileScreen";

export default [
  {
    name: "Home",
    component: HomeScreen,
    options: { headerShown: false },
  },
  {
    name: "CreateNeed",
    component: CreateNeedScreen,
    options: { headerShown: false },
  },
  {
    name: "EditNeed",
    component: EditNeedScreen,
    options: { headerShown: false },
  },
  {
    name: "Login",
    component: LoginScreen,
    options: { headerShown: false },
  },
  {
    name: "Signup",
    component: SignUpScreen,
    options: { headerShown: false },
  },
  {
    name: "BasicInfo",
    component: BasicInfoScreen,
    options: { headerShown: false },
  },
  {
    name: "NeedDetail",
    component: NeedDetailScreen,
    options: { headerShown: false },
  },
  {
    name: "EditProfile",
    component: EditProfileScreen,
    options: { headerShown: false },
  },
];
