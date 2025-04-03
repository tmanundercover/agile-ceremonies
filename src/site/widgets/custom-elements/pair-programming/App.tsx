// Polyfill useInsertionEffect so that framer-motion functions correctly
import React from "react";
if (!React.useInsertionEffect) {
  React.useInsertionEffect = React.useLayoutEffect;
}

import MainLayout from "./MainLayout";

// The old App.tsx implementation is available in App.old.tsx for reference.
const App: React.FC = () => {
    return <MainLayout />;
};

export default App;

