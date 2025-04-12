import React, {useState} from 'react';
import styled from 'styled-components';
import { ToggleButton } from './ToggleButton';

const VoteContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1rem;
`;

const VoteLabel = styled.span`
    font-size: 0.875rem;
    color: #64748B;
    display: block;
    text-align: center;
    margin-top: 0.25rem;
`;

const getColorForVariant = (variant: VoteType): string => {
    switch (variant) {
        case 'up':
            return '#22C55E';
        case 'down':
            return '#EF4444';
        case 'meh':
            return '#94A3B8';
        default:
            return "#FAFAFA"
    }
};

export type VoteType = 'up' | 'down' | 'meh' | null;

interface VoteDesignProps {
    onVote: (vote: VoteType) => void;
    'data-testid'?: string;
    selectedVote?: VoteType;
}

export const VoteDesign: React.FC<VoteDesignProps> = ({
    onVote,
    'data-testid': dataTestId,
    selectedVote: initialVote
}) => {
    const [selectedVote, setSelectedVote] = useState<VoteType>(initialVote || null);

    const handleVote = (vote: VoteType) => {
        const newVote = selectedVote === vote ? null : vote;
        setSelectedVote(newVote);
        onVote(newVote);
    };

    return (
        <VoteContainer data-testid={dataTestId}>
            <div>
                <ToggleButton
                    isSelected={selectedVote === 'up'}
                    onClick={() => handleVote('up')}
                    disabled={!!selectedVote && selectedVote !== 'up'}
                    color={getColorForVariant('up')}
                    data-testid="vote-up"
                    title="Save as favorite"
                >
                    👍
                </ToggleButton>
                <VoteLabel>Love it!</VoteLabel>
            </div>

            <div>
                <ToggleButton
                    isSelected={selectedVote === 'meh'}
                    onClick={() => handleVote('meh')}
                    disabled={!!selectedVote && selectedVote !== 'meh'}
                    color={getColorForVariant('meh')}
                    data-testid="vote-meh"
                    title="Save with low priority"
                >
                    😐
                </ToggleButton>
                <VoteLabel>Meh...</VoteLabel>
            </div>

            <div>
                <ToggleButton
                    isSelected={selectedVote === 'down'}
                    onClick={() => handleVote('down')}
                    disabled={!!selectedVote && selectedVote !== 'down'}
                    color={getColorForVariant('down')}
                    data-testid="vote-down"
                    title="Archive for deconstruction"
                >
                    👎
                </ToggleButton>
                <VoteLabel>Nope</VoteLabel>
            </div>
        </VoteContainer>
    );
};
