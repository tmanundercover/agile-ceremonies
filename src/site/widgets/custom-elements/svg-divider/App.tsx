import React, {useState} from 'react';
import {Settings} from '@wix/wix-ui-icons-common';
import {ActionButton, AppContainer, MainLayout, SidePanel} from './styledComponents';
import SvgProcessor from './components/SvgProcessor';
import SvgPreview from './components/SvgPreview';
import ThumbnailGrid from './components/ThumbnailGrid';
import SelectedThumbnails from './components/SelectedThumbnails';
import {useProcessSvg} from './hooks/useProcessSvg';

const App: React.FC = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const {
        svgContent,
        thumbnails,
        selectedThumbnails,
        componentCount,
        loading,
        error,
        handleFileSelect,
        handleThumbnailClick,
        handleThumbnailRemove,
        handleSubThumbnailClick
    } = useProcessSvg();

    return (
        <AppContainer className={isDarkTheme ? 'dark' : ''}>
            <SidePanel>
                <ActionButton onClick={() => setIsDarkTheme(!isDarkTheme)}>
                    <Settings/>
                </ActionButton>
                <ThumbnailGrid
                    thumbnails={thumbnails}
                    onThumbnailClick={handleThumbnailClick}
                />
            </SidePanel>

            <MainLayout>
                <SvgProcessor
                    onFileSelect={handleFileSelect}
                    loading={loading}
                    error={error}
                />

                {svgContent && (
                    <SvgPreview
                        svgContent={svgContent}
                        componentCount={componentCount}
                    />
                )}
            </MainLayout>

            <SelectedThumbnails
                thumbnails={selectedThumbnails}
                onRemove={handleThumbnailRemove}
            />
        </AppContainer>
    );
};

export default App;
