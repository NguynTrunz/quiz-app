import LayoutDefault from "../Layout/LayoutDefault";
import Home from "../Pages/Home";
import Answers from "../Pages/Answers";
import Topic from "../Pages/Topic"
import Login from "../Pages/Login"
import Logout from "../Pages/Logout"
import Quiz from "../Pages/Quiz"
import Result from "../Pages/Result"
import Register from "../Pages/Register"
import PrivateRoute from "../components/PrivateRoute";

export const Routes = [
  {
    path: "/",
    element: <LayoutDefault/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        element: <PrivateRoute />,
        children:[
          {
            path: "topic",
            element: <Topic />
          },
          {
            path: "answers",
            element: <Answers />
          },
          {
            path: "quiz/:id",
            element: <Quiz />
          },
          {
            path: "result/:id",
            element: <Result />
          },
        ]
      },
    ]
  }
];