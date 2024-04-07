import React from "react";
import { Outlet } from "react-router-dom";

const TeacherMain = () => {
  return (
    <div className="flex flex-row items-center justify-center min-h-screen">
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherMain;
