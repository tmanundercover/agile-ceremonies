import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import {Teammate} from './Teammate.types';
import {isAITeammate} from '../../services/AgentService';

// Local Styled Components
const ModalStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.colors.cardBg};
    padding: ${theme.spacing.lg};
    border-radius: ${theme.borderRadius};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: ${theme.zIndices.modal};
    min-width: 300px;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    h2 {
        color: ${theme.colors.primary};
        margin-top: 0;
        border-bottom: 2px solid ${theme.colors.primaryLight};
        padding-bottom: ${theme.spacing.xs};
        margin-bottom: ${theme.spacing.md};
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: ${theme.spacing.lg};
        gap: ${theme.spacing.sm};

        button {
            background-color: ${theme.colors.primary};
            color: white;
            border: none;
            border-radius: ${theme.borderRadius};
            padding: ${theme.spacing.xs} ${theme.spacing.md};
            cursor: pointer;
            transition: background-color ${theme.transitionSpeed};

            &:hover {
                background-color: ${theme.colors.primaryDark};
            }

            &:last-child {
                background-color: ${theme.colors.neutral500};

                &:hover {
                    background-color: ${theme.colors.neutral700};
                }
            }
        }
    }

    &.slide-in {
        animation: slideIn 0.3s forwards;
    }

    &.slide-out {
        animation: slideOut 0.3s forwards;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
    }

    /* Mobile styles */
    @media (max-width: 768px) {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        transform: none;
        border-radius: 0;
        padding: ${theme.spacing.md};

        &.slide-in {
            animation: mobileSlideIn 0.3s forwards;
        }

        &.slide-out {
            animation: mobileSlideOut 0.3s forwards;
        }

        @keyframes mobileSlideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes mobileSlideOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(20px);
            }
        }

        .actions {
            margin-top: auto;
            padding-top: ${theme.spacing.md};
        }
    }
`;

const AIBadge = styled.span`
  display: inline-block;
  background-color: ${theme.colors.primary};
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: ${theme.borderRadius};
  margin-left: ${theme.spacing.xs};
  vertical-align: middle;
`;

const DetailSection = styled.div`
  margin-bottom: ${theme.spacing.md};
  
  h3 {
    font-size: 16px;
    margin-bottom: ${theme.spacing.xs};
    color: ${theme.colors.primary};
  }
`;

const DetailList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const DetailItem = styled.li`
  padding: ${theme.spacing.xs} 0;
  border-bottom: 1px solid ${theme.colors.neutral200};
  
  &:last-child {
    border-bottom: none;
  }
`;

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
