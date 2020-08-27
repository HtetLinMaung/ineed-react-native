import HomeScreen from "./screens/HomeScreen";
import CreateNeedScreen from "./screens/CreateNeedScreen";
import LoginScreen from "./screens/LoginScreen";

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
    name: "Login",
    component: LoginScreen,
    options: { headerShown: false },
  },
];
