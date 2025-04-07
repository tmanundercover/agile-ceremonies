import React from 'react';
import {ThemeProvider} from 'styled-components';
import {FragmentInput} from './FragmentInput';
import {FragmentEditor} from './FragmentEditor';
import {Preview} from './Preview';
import {theme} from './theme';
import {useShadowDocument} from './hooks/useShadowDocument';
import {
    AppContainer,
    EditorContainer,
    FragmentItem,
    FragmentManagement,
    FragmentPreview,
    FragmentsList,
    FragmentType,
    RemoveFragmentButton,
    SectionTitle,
    TopSection
} from './styles';

interface AppProps {
    initialValue?: string;
}

const App: React.FC<AppProps> = ({initialValue = '# Hello, Markdown!'}) => {
    const {
        shadowDoc,
        handleAddFragment,
        handleFragmentEdit,
        handleFragmentUpdate,
        removeFragment,
        updateMarkdown
    } = useShadowDocument(initialValue);

    return (
        <ThemeProvider theme={theme}>
            <AppContainer>
                <EditorContainer>
                    <TopSection>
                        <FragmentManagement>
                            <SectionTitle>Add Fragment</SectionTitle>
                            <FragmentInput onAddFragment={handleAddFragment}/>
                            <FragmentsList>
                                {shadowDoc.fragments.map(fragment => (
                                    <FragmentItem key={fragment.id}>
                                        {fragment.isEditing ? (
                                            <FragmentEditor
                                                fragment={fragment}
                                                onSave={handleFragmentUpdate}
                                                onCancel={() => handleFragmentUpdate(fragment.id, {
                                                    type: fragment.type,
                                                    content: fragment.content
                                                })}
                                            />
                                        ) : (
                                            <>
                                                <FragmentType>{fragment.type}</FragmentType>
                                                <FragmentPreview onClick={() => handleFragmentEdit(fragment.id)}>
                                                    {fragment.content.slice(0, 50)}...
                                                </FragmentPreview>
                                                <RemoveFragmentButton onClick={() => removeFragment(fragment.id)}>
                                                    ✕
                                                </RemoveFragmentButton>
                                            </>
                                        )}
                                    </FragmentItem>
                                ))}
                            </FragmentsList>
                        </FragmentManagement>
                        <Preview 
                            markdown={shadowDoc.markdown} 
                            onUpdateMarkdown={updateMarkdown}
                        />
                    </TopSection>
                </EditorContainer>
            </AppContainer>
        </ThemeProvider>
    );
};

export default App;

