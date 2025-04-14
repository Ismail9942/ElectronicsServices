// src/hooks/useRouteTitle.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useRouteTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let title = "Electronics Services";

    if (path === "/") title = "Home | Electronics Services";
    else if (path === "/register") title = "Register | Electronics Services";
    else if (path === "/login") title = "Ligin NOw! | Electronics Services";
    else if (path === "/services") title = "Services | Electronics Services";
    else if (path === "/addService")
      title = "Added service | Electronics Services";
    else if (path === "/services/:id")
      title = "Service Details | Electronics Services";
    else if (path === "/manageService")
      title = "My Service Added | Electronics Services";
    else if (path === "/bookedService")
      title = "My Book Now Service | Electronics Services";
    else if (path === "/manageUpdated/:id")
      title = "Update Service | Electronics Services";
    else if (path === "/serviceToDo")
      title = "Service To Do | Electronics Services";
    else title = "Electronics Services";

    document.title = title;
  }, [location]);
};

export default useRouteTitle;
