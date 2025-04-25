import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDimensions } from "../hooks/useDimentions";

interface ContextMenuProps {
  x: number;
  y: number;
  children: React.ReactNode;
  close: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  children,
  close,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { width, height } = useDimensions(menuRef);

  const [position, setPosition] = useState<{ x: number; y: number }>({ x, y });

  useEffect(() => {
    const adjustPosition = () => {
      let adjustedX = x;
      let adjustedY = y;

      if (x + width > window.innerWidth) {
        adjustedX = window.innerWidth - width - 10;
      }

      if (y + height > window.innerHeight) {
        adjustedY = window.innerHeight - height - 10;
      }

      setPosition({ x: adjustedX, y: adjustedY });
    };

    if (width !== 0 && height !== 0) {
      adjustPosition();
    }
  }, [x, y, width, height]);

  return createPortal(
    <div className="inset-0 fixed top-0 left-0" onClick={() => close()}>
      <div
        ref={menuRef}
        className="fixed bg-white rounded-md shadow-lg border border-lines-light p-4 w-36"
        style={{ top: position.y, left: position.x }}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col gap-2">{children}</ul>
      </div>
    </div>,

    document.body
  );
};
