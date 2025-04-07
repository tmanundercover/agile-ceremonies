import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Fragment, ShadowDocument, FragmentType } from '../types';
import {extractSvgContent, processFragment} from '../utils';

export const useShadowDocument = (initialValue: string) => {
    const [shadowDoc, setShadowDoc] = useState<ShadowDocument>({
        fragments: [
            {
                id: uuidv4(),
                type: 'TEXT',
                content: initialValue,
                processed: initialValue,
            }
        ],
        markdown: initialValue
    });

    const handleAddFragment = useCallback(async (fragment: Omit<Fragment, 'id' | 'processed'>) => {
        if (fragment.type === 'SVG') {
            const { svg, remainingText } = extractSvgContent(fragment.content);

            // Create SVG fragment
            const svgFragment: Fragment = {
                id: uuidv4(),
                type: 'SVG',
                content: svg || fragment.content,
                processed: ''
            };
            svgFragment.processed = await processFragment(svgFragment);

            // Create text fragment if there's remaining text
            const fragments: Fragment[] = [svgFragment];
            if (remainingText) {
                const textFragment: Fragment = {
                    id: uuidv4(),
                    type: 'TEXT',
                    content: remainingText,
                    processed: remainingText
                };
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
            const newFragment: Fragment = {
                ...fragment,
                id: uuidv4(),
                processed: fragment.content // Initialize with content for TEXT type
            };

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

    return {
        shadowDoc,
        handleAddFragment,
        handleFragmentEdit,
        handleFragmentUpdate,
        removeFragment,
        updateMarkdown
    };
};

