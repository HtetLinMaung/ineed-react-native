import HomeScreen from "./screens/HomeScreen";
import CreateNeedScreen from "./screens/CreateNeedScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

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
  {
    name: "Signup",
    component: SignUpScreen,
    options: { headerShown: false },
  },
];
