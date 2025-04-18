import styled from 'styled-components';
import theme from './theme';

// App Container with fixed z-index and stacking context
export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    color: ${theme.colors.textColor};
    overflow: hidden;
    position: relative;
    isolation: isolate;
    font-family: ${theme.fontFamily};
    transition: background-color ${theme.transitionSpeed}, color ${theme.transitionSpeed};
`;

// Office container with proper z-index
export const OfficeContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100vh - 100px);
    width: 100%;
    position: relative;
    z-index: 1;
`;

export const Sidebar = styled.div<{ $visible?: boolean }>`
    width: 300px;
    padding: ${theme.spacing.md};
    background-color: ${theme.colors.cardBg};
    border-right: 1px solid ${theme.colors.neutral500};
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden; /* Explicitly prevent horizontal scrolling */
    box-shadow: ${theme.boxShadow};
    z-index: 1;
    scroll-behavior: smooth;
    transition: transform 0.3s ease;
    transform: translateX(${props => props.$visible === false ? '-100%' : '0'});
    
    /* Custom scrollbar styling */
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: ${theme.colors.neutral200};
        border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: ${theme.colors.neutral500};
        border-radius: 3px;
        
        &:hover {
            background-color: ${theme.colors.neutral700};
        }
    }
`;

export const TeammateCarousel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.md};
    position: relative;
