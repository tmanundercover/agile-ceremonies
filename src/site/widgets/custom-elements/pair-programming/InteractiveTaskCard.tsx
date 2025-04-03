import { motion } from "framer-motion";
import styled from "styled-components";

export const Card = styled(motion.div)`
  padding: 15px;
  margin: 10px 0;
  background: #2d2d2d; // theme.surface
  border: 1px solid #00ff41; // theme.border
  border-radius: 8px;
  cursor: pointer;
`;
