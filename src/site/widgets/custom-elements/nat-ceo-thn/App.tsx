import React from "react";
import {Theme} from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { LandingPageBuilder } from "./components/landing-page-builder/LandingPageBuilder";

export const App: React.FC = () => {
    return (
        <Theme style={{width:"100%", height:"100%"}}>
            <LandingPageBuilder />
        </Theme>
    );
}
