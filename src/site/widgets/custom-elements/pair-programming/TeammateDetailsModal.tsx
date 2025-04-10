import React from 'react';
import { ModalStyled } from './StyledComponents';
import { Teammate } from './models';

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
    return (
        <ModalStyled className={isExiting ? 'slide-out' : 'slide-in'}>
            <h2>{teammate.name}</h2>
            <p>Role: {teammate.role}</p>
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
