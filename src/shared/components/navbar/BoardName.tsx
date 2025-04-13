import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const BoardName: React.FC = () => {
  const { boardId } = useParams();
  const [activeBoard, setActiveBoard] = useState(null);

  useEffect(() => {}, [boardId]);

  return <h1></h1>;
};