`;

export const CarouselContainer = styled.div`
    position: relative;
    width: 100%;
    margin: ${theme.spacing.md} 0;
    overflow: visible;
    height: 140px;
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
    
    &.active {
        transform: scale(1) translateY(0);
        opacity: 1;
        z-index: 2;
    }
    
    &.prev, &.next {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        pointer-events: none;
        transform: scale(0.85) translateY(10px);
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

export const OfficeFloor = styled.div`
    flex: 1;
    padding: ${theme.spacing.lg};
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.lg};
    overflow-y: auto;
`;

export const DeskContainer = styled.div`
    background-color: ${theme.colors.cardBg};
    border-radius: ${theme.borderRadius};
    padding: ${theme.spacing.md};
    box-shadow: ${theme.boxShadow};
    display: grid;
    grid-template-areas:
    "title title"
    "dev1 dev2"
    "taskTitle taskTitle"
    "task task"
    "endcap endcap";
    grid-template-columns: 1fr 1fr;
    grid-gap: ${theme.spacing.md};
    width: 350px;
    transition: transform ${theme.transitionSpeed}, box-shadow ${theme.transitionSpeed};

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
`;

export const DeskTitle = styled.h3`
    grid-area: title;
    margin: 0;
    font-size: 18px;
    color: ${theme.colors.primary};
    border-bottom: 2px solid ${theme.colors.primaryLight};
    padding-bottom: ${theme.spacing.xs};
`;

export const Seat = styled.div`
    background-color: ${theme.colors.primaryLight};
    color: white;
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: bold;
`;

export const SeatOccupied = styled.div`
    background-color: ${theme.colors.neutral200};
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px dashed ${theme.colors.neutral500};
`;

export const EmptySeatLabel = styled.span`
    color: ${theme.colors.neutral700};
    font-size: 14px;
    font-style: italic;
`;

export const TaskSelectionTitle = styled.div`
    grid-area: taskTitle;
    color: ${theme.colors.primary};
    font-size: 14px;
    font-weight: 500;
    margin-top: ${theme.spacing.xs};
`;

export const TaskDropdown = styled.select`
    grid-area: task;
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius};
    border: 1px solid ${theme.colors.neutral500};
    background-color: ${theme.colors.cardBg};
    color: ${theme.colors.textColor};
    font-size: 14px;
    outline: none;

    &:focus {
        border-color: ${theme.colors.primary};
        box-shadow: 0 0 0 2px ${theme.colors.primaryLight}40;
    }
`;

export const SectionTitle = styled.h2`
    font-size: ${theme.typography.heading3.fontSize};
    margin-top: 0;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.primary};
    position: relative;
    display: inline-block;

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: -4px;
        left: 0;
        background: ${theme.colors.primary};
        border-radius: 2px;
    }
`;

export const StandupButton = styled.button`
    background-color: ${theme.colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.body.fontSize};
    cursor: pointer;
    margin: ${theme.spacing.md} 0;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    position: relative;
    font-weight: 500;
    
    &::before {
        content: '📅';
        margin-right: ${theme.spacing.sm};
        transition: transform 0.2s ease;
    }
    
    &:hover {
        background-color: ${theme.colors.primaryDark};
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        
        &::before {
            transform: rotate(-10deg);
        }
    }
    
    &:active {
        transform: translateY(1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }
`;

export const CardNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: ${theme.spacing.xs};
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

export const SidebarSection = styled.div`
    margin-bottom: ${theme.spacing.md};
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -${theme.spacing.sm};
        left: 10%;
        width: 80%;
        height: 1px;
        background: linear-gradient(to right, transparent, ${theme.colors.neutral300}, transparent);
    }
    
    &:last-child::after {
        display: none;
    }
`;

export const ModalStyled = styled.div`
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

export const TeamCarouselStyled = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: ${theme.spacing.md};
    overflow: hidden;
`;

export const CarouselNav = styled.div`
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 3;
`;

export const CarouselNavButton = styled.button`
    background-color: ${theme.colors.primary};
    color: white;
    border: none;
    border-radius: 12px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all ${theme.transitionSpeed};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    pointer-events: auto;
    opacity: 0.7;

    &:hover {
        background-color: ${theme.colors.primaryDark};
        opacity: 1;
        transform: scale(1.1);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${theme.colors.primaryLight}, 0 2px 4px rgba(0, 0, 0, 0.2);
    }
`;

export const TeamSelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${theme.spacing.md};
`;

export const TeamIndicator = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${theme.spacing.xs};
    gap: ${theme.spacing.xs};
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

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: ${theme.zIndices.modal - 1};
    
    &.fade-in {
        animation: fadeIn 0.3s forwards;
    }
    
    &.fade-out {
        animation: fadeOut 0.3s forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: ${theme.spacing.sm};
    right: ${theme.spacing.sm};
    background: transparent;
    border: none;
    color: ${theme.colors.neutral700};
    font-size: 24px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
        color: ${theme.colors.error};
        transform: scale(1.1);
    }
`;

export const ModalSection = styled.div`
    margin-bottom: ${theme.spacing.md};
    padding-bottom: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.neutral200};
    
    &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
`;

export const ModalSectionTitle = styled.h3`
    font-size: 16px;
    color: ${theme.colors.primary};
    margin-top: 0;
    margin-bottom: ${theme.spacing.sm};
`;

export const DetailItem = styled.div`
    display: flex;
    margin-bottom: ${theme.spacing.xs};
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export const DetailLabel = styled.div`
    font-weight: 500;
    width: 100px;
    color: ${theme.colors.neutral700};
`;

export const DetailValue = styled.div`
    flex: 1;
`;

export const HelpRequestLabel = styled.div<{ $urgency: string }>`
    display: inline-block;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    background-color: ${props => 
        props.$urgency === 'high' ? theme.colors.error + '30' : 
        props.$urgency === 'medium' ? theme.colors.warning + '30' : 
        theme.colors.info + '30'};
    color: ${props => 
        props.$urgency === 'high' ? theme.colors.error : 
        props.$urgency === 'medium' ? theme.colors.warning : 
        theme.colors.info};
    margin-right: ${theme.spacing.xs};
`;

export const ModalGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: ${theme.spacing.sm};
    margin-top: ${theme.spacing.sm};
`;

export const ModalGridItem = styled.div`
    background-color: ${theme.colors.neutral100};
    border-radius: ${theme.borderRadius};
    padding: ${theme.spacing.sm};
`;

export const ModalGridItemTitle = styled.div`
    font-weight: 500;
    margin-bottom: 2px;
`;

export const ModalGridItemSubtitle = styled.div`
    font-size: 12px;
    color: ${theme.colors.neutral700};
`;

export const StandupForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xs};
`;

export const FormLabel = styled.label`
    font-weight: 500;
    font-size: 14px;
    color: ${theme.colors.neutral700};
`;

export const FormInput = styled.input`
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius};
    border: 1px solid ${theme.colors.neutral500};
    background-color: ${theme.colors.cardBg};
    color: ${theme.colors.textColor};
    font-size: 14px;
    outline: none;
    
    &:focus {
        border-color: ${theme.colors.primary};
        box-shadow: 0 0 0 2px ${theme.colors.primaryLight}40;
    }
