import React from "react";
import MainLayout from "./MainLayout";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <MainLayout />
        </DndProvider>
    );
};

export default App;
