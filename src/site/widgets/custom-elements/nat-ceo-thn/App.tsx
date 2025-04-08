import React from "react";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { ClientInfoWelcomeStep } from "./components/welcome-steps/ClientInfoWelcomeStep";

export const App: React.FC = () => {
    return (
        <Theme>
            <ClientInfoWelcomeStep />
        </Theme>
    );
}
