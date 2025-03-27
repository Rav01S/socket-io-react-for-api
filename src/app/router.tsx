import {createBrowserRouter} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.tsx";
import GuestLayout from "./layouts/GuestLayout.tsx";
import LoginPage from "../pages/(guest)/login";
import RegisterPage from "../pages/(guest)/register";
import Posts from "../pages/(authed)/posts";
import AddPostPage from "../pages/(authed)/posts/add";
import LogoutPage from "../pages/(authed)/logout";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout/>,
    children: [
      {
        path: '/posts',
        element: <Posts/>
      },
      {
        path: '/posts/add',
        element: <AddPostPage/>
      },
      {
        path: '/logout',
        element: <LogoutPage/>
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <LoginPage/>
      },
      {
        path: '/register',
        element: <RegisterPage/>
      }
    ]
  }
])