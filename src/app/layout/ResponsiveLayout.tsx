import { Outlet } from "react-router-dom";
import { useIsMobile } from "../../shared/hooks/useIsMobile";
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

export const ResponsiveLayout = () => {
  const isMobile = useIsMobile();
  const Layout = isMobile ? MobileLayout : DesktopLayout;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
