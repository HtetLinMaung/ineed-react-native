import HomeScreen from "./screens/HomeScreen";
import CreateNeedScreen from "./screens/CreateNeedScreen";

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
];
