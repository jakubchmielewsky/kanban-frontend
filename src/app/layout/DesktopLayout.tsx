import { Sidebar } from "../../shared/components/sidebar/Sidebar";
import { Navbar } from "../../shared/components/navbar/Navbar";
import { Modal } from "../../shared/components/Modal";

export const DesktopLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="h-full flex overflow-hidden">
        <Sidebar />
        <main className="flex-grow border-t border-lines-light overflow-hidden">
          {children}
        </main>
      </div>
      <Modal />
    </div>
  );
};
