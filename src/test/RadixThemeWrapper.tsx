import "@radix-ui/themes/styles.css";
import {Theme} from "@radix-ui/themes";
import {PropsWithChildren} from "react";
import React from "react";
const RadixThemeWrapper: React.FunctionComponent<PropsWithChildren<any>> = ({children}) => {
    return (<Theme>{children}</Theme>)
}

export default RadixThemeWrapper