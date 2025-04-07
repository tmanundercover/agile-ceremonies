import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Fragment, ShadowDocument } from '../types';
import { processFragment } from '../utils';

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
        const newFragment = {
            ...fragment,
            id: uuidv4(),
            processed: ''
        };
        
        newFragment.processed = await processFragment(newFragment);

        setShadowDoc(prev => {
            const newFragments = [...prev.fragments, newFragment];
            return {
                fragments: newFragments,
                markdown: newFragments.map(f => f.processed).join('\n\n')
            };
        });
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

    return {
        shadowDoc,
        handleAddFragment,
        handleFragmentEdit,
        handleFragmentUpdate,
        removeFragment
    };
};
