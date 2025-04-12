import { Navbar } from "../../shared/components/navbar/Navbar";

export const DesktopLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="h-full flex">
        {/* Sidebar */}
        <main className="flex-grow overflow-auto">{children}</main>
      </div>
    </div>
  );
};