`;

export const FormSelect = styled.select`
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius};
    border: 1px solid ${theme.colors.neutral500};
    background-color: ${theme.colors.cardBg};
    color: ${theme.colors.textColor};
    font-size: 14px;
    outline: none;
    
    &:focus {
        border-color: ${theme.colors.primary};
        box-shadow: 0 0 0 2px ${theme.colors.primaryLight}40;
    }
`;

export const FormTextarea = styled.textarea`
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius};
    border: 1px solid ${theme.colors.neutral500};
    background-color: ${theme.colors.cardBg};
    color: ${theme.colors.textColor};
    font-size: 14px;
    outline: none;
    min-height: 80px;
    resize: vertical;
    
    &:focus {
        border-color: ${theme.colors.primary};
        box-shadow: 0 0 0 2px ${theme.colors.primaryLight}40;
    }
`;

export const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xs};
`;

export const TaskListSection = styled.div`
    margin-bottom: ${theme.spacing.sm};
    background-color: ${theme.colors.cardBg};
    border-radius: ${theme.borderRadius};
    padding: ${theme.spacing.md};
    box-shadow: ${theme.shadows.md};
    border-left: 3px solid ${theme.colors.primary};
    transition: all ${theme.transitionSpeed};
    
    &:hover {
        box-shadow: ${theme.shadows.lg};
        transform: translateY(-2px);
    }
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export const TaskListTitle = styled.h4`
    margin: 0 0 ${theme.spacing.xs} 0;
    font-size: 15px;
    font-weight: 600;
    color: ${theme.colors.primary};
    border-bottom: 1px solid ${theme.colors.primaryLight}40;
    padding-bottom: ${theme.spacing.xs};
`;

export const TaskItem = styled.div`
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    background-color: ${theme.colors.neutral100};
    border-radius: ${theme.borderRadius};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.xs};
    transition: all ${theme.transitionSpeed};
    
    &:hover {
        background-color: ${theme.colors.neutral200};
        transform: translateX(3px);
    }
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export const TaskButton = styled.button`
    background-color: ${theme.colors.primary};
    color: white;
    border: none;
    border-radius: ${theme.borderRadius};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 12px;
    cursor: pointer;
    transition: all ${theme.transitionSpeed} ${theme.animations.easeOutBack};
    
    &:hover {
        background-color: ${theme.colors.primaryDark};
        transform: scale(1.05);
        box-shadow: ${theme.shadows.sm};
    }
    
    &:active {
        transform: scale(0.98);
    }
`;

// Task tracker specific styled components
export const MilestoneCard = styled.div`
    background-color: ${theme.colors.cardBg};
    border-radius: ${theme.borderRadius};
    padding: ${theme.spacing.md};
    box-shadow: ${theme.shadows.md};
    margin-bottom: ${theme.spacing.md};
    border-left: 4px solid ${theme.colors.primary};
    transition: all ${theme.transitionSpeed};
    
    &:hover {
        transform: translateY(-3px);
        box-shadow: ${theme.shadows.lg};
    }
`;

export const MilestoneTitle = styled.h3`
    color: ${theme.colors.primary};
    margin-top: 0;
    margin-bottom: ${theme.spacing.sm};
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid ${theme.colors.primaryLight};
    padding-bottom: ${theme.spacing.xs};
`;

export const MilestoneDescription = styled.p`
    margin: ${theme.spacing.xs} 0;
    color: ${theme.colors.textColor};
    font-size: 14px;
`;

export const TaskGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${theme.spacing.md};
    margin-top: ${theme.spacing.md};
`;

export const TaskTrackerContent = styled.div<{ $sidebarVisible?: boolean }>`
    flex: 1;
    padding: ${theme.spacing.md};
    overflow-y: auto;
    transition: margin-left 0.3s ease;
    margin-left: ${props => props.$sidebarVisible ? '0' : '-300px'};
`;

export const SidebarToggleButton = styled.button<{ $sidebarVisible: boolean }>`
    position: absolute;
    left: ${props => props.$sidebarVisible ? '280px' : '0'};
    top: 50%;
    transform: translateY(-50%);
    background-color: ${theme.colors.primary};
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    width: 24px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: left 0.3s ease;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    
    &::before {
        content: ${props => props.$sidebarVisible ? '"\\2039"' : '"\\203A"'};
        font-size: 18px;
    }
    
    &:hover {
        background-color: ${theme.colors.primaryDark};
    }
`;

