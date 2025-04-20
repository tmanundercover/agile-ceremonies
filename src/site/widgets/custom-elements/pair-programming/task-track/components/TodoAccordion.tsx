import React, { useState } from 'react';
import styled from 'styled-components';
import { TodoItem as TodoItemType } from '../../data/ProjectMilestoneData';

// Types
interface TeamMemberType {
    id: string;
    name: string;
    avatar?: string;
}

interface AssignmentType {
    itemId: string;
    itemType: 'phase' | 'task' | 'todo';
    memberId: string;
}

// Props
interface TodoAccordionProps {
    todo: TodoItemType;
    todoId: string;
    isCompleted: boolean;
    onCheck: (isChecked: boolean) => void;
    assignments: AssignmentType[];
    onAssign: (assignment: AssignmentType) => void;
    teamMembers: TeamMemberType[];
}

// Styled Components
const TodoItemStyled = styled.div`
    border-bottom: 1px dashed #eee;
`;

const TodoHeaderStyled = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    cursor: pointer;
`;

const CheckboxStyled = styled.input`
    margin-right: 0.75rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: ${props => props.theme.colors?.primary || '#5AB5F7'};
`;

const TodoTitleStyled = styled.span<{ $isCompleted: boolean }>`
    text-decoration: ${props => props.$isCompleted ? 'line-through' : 'none'};
    color: ${props => props.$isCompleted ? '#999' : '#333'};
    flex-grow: 1;
    font-size: 0.9rem;
`;

const AssignButtonStyled = styled.button`
    background: #f1f1f1;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    margin-left: 0.5rem;

    &:hover {
        background: #e1e1e1;
    }
`;

const ExpandIconStyled = styled.span<{ $isExpanded: boolean }>`
    transform: ${props => props.$isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
    transition: transform 0.3s ease;
    margin-left: 0.5rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
`;

const TodoDetailsStyled = styled.div<{ $isExpanded: boolean }>`
    max-height: ${props => props.$isExpanded ? '500px' : '0'};
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
    padding: ${props => props.$isExpanded ? '0.5rem 0 0.5rem 2.5rem' : '0 0 0 2.5rem'};
    font-size: 0.85rem;
    color: #666;
`;

const ServiceTagsStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.5rem 0;
`;

const ServiceTagStyled = styled.span`
    background: #f1f3f5;
    color: #495057;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
`;

const StatusChipStyled = styled.div`
    background: #e9f5ff;
    color: #0077cc;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    display: inline-block;
    margin-top: 0.25rem;
`;

const DetailRowStyled = styled.div`
    margin-bottom: 0.5rem;
`;

const DetailLabelStyled = styled.span`
    font-weight: 500;
    margin-right: 0.5rem;
`;

const AssigneeStyled = styled.div`
    display: flex;
    align-items: center;
    background: #e9ecef;
    border-radius: 20px;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    margin-left: 0.5rem;
`;

const AssigneeAvatarStyled = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #adb5bd;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.7rem;
    margin-right: 0.25rem;
`;

const AssignmentModalStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContentStyled = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    width: 300px;
    max-width: 90%;
`;

const ModalTitleStyled = styled.h3`
    margin-top: 0;
    margin-bottom: 1rem;
`;

const TeamMemberListStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const MemberItemStyled = styled.div`
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        background: #f1f1f1;
    }
`;

const TodoAccordion: React.FC<TodoAccordionProps> = ({
    todo,
    todoId,
    isCompleted,
    onCheck,
    assignments,
    onAssign,
    teamMembers
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);

    const assignee = assignments.find(a => a.itemId === todoId && a.itemType === 'todo');
    const assignedMember = assignee ? teamMembers.find(m => m.id === assignee.memberId) : null;

    const toggleExpand = (e: React.MouseEvent) => {
        // Prevent toggleExpand when clicking on checkbox or assign button
        if (
            (e.target as HTMLElement).tagName === 'INPUT' || 
            (e.target as HTMLElement).tagName === 'BUTTON'
        ) {
            return;
        }
        setIsExpanded(!isExpanded);
    };

    return (
        <TodoItemStyled>
            <TodoHeaderStyled onClick={toggleExpand}>
                <CheckboxStyled
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e) => onCheck(e.target.checked)}
                />
                <TodoTitleStyled $isCompleted={isCompleted}>{todo.title}</TodoTitleStyled>

                {assignedMember && (
                    <AssigneeStyled onClick={(e) => e.stopPropagation()}>
                        <AssigneeAvatarStyled>{assignedMember.name.charAt(0)}</AssigneeAvatarStyled>
                        {assignedMember.name}
                    </AssigneeStyled>
                )}

                <AssignButtonStyled onClick={(e) => {
                    e.stopPropagation();
                    setShowAssignModal(true);
                }}>
                    {assignedMember ? 'Reassign' : 'Assign'}
                </AssignButtonStyled>

                <ExpandIconStyled $isExpanded={isExpanded}>▼</ExpandIconStyled>
            </TodoHeaderStyled>

            <TodoDetailsStyled $isExpanded={isExpanded}>
                {todo.status && (
                    <DetailRowStyled>
                        <DetailLabelStyled>Status:</DetailLabelStyled>
                        <StatusChipStyled>{todo.status}</StatusChipStyled>
                    </DetailRowStyled>
                )}
                
                {assignedMember && (
                    <DetailRowStyled>
                        <DetailLabelStyled>Assigned to:</DetailLabelStyled>
                        {assignedMember.name}
                    </DetailRowStyled>
                )}

                {todo.services && todo.services.length > 0 && (
                    <DetailRowStyled>
                        <DetailLabelStyled>Services:</DetailLabelStyled>
                        <ServiceTagsStyled>
                            {todo.services.map((service, index) => (
                                <ServiceTagStyled key={index}>{service}</ServiceTagStyled>
                            ))}
                        </ServiceTagsStyled>
                    </DetailRowStyled>
                )}
            </TodoDetailsStyled>

            {showAssignModal && (
                <AssignmentModalStyled onClick={() => setShowAssignModal(false)}>
                    <ModalContentStyled onClick={(e) => e.stopPropagation()}>
                        <ModalTitleStyled>Assign Todo</ModalTitleStyled>
                        <TeamMemberListStyled>
                            {teamMembers.map((member) => (
                                <MemberItemStyled
                                    key={member.id}
                                    onClick={() => {
                                        onAssign({
                                            itemId: todoId,
                                            itemType: 'todo',
                                            memberId: member.id
                                        });
                                        setShowAssignModal(false);
                                    }}
                                >
                                    <AssigneeAvatarStyled>{member.name.charAt(0)}</AssigneeAvatarStyled>
                                    {member.name}
                                </MemberItemStyled>
                            ))}
                        </TeamMemberListStyled>
                    </ModalContentStyled>
                </AssignmentModalStyled>
            )}
        </TodoItemStyled>
    );
};

export default TodoAccordion;
