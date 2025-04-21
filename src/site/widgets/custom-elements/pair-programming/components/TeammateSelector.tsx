import React, {useState} from "react";
import {
    CardNavigation,
    CarouselCard,
    IndicatorDot,
    NavButton,
    TeamIndicator,
    TeammateInfo,
    TeammateRole,
    TeamSelectContainer,
    ViewDetailsButton
} from "../StyledComponents";
import {Teammate} from "../models";
import TeammateDetailsModal from "../TeammateDetailsModal";

interface TeammateSelectorProps {
    teammates: Teammate[];
    onSelectedTeammate: (teammate: Teammate) => void;
}

const TeammateSelector: React.FC<TeammateSelectorProps> = ({teammates, onSelectedTeammate}) => {
    const [currentTeammateIndex, setCurrentTeammateIndex] = useState<number>(0)
    const [selectedTeammate, setSelectedTeammate] = useState<Teammate | null>(null);
    const [isTeammateDetailsModalOpen, setIsTeammateDetailsModalOpen] = useState<boolean>(false)
    const [showStandupModal, setShowStandupModal] = useState(false);

    const nextTeammate = () => {
        setCurrentTeammateIndex((prev) => (prev + 1) % teammates.length);
    };

    const previousTeammate = () => {
        setCurrentTeammateIndex((prev) => (prev - 1 + teammates.length) % teammates.length);
    };

    return (
        <TeamSelectContainer>
            {teammates.map((teammate, index) => (
                <CarouselCard
                    key={teammate.id}
                    className={index === currentTeammateIndex ? 'active' :
                        index === (currentTeammateIndex - 1 + teammates.length) % teammates.length ? 'prev' :
                            index === (currentTeammateIndex + 1) % teammates.length ? 'next' : ''}
                    onClick={() => setSelectedTeammate(teammate)}
                >
                    <TeammateInfo>{teammate.name}</TeammateInfo>
                    <TeammateRole>{teammate.role}</TeammateRole>
                    <ViewDetailsButton onClick={(e) => {
                        e.stopPropagation();
                        setIsTeammateDetailsModalOpen(true);
                    }}>
                        View Details
                    </ViewDetailsButton>
                </CarouselCard>
            ))}

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