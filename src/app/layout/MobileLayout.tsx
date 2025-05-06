import { Modal } from "../../shared/components/Modal";
import { Navbar } from "../../shared/components/navbar/Navbar";

export const MobileLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col h-dvh">
      <Navbar />
      <main className="flex-grow overflow-auto">{children}</main>
      <Modal />
    </div>
  );
};
