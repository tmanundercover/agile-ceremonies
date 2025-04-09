import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import React from "react";
const RadixThemeWrapper = ({ children }) => {
    return (React.createElement(Theme, null, children));
};
export default RadixThemeWrapper;
