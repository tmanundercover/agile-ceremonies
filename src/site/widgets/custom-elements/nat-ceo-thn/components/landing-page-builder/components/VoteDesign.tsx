import React, {useState} from 'react';
import {ToggleButton} from './ToggleButton';
import {
    VoteContainerStyled,
    VoteLabelStyled,
    VoteWrapperStyled,
    ThankYouMessageStyled
} from '../landing-page-builder-styled-components';

export type VoteType = 'up' | 'down' | 'meh' | null;

const getColorForVariant = (variant: VoteType): string => {
    switch (variant) {
        case 'up':
            return '#22C55E';
        case 'down':
            return '#EF4444';
        case 'meh':
            return '#94A3B8';
        default:
            return "#FAFAFA";
    }
};

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
        <VoteWrapperStyled>
            <VoteContainerStyled data-testid={dataTestId}>
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
                    <VoteLabelStyled>Love it!</VoteLabelStyled>
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
                    <VoteLabelStyled>Meh...</VoteLabelStyled>
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
                    <VoteLabelStyled>Nope</VoteLabelStyled>
                </div>
            </VoteContainerStyled>
            <ThankYouMessageStyled $visible={!!selectedVote}>
                Thank you for your feedback!
            </ThankYouMessageStyled>
        </VoteWrapperStyled>
    );
};

