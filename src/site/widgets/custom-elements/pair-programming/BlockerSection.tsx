import React from 'react';
import { BlockerSectionStyled, BlockerListStyled, BlockerItemStyled, RemoveButtonStyled, InputStyled } from './StyledComponents';

interface BlockerSectionProps {
  blockers: string[];
  setBlockers: React.Dispatch<React.SetStateAction<string[]>>;
}

const BlockerSection: React.FC<BlockerSectionProps> = ({ blockers, setBlockers }) => {
  const [blockerInput, setBlockerInput] = React.useState<string>('');

  const handleAddBlocker = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && blockerInput.trim()) {
      setBlockers([...blockers, blockerInput.trim()]);
      setBlockerInput('');
      e.preventDefault();
    }
  };

  const handleRemoveBlocker = (index: number) => {
    setBlockers(blockers.filter((_, i) => i !== index));
  };

  return (
    <BlockerSectionStyled>
      <InputStyled type="text" placeholder="Add Blocker Here.." value={blockerInput} onChange={(e) => setBlockerInput(e.target.value)} onKeyDown={handleAddBlocker} />
      <BlockerListStyled>
        {blockers.map((blocker, index) => (
          <BlockerItemStyled key={index}>
            {blocker}
            <RemoveButtonStyled onClick={() => handleRemoveBlocker(index)}>x</RemoveButtonStyled>
          </BlockerItemStyled>
        ))}
      </BlockerListStyled>
    </BlockerSectionStyled>
  );
};

export default BlockerSection;

