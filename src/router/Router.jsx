// src/routes/router.js
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../authentication/Register";
import SignIn from "../authentication/SignIn";
import Services from "../pages/Dashboard/Services";

// ✅ Dashboard Pages
import AddService from "../pages/Dashboard/AddService";
import SingleService from "../pages/Dashboard/SingleService";
import BookedService from "../pages/Dashboard/BookedService";
import ServiceTodo from "../pages/Dashboard/ServiceToDo";
import ManageServices from "../pages/Dashboard/ManageServices";
import PrivateRoute from "../Private/PrivateRoute";
import ManageUpdated from "../pages/Dashboard/ManageUpdated";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/addService",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "/services/:id",
        element: (
          <PrivateRoute>
            <SingleService />
          </PrivateRoute>
        ),
      },
      {
        path: "/manageService",
        element: (
          <PrivateRoute>
            <ManageServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/bookedService",
        element: (
          <PrivateRoute>
            <BookedService />
          </PrivateRoute>
        ),
      },
      {
        path: "/manageUpdated/:id",
        element: (
          <PrivateRoute>
            <ManageUpdated />
          </PrivateRoute>
        ),
      },
      {
        path: "/serviceToDo",
        element: (
          <PrivateRoute>
            <ServiceTodo />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
