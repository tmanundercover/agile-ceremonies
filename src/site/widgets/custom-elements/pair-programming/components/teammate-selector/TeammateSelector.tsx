import React, {useEffect, useState} from "react";
import {
    AIBadge,
    CardNavigation,
    IndicatorDot,
    NavButton,
    TeamIndicator, TeammateRole,
    ViewDetailsButton
} from "../../StyledComponents";
import {AgentProfileType} from "../../models";
import TeammateDetailsModal from "./TeammateDetailsModal";
import {fetchAgentProfiles, isAITeammate} from "../../services/AgentService";
import styled from "styled-components";
import theme from "../../theme";
import {TeammateInfo} from "./TeammateCard";
import { Teammate } from "./Teammate.types";

interface TeammateSelectorProps {
    onSelectedTeammate: (teammate: Teammate) => void;
}

export const TeamSelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${theme.spacing.md};
`;

export const CarouselCard = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%; /* Ensure the card doesn't exceed container width */
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: center center;
    background-color: ${theme.colors.cardBg};
    border-radius: ${theme.borderRadius};
    padding: ${theme.spacing.md};
    box-shadow: ${theme.boxShadow};
    margin-bottom: ${theme.spacing.sm};
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

    const nextTeammate = () => {
        setCurrentTeammateIndex((prev) => (prev + 1) % teammates.length);
    };

    const previousTeammate = () => {
        setCurrentTeammateIndex((prev) => (prev - 1 + teammates.length) % teammates.length);
    };

    // Get the current teammate to display
    const currentTeammate = teammates[currentTeammateIndex];

    return (
        <TeamSelectContainer>
            {teammates.length > 0 && (
                <CarouselCard
                    key={currentTeammate.id}
                    onClick={() => setSelectedTeammate(currentTeammate)}
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

