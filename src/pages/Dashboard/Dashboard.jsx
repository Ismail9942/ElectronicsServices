import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="mt-6">
      <Outlet />
    </div>
  );
};

export default Dashboard;
