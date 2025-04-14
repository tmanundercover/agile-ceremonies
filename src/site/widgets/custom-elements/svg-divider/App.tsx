import React, {useState} from 'react';
import {Settings} from '@wix/wix-ui-icons-common';
import {ActionButton, AppContainer, MainLayout, Modal, ModalContent, ModalToggle, SidePanel} from './styledComponents';
import SvgProcessor from './components/SvgProcessor';
import ThumbnailGrid from './components/ThumbnailGrid';
import SelectedThumbnails from './components/SelectedThumbnails';
import LayeredPreview from './components/LayeredPreview';
import {useProcessSvg} from './hooks/useProcessSvg';
import SvgDivider from "./components/SvgDivider";

const App: React.FC = () => {
    return (
        <SvgDivider />
    );
};

export default App;

