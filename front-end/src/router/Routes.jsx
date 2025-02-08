import { createBrowserRouter, useParams } from "react-router-dom";
import Home from "../pages/Home";
import BeachPage from "../pages/BeachPage";
import ErrorPages from "./ErrorPages";
import SingleBeach from "../pages/SingleBeach";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import AdminPage from "../pages/AdminPage";

export const router = createBrowserRouter([
  // HomePage
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPages />,
  },

  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <ErrorPages />,
  },

  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPages />,
  },
  // BeachPage
  {
    path: "/beach",
    element: <BeachPage />,
    errorElement: <ErrorPages />,
  },

  // SingleBeach
  {
    path: "beach/:id",
    element: <SingleBeach />,
    errorElement: <ErrorPages />,
  },

  // AboutUs
  {
    path: "/about",
    element: <AboutUs />,
    errorElement: <ErrorPages />,
  },

  //Contact
  {
    path: "contact",
    element: <Contact />,
    errorElement: <ErrorPages />,
  },
]);
