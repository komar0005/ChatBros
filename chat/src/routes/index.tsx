import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.tsx";
import Login from "../security/Login.tsx";
import Signup from "../security/Signup.tsx";
import { AuthProvider } from "../context/AuthContext.tsx";
import Home from "../pages/Home.tsx";
import RootLayout from "../layouts/RootLayout.tsx";
import NewChannel from "../pages/channel/NewChannel.tsx";

export const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          {index: true, element: <Home />},
          {
            path: '/channel', children: [
              {path: 'new', element: <NewChannel />}
            ]
          }
        ]
      },
      {
        element: <AuthLayout />,
        children: [
          {path: 'login', element: <Login />},
          {path: 'signup', element: <Signup />}
        ]
      },

    ]
  }
])

function ContextWrapper() {
  return <AuthProvider>
    <Outlet />
  </AuthProvider>
}