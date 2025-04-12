import LogoMobile from "../../../assets/logo-mobile.svg?react";
import LogoDark from "../../../assets/logo-dark.svg?react";
import { useIsMobile } from "../../hooks/useIsMobile";
import IconAdd from "../../../assets/icon-add-task-mobile.svg?react";
import IconVerticalEllipsis from "../../../assets/icon-vertical-ellipsis.svg?react";
import { Button } from "../button/Button";

export const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <nav className="h-17 pr-2 flex items center justify-between">
      {/* Group 1 */}
      <div className="flex items-center gap-x-4">
        {!isMobile && (
          <div className="pl-4 h-full border-r border-lines-light  flex items-center w-[260px]">
            <LogoDark />
          </div>
        )}
        {isMobile && <LogoMobile />}
        <div>Dropdown mobile menu</div>
      </div>

      {/* Group 2 */}
      <div className="flex items-center gap-x-2">
        <Button size="s" iconLeft={<IconAdd />}></Button>
        <Button variant="ghost">
          <IconVerticalEllipsis />
        </Button>
      </div>
    </nav>
  );
};
