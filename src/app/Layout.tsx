import { Sidebar } from "../shared/components/Sidebar";
import { Navbar } from "../shared/components/navbar/Navbar";
import { Modal } from "../shared/components/Modal";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-dvh">
      <Navbar />
      <div className="h-full flex overflow-hidden">
        <Sidebar />
        <main className="flex-grow border-t border-lines-light overflow-hidden">
          <Outlet />
        </main>
      </div>
      <Modal />
    </div>
  );
};
