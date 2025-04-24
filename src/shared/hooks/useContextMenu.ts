import { useState } from "react";

export const useContextMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const openContextMenu = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setCoords({ x: rect.left, y: rect.bottom + 6 });
    setIsVisible(true);
  };

  const closeContextMenu = () => {
    setIsVisible(false);
  };

  return { isVisible, coords, openContextMenu, closeContextMenu };
};
