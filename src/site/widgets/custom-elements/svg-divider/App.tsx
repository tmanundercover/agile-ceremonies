import React, {useState} from 'react';
import {Settings} from '@wix/wix-ui-icons-common';
import {ActionButton, AppContainer, MainLayout, Modal, ModalContent, ModalToggle, SidePanel} from './styledComponents';
import SvgProcessor from './components/SvgProcessor';
import ThumbnailGrid from './components/ThumbnailGrid';
import SelectedThumbnails from './components/SelectedThumbnails';
import LayeredPreview from './components/LayeredPreview';
import {useProcessSvg} from './hooks/useProcessSvg';

const App: React.FC = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        svgContent,
        thumbnails,
        selectedThumbnails,
        componentCount,
        loading,
        error,
        handleFileSelect,
        handleThumbnailClick,
        parentSvgProps,
        originalSvgShell,
        originalContainer,
        processedResult,
        processLayeredView,
        processOriginalSvg
    } = useProcessSvg();

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <AppContainer className={isDarkTheme ? 'dark' : ''}>
            <SidePanel>
                <ActionButton onClick={() => setIsDarkTheme(!isDarkTheme)}>
                    <Settings/>
                </ActionButton>
                <ThumbnailGrid
                    thumbnails={thumbnails}
                    onThumbnailClick={handleThumbnailClick}
                    parentSvgProps={parentSvgProps}
                />
            </SidePanel>

            <MainLayout>
                <SvgProcessor
                    onFileSelect={handleFileSelect}
                    loading={loading}
                    error={error}
                />

                {svgContent && (
                    <LayeredPreview
                        originalSvgShell={originalSvgShell}
                        selectedThumbnails={selectedThumbnails}
                        parentSvgProps={parentSvgProps}
                        svgContent={svgContent}
                        componentCount={componentCount}
                        originalContainer={originalContainer}
                    />
                )}
            </MainLayout>

            <Modal className={isModalOpen ? 'open' : ''}>
                <ModalContent>
                    <SelectedThumbnails
                        thumbnails={selectedThumbnails}
                        parentSvgProps={parentSvgProps}
                        processedResult={processedResult}
                        onProcessLayered={processLayeredView}
                        onProcessOriginal={processOriginalSvg}
                    />
                </ModalContent>
            </Modal>

            
            <ModalToggle 
                onClick={toggleModal}
                className={isModalOpen ? 'open' : ''}
            >
                Selected Components ({selectedThumbnails.length})
            </ModalToggle>
        </AppContainer>
    );
};

export default App;

