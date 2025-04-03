import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './App';
const PairProgrammingWrapper = ({ displayName }) => {
    return (React.createElement(DndProvider, { backend: HTML5Backend },
        React.createElement(App, null)));
};
export default PairProgrammingWrapper;
