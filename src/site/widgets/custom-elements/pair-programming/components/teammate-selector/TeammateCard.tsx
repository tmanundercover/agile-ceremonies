import React from 'react';
import {AIBadge, TeammateRole} from '../../StyledComponents';
import {Teammate} from './Teammate.types';
import {isAITeammate} from '../../services/AgentService';
import theme from '../../theme';
import styled from 'styled-components';

interface TeammateCardProps {
    teammate: Teammate;
    onClick: () => void;
}

export const TeammateInfo = styled.h3`
    margin: 0 0 ${theme.spacing.xs} 0;
    font-size: ${theme.typography.body.fontSize};
    color: ${theme.colors.primary};
    display: flex;
    align-items: center;
    word-break: break-word; /* Allow long names to break properly */

    &::before {
        content: '👤';
        margin-right: ${theme.spacing.xs};
        font-size: 16px;
    }
`;

export const TeammateCardContainer = styled.div`
    width: calc(100% - 2rem);
    min-height: 120px;
    padding: 1.5rem;
    background: #7FCF87;
    color: #000000;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-bottom: 1rem;
    text-align: center;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
`;


const TeammateCard: React.FC<TeammateCardProps> = ({teammate, onClick}) => {
    return (
        <TeammateCardContainer onClick={onClick}>
            <TeammateInfo>
                {teammate.persona.name}
                {isAITeammate(teammate.persona) && (
                    <AIBadge>AI</AIBadge>
                )}
            </TeammateInfo>
            <TeammateRole>{teammate.persona.role}</TeammateRole>
        </TeammateCardContainer>
    );
};

export default TeammateCard;
