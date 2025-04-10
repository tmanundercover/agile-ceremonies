import React from 'react';
import { TeammateCardContainer, TeammateInfo, TeammateRole } from './StyledComponents';
import { Teammate } from './models';

interface TeammateCardProps {
    teammate: Teammate;
    onClick: () => void;
}

const TeammateCard: React.FC<TeammateCardProps> = ({ teammate, onClick }) => {
    return (
        <TeammateCardContainer onClick={onClick}>
            <TeammateInfo>{teammate.name}</TeammateInfo>
            <TeammateRole>{teammate.role}</TeammateRole>
        </TeammateCardContainer>
    );
};

export default TeammateCard;
