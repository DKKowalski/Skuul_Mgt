import React from "react";
// import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";

const StudentMain = () => {
  return (
    <div className="flex flex-row items-center justify-center min-h-screen">
      
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentMain;
