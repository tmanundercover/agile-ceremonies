import React, { FC } from "react";

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './App';

interface WrapperProps {
  displayName?: string;
}

const PairProgrammingWrapper: FC<WrapperProps> = ({ displayName }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  );
};

export default PairProgrammingWrapper;
