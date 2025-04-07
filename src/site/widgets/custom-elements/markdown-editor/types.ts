export type FragmentType = 'TEXT' | 'SVG' | 'CODE' | 'LINK' | 'HEADER';

export interface Fragment {
    id: string;
    type: FragmentType;
    content: string;
    processed: string;
    isEditing?: boolean;
    filename?: string;
}

export interface ShadowDocument {
    fragments: Fragment[];
    markdown: string;
}

