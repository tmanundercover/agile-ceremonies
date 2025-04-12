import React, { useState } from 'react';
import styled from 'styled-components';

const VoteContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const VoteButton = styled.button<{ variant: 'up' | 'down' | 'meh' }>`
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  transition: transform 0.2s;
  padding: 0.5rem;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  color: ${({ variant }) => {
    switch (variant) {
      case 'up':
        return '#22C55E';
      case 'down':
        return '#EF4444';
      case 'meh':
        return '#94A3B8';
    }
  }};
`;

const LockButton = styled.button<{ isLocked: boolean }>`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: ${props => props.isLocked ? '#22C55E' : '#94A3B8'};
  transition: all 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const VoteLabel = styled.span`
  font-size: 0.875rem;
  color: #64748B;
  display: block;
  text-align: center;
  margin-top: 0.25rem;
`;

export type VoteType = 'up' | 'down' | 'meh';

interface VoteDesignProps {
  onVote: (vote: VoteType) => void;
  onLock: (vote: VoteType) => void;
  'data-testid'?: string;
}

export const VoteDesign: React.FC<VoteDesignProps> = ({
  onVote,
  onLock,
  'data-testid': dataTestId
}) => {
  const [selectedVote, setSelectedVote] = useState<VoteType | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const handleVote = (vote: VoteType) => {
    if (!isLocked) {
      setSelectedVote(vote);
      onVote(vote);
    }
  };

  const handleLock = () => {
    if (selectedVote) {
      setIsLocked(true);
      onLock(selectedVote);
    }
  };

  return (
    <VoteContainer data-testid={dataTestId}>
      <div>
        <VoteButton
          variant="up"
          onClick={() => handleVote('up')}
          data-testid="vote-up"
          title="Save as favorite"
          disabled={isLocked}
        >
          👍
        </VoteButton>
        <VoteLabel>Love it!</VoteLabel>
      </div>
      
      <div>
        <VoteButton
          variant="meh"
          onClick={() => handleVote('meh')}
          data-testid="vote-meh"
          title="Save with low priority"
          disabled={isLocked}
        >
          😐
        </VoteButton>
        <VoteLabel>Meh...</VoteLabel>
      </div>
      
      <div>
        <VoteButton
          variant="down"
          onClick={() => handleVote('down')}
          data-testid="vote-down"
          title="Archive for deconstruction"
          disabled={isLocked}
        >
          👎
        </VoteButton>
        <VoteLabel>Nope</VoteLabel>
      </div>

      <div>
        <LockButton
          onClick={handleLock}
          disabled={!selectedVote || isLocked}
          isLocked={isLocked}
          data-testid="vote-lock"
          title={isLocked ? "Vote locked" : "Lock in vote"}
        >
          {isLocked ? '🔒' : '🔓'}
        </LockButton>
        <VoteLabel>{isLocked ? 'Locked' : 'Lock Vote'}</VoteLabel>
      </div>
    </VoteContainer>
  );
};

