import React, {useState} from 'react';
import {Settings} from '@wix/wix-ui-icons-common';
import {ActionButton, AppContainer, MainLayout, Modal, ModalContent, ModalToggle, SidePanel} from '../styledComponents';
import SvgProcessor from '../components/SvgProcessor';
import ThumbnailGrid from '../components/ThumbnailGrid';
import SelectedThumbnails from '../components/SelectedThumbnails';
import LayeredPreview from '../components/LayeredPreview';
import {useProcessSvg} from '../hooks/useProcessSvg';

const SvgDivider: React.FC = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [croppedComponents, setCroppedComponents] = useState<Array<{ id: string; svg: string }>>([]);

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
        processOriginalSvg,
        processCroppedSvg,
        handleTextInput,
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
                    selectedThumbnails={selectedThumbnails}
                />
            </SidePanel>

            <MainLayout>
                <SvgProcessor
                    onFileSelect={handleFileSelect}
                    onTextInput={handleTextInput}
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
                        croppedComponents={croppedComponents}
                        onCropProcess={(cropArea) => {
                            // Handle cropped components here
                            // This is where you would process the SVG and update croppedComponents
                        }}
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
                        onProcessCropped={processCroppedSvg}
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

export default SvgDivider;

