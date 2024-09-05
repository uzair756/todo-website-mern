import { FC } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./navbar/Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout: FC = () => {
  return (
    <div className="w-full flex flex-col flex-grow">
      <Navbar />
      <div className="flex w-full flex-grow">
        <Sidebar />
        <main className="flex-1 min-h-full pb-20 md:pb-5 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
