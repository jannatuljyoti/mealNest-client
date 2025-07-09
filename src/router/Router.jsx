import { createBrowserRouter} from "react-router";
import Home from "../pages/Home/Home/Home";
import RootLayout from "../layouts/RootLayout";
import JoinUs from "../layouts/JoinUs";
import Login from "../pages/JoinUs/Login";
import Register from "../pages/JoinUs/Register";

export const router = createBrowserRouter([
  {
    path: "/",
   Component:RootLayout,
   children:[
    {
        index:true,
        Component:Home

    }
   ]
  },
  {
    path:'/',
    Component:JoinUs,
    children: [
      {
        path:'login',
        Component:Login
      },
      {
        path: 'register',
        Component:Register
      }
    ]

  }
]);
