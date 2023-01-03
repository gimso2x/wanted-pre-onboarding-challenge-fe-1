import { createBrowserRouter } from "react-router-dom";
import Auth from "./components/auth";
import Todo from "./components/todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todo />,
    children: [
      {
        path: "/:id",
        element: <Todo />,
      },
    ],
  },
  {
    path: "/auth/",
    element: <Auth />,
  },
]);
export default router;
