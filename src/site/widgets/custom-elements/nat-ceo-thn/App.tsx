import React from "react";
import {Theme} from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import {StickerBuilder} from "./components/sticker-builder/StickerBuilder";

export const App: React.FC = () => {
    return (
        <Theme>
            <StickerBuilder />
        </Theme>
    );
}
