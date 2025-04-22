import React from 'react';
import {DetailItem, ModalStyled, AIBadge, DetailSection, DetailList} from '../../StyledComponents';
import {Teammate} from './Teammate.types';
import {isAITeammate} from '../../services/AgentService';

interface TeammateDetailsModalProps {
    teammate: Teammate;
    onClose: () => void;
    onStandupClick: () => void;
    isExiting: boolean;
}

const TeammateDetailsModal: React.FC<TeammateDetailsModalProps> = ({
    teammate,
    onClose,
    onStandupClick,
    isExiting
}) => {
    const { persona } = teammate;
    const isAI = isAITeammate(persona);

    return (
        <ModalStyled className={isExiting ? 'slide-out' : 'slide-in'}>
            <h2>
                {persona.name}
                {isAI && <AIBadge>AI</AIBadge>}
            </h2>
            <p>Role: {persona.role}</p>

            <DetailSection>
                <h3>About</h3>
                <p>{persona.description}</p>
            </DetailSection>

            <DetailSection>
                <h3>Capabilities</h3>
                <DetailList>
                    {persona.capabilities.map((capability, index) => (
                        <DetailItem key={index}>{capability}</DetailItem>
                    ))}
                </DetailList>
            </DetailSection>

            <DetailSection>
                <h3>Domains</h3>
                <DetailList>
                    {persona.domains.map((domain, index) => (
                        <DetailItem key={index}>{domain}</DetailItem>
                    ))}
                </DetailList>
            </DetailSection>

            <DetailSection>
                <h3>Status</h3>
                <p>{persona.status}</p>
            </DetailSection>

            <DetailSection>
                <h3>Contact</h3>
                <p>{persona.email}</p>
            </DetailSection>

            <div className="actions">
                <button onClick={onStandupClick}>
                    <span role="img" aria-label="standup">🎯</span> Start Standup
                </button>
                <button onClick={onClose}>Close</button>
            </div>
        </ModalStyled>
    );
};

export default TeammateDetailsModal;
