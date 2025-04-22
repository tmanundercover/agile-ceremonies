import React, {useEffect, useState} from "react";
import {AgentProfileType} from "../../models";
import TeammateDetailsModal from "./TeammateDetailsModal";
import {fetchAgentProfiles, isAITeammate} from "../../services/AgentService";
import styled from "styled-components";
import theme from "../../theme";
import { Teammate } from "./Teammate.types";
import {AIBadge} from "./Teammate.styled";

interface TeammateSelectorProps {
    onSelectedTeammate: (teammate: Teammate) => void;
}

export const TeamSelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${theme.spacing.sm};
`;

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

export const CarouselCard = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%; /* Ensure the card doesn't exceed container width */
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: center center;
    background-color: ${theme.colors.cardBg};
    border-radius: ${theme.borderRadius};
    padding: ${theme.spacing.sm}; /* Reduce padding */
    box-shadow: ${theme.boxShadow};
    margin-bottom: ${theme.spacing.xs}; /* Reduce margin */
    border-left: 4px solid ${theme.colors.primary};
    overflow: hidden;
    cursor: pointer;
    box-sizing: border-box; /* Include padding in width calculation */
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, ${theme.colors.primary}10, transparent 20%);
        pointer-events: none;
    }
`;

export const IndicatorDot = styled.div<{ $active: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.$active ? theme.colors.primary : theme.colors.neutral300};
    transition: all 0.3s ease;
    
    &:hover {
        transform: ${props => props.$active ? 'none' : 'scale(1.2)'};
    }
`;

export const NavButton = styled.button`
    background-color: ${theme.colors.primary};
    color: white;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ${theme.transitionSpeed};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 2;

    &:hover {
        background-color: ${theme.colors.primaryDark};
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${theme.colors.primaryLight}, 0 2px 4px rgba(0, 0, 0, 0.2);
    }
`;

export const TeamIndicator = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${theme.spacing.xs};
    gap: ${theme.spacing.xs};
`;

export const TeammateRole = styled.div`
    font-size: ${theme.typography.small.fontSize};
    color: ${theme.colors.neutral700};
    margin-bottom: ${theme.spacing.xs};
    padding-left: ${theme.spacing.md};
    position: relative;
    
    &::before {
        content: '🔹';
        position: absolute;
        left: 0;
        font-size: 10px;
        color: ${theme.colors.primary};
    }
`;

export const ViewDetailsButton = styled.button`
    background-color: transparent;
    color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};
    border-radius: ${theme.borderRadius};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: ${theme.spacing.xs};
    text-align: center;
    width: 100%;
    
    &:hover {
        background-color: ${theme.colors.primary}15;
        transform: translateY(-1px);
    }
`;

export const CardNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${theme.spacing.xs}; /* Reduce margin */
`;

const TeammateSelector: React.FC<TeammateSelectorProps> = ({onSelectedTeammate}) => {
    const [currentTeammateIndex, setCurrentTeammateIndex] = useState<number>(0)
    const [selectedTeammate, setSelectedTeammate] = useState<Teammate | null>(null);
    const [isTeammateDetailsModalOpen, setIsTeammateDetailsModalOpen] = useState<boolean>(false)
    const [showStandupModal, setShowStandupModal] = useState(false);
    const [aiAgents, setAiAgents] = useState<AgentProfileType[]>([]);

    const [teammates, setTeammates] = useState<Teammate[]>([])

    useEffect(() => {
        // Convert AI agent profiles to teammate personas
        const convertedTeammates = aiAgents.map(agent => ({
            id: agent.id,
            helpRequests: [],
            persona: {
                id: agent.id,
                name: agent.name,
                role: agent.role as 'Developer' | 'Graphic Designer' | 'PM' | 'Requirements' | 'CEO' | 'Testing' | 'Dev Ops' | 'Async Teammate',
                capabilities: agent.capabilities,
                description: agent.description,
                domains: agent.domains,
                status: agent.status,
                email: `${agent.name.toLowerCase().replace(/\s/g, '.')}@ai-team.com`,
                avatarUrl: `/images/ai-avatars/${agent.name.toLowerCase().replace(/\s/g, '-')}.png`,
            }
        }));
        setTeammates(convertedTeammates)
    }, [aiAgents])

    useEffect(() => {
        // Fetch AI agent profiles on component mount
        const loadAgentProfiles = async () => {
            const agents = await fetchAgentProfiles();
            console.log("Fetched AI agents:", agents);
            setAiAgents(agents);
        };

        loadAgentProfiles().then(() => {
        });
    }, []);

    // Update current teammate when selection changes
    useEffect(() => {
        if (teammates.length > 0) {
            const currentTeammate = teammates[currentTeammateIndex];
            onSelectedTeammate(currentTeammate);
        }
    }, [currentTeammateIndex, teammates, onSelectedTeammate]);

    const nextTeammate = () => {
        setCurrentTeammateIndex((prev) => (prev + 1) % teammates.length);
    };

    const previousTeammate = () => {
        setCurrentTeammateIndex((prev) => (prev - 1 + teammates.length) % teammates.length);
    };

    // Get the current teammate to display
    const currentTeammate = teammates[currentTeammateIndex];

    const handleTeammateSelect = (teammate: Teammate) => {
        setSelectedTeammate(teammate);
        onSelectedTeammate(teammate);
    };

    return (
        <TeamSelectContainer>
            {teammates.length > 0 && (
                <CarouselCard
                    key={currentTeammate.id}
                    onClick={() => handleTeammateSelect(currentTeammate)}
                >
                    <TeammateInfo>
                        {currentTeammate.persona.name}
                        {isAITeammate(currentTeammate.persona) && (
                            <AIBadge>AI</AIBadge>
                        )}
                    </TeammateInfo>
                    <TeammateRole>{currentTeammate.persona.role}</TeammateRole>
                    <ViewDetailsButton onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTeammate(currentTeammate);
                        setIsTeammateDetailsModalOpen(true);
                    }}>
                        View Details
                    </ViewDetailsButton>
                </CarouselCard>
            )}

            <CardNavigation>
                <NavButton onClick={previousTeammate} aria-label="Previous teammate">
                    ←
                </NavButton>
                <TeamIndicator>
                    {teammates.map((_, index) => (
                        <IndicatorDot
                            key={index}
                            $active={index === currentTeammateIndex}
                            onClick={() => setCurrentTeammateIndex(index)}
                        />
                    ))}
                </TeamIndicator>
                <NavButton onClick={nextTeammate} aria-label="Next teammate">
                    →
                </NavButton>
            </CardNavigation>
            {isTeammateDetailsModalOpen && selectedTeammate && (
                <TeammateDetailsModal
                    teammate={selectedTeammate}
                    onClose={() => setIsTeammateDetailsModalOpen(false)}
                    onStandupClick={() => setShowStandupModal(true)}
                    isExiting={showStandupModal}
                />
            )}
        </TeamSelectContainer>
    );
};

export default TeammateSelector;

