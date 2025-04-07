import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Fragment, ShadowDocument, FragmentType } from '../types';
import { extractSvgContent, processFragment, parseMarkdownToFragments } from '../utils';

export const useShadowDocument = (initialValue: string) => {
    const [shadowDoc, setShadowDoc] = useState<ShadowDocument>({
        fragments: [],
        markdown: initialValue
    });

    // Initialize fragments from initial value
    useEffect(() => {
        const initializeFragments = async () => {
            const fragments = parseMarkdownToFragments(initialValue);
            const processedFragments = await Promise.all(
                fragments.map(async (f) => ({
                    ...f,
                    id: uuidv4(),
                    processed: await processFragment({
                        ...f,
                        id: uuidv4(),
                        processed: ''
                    })
                }))
            );

            setShadowDoc({
                fragments: processedFragments,
                markdown: processedFragments.map(f => f.processed).join('\n\n')
            });
        };

        initializeFragments();
    }, [initialValue]);

    const handleAddFragment = useCallback(async (fragment: Omit<Fragment, 'id' | 'processed'>) => {
        const createNewFragment = async (type: FragmentType, content: string): Promise<Fragment> => {
            const newFragment: Fragment = {
                id: uuidv4(),
                type,
                content,
                processed: content
            };
            newFragment.processed = await processFragment(newFragment);
            return newFragment;
        };

        if (fragment.type === 'SVG') {
            const { svg, remainingText } = extractSvgContent(fragment.content);
            const fragments: Fragment[] = [];

            if (svg) {
                const svgFragment = await createNewFragment('SVG', svg);
                fragments.push(svgFragment);
            }

            if (remainingText) {
                const textFragment = await createNewFragment('TEXT', remainingText);
                fragments.push(textFragment);
            }

            setShadowDoc(prev => {
                const newFragments = [...prev.fragments, ...fragments];
                return {
                    fragments: newFragments,
                    markdown: newFragments.map(f => f.processed).join('\n\n')
                };
            });
        } else {
            const newFragment = await createNewFragment(fragment.type, fragment.content);
            setShadowDoc(prev => {
                const newFragments = [...prev.fragments, newFragment];
                return {
                    fragments: newFragments,
                    markdown: newFragments.map(f => f.processed).join('\n\n')
                };
            });
        }
    }, []);

    const handleFragmentEdit = useCallback((id: string) => {
        setShadowDoc(prev => ({
            ...prev,
            fragments: prev.fragments.map(f => 
                f.id === id ? { ...f, isEditing: true } : f
            )
        }));
    }, []);

    const handleFragmentUpdate = useCallback(async (
        id: string, 
        updates: Partial<Pick<Fragment, 'type' | 'content'>>
    ) => {
        const fragment = shadowDoc.fragments.find(f => f.id === id);
        if (!fragment) return;

        const updatedFragment = {
            ...fragment,
            ...updates,
            isEditing: false
        };
        
        updatedFragment.processed = await processFragment(updatedFragment);

        setShadowDoc(prev => {
            const newFragments = prev.fragments.map(f => 
                f.id === id ? updatedFragment : f
            );
            return {
                fragments: newFragments,
                markdown: newFragments.map(f => f.processed).join('\n\n')
            };
        });
    }, [shadowDoc.fragments]);

    const removeFragment = useCallback((id: string) => {
        setShadowDoc(prev => {
            const newFragments = prev.fragments.filter(f => f.id !== id);
            return {
                fragments: newFragments,
                markdown: newFragments.map(f => f.processed).join('\n\n')
            };
        });
    }, []);

    const updateMarkdown = useCallback((newMarkdown: string) => {
        setShadowDoc(prev => ({
            ...prev,
            markdown: newMarkdown
        }));
    }, []);

    const parseMarkdown = useCallback(async (markdown: string) => {
        const fragments = parseMarkdownToFragments(markdown);
        const processedFragments = await Promise.all(
            fragments.map(async (f) => ({
                ...f,
                id: uuidv4(),
                processed: await processFragment({
                    ...f,
                    id: uuidv4(),
                    processed: ''
                })
            }))
        );

        setShadowDoc({
            fragments: processedFragments,
            markdown: processedFragments.map(f => f.processed).join('\n\n')
        });
    }, []);

    return {
        shadowDoc,
        handleAddFragment,
        handleFragmentEdit,
        handleFragmentUpdate,
        removeFragment,
        updateMarkdown,
        parseMarkdown
    };
};

