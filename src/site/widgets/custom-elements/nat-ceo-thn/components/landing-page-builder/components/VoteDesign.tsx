import React, {useState} from 'react';
import styled from 'styled-components';
import {ToggleButton} from './ToggleButton';

const VoteContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 24px;
`;

const VoteLabel = styled.span`
    font-size: 12px;
    color: #4A5568;
    display: block;
    text-align: center;
    margin-top: 4px;
`;

const ThankYouMessage = styled.div<{ $visible: boolean }>`
    text-align: center;
    color: #22C55E;
    font-weight: 600;
    height: 48px; // Fixed height to prevent layout shift
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    animation: ${props => props.$visible ? 'fadeIn' : 'fadeOut'} 0.3s ease-in forwards;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
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
            return "#FAFAFA";
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
        <div style={{display:"flex", flexDirection:'column'}}>
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
            <ThankYouMessage $visible={!!selectedVote}>
                Thank you for your feedback!
            </ThankYouMessage>
        </div>
    );
};

