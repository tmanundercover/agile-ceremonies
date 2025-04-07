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
    TopSection,
    StyledTextArea,
    BottomSection,
    RawMarkdownContainer,
    RawMarkdownTitle,
    RawMarkdownContent
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
        updateMarkdown,
        parseMarkdown
    } = useShadowDocument(initialValue);

    const handleRawMarkdownInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        parseMarkdown(e.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <AppContainer>
                <EditorContainer>
                    <TopSection>
                        <FragmentManagement>
                            <SectionTitle>Add Fragment</SectionTitle>
                            <FragmentInput onAddFragment={handleAddFragment} />
                            <StyledTextArea
                                placeholder="Or paste markdown here..."
                                onChange={handleRawMarkdownInput}
                            />
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
                    <BottomSection>
                        <RawMarkdownContainer>
                            <RawMarkdownTitle>Raw Markdown</RawMarkdownTitle>
                            <RawMarkdownContent>
                                {shadowDoc.markdown}
                            </RawMarkdownContent>
                        </RawMarkdownContainer>
                    </BottomSection>
                </EditorContainer>
            </AppContainer>
        </ThemeProvider>
    );
};

export default App;

