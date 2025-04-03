import React, { FC } from "react";

// Polyfill useInsertionEffect so that framer-motion works correctly
if (!React.useInsertionEffect) {
  React.useInsertionEffect = React.useLayoutEffect;
}

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
