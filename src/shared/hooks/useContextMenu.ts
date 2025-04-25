import { useState } from "react";

export const useContextMenu = () => {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const openContextMenu = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setCoords({ x: rect.left, y: rect.bottom + 6 });
    setIsContextMenuVisible(true);
  };

  const closeContextMenu = () => {
    setIsContextMenuVisible(false);
  };

  return { isContextMenuVisible, coords, openContextMenu, closeContextMenu };
};
