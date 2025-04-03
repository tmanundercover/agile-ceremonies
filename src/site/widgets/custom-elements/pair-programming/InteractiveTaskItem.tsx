import React from "react";
import { motion } from "framer-motion";
import { Card } from "./InteractiveTaskCard";

interface InteractiveTaskItemProps {
  title: string;
  detail: string;
  onClick?: () => void;
}

const InteractiveTaskItem: React.FC<InteractiveTaskItemProps> = ({ title, detail, onClick }) => {
  return (
    <Card
      whileHover={{ translateX: 5, boxShadow: "0 0 15px rgba(0, 255, 65, 0.1)" }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <h4 style={{ margin: "0 0 5px 0", color: "#00ff41" }}>{title}</h4>
      <p style={{ fontSize: "12px", color: "#0ff" }}>{detail}</p>
    </Card>
  );
};

export default InteractiveTaskItem;

