import React, {useState} from 'react';
import styled from "styled-components";
import theme from "../theme";

export const StyledCollapsible = styled.div`
    margin: ${theme.spacing.md} 0;
    border-radius: ${theme.borderRadius};
    border: 1px solid ${theme.colors.neutral500};
    overflow: hidden;

    .collapsible-header {
        background: ${theme.colors.neutral200};
        color: ${theme.colors.neutral900};
        padding: ${theme.spacing.md};
        width: 100%;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: none;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
            background: ${theme.colors.neutral500};
        }

        h3 {
            margin: 0;
        }

        .icon {
            font-size: 20px;
            font-weight: bold;
        }
    }

    .collapsible-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease;
        padding: 0 ${theme.spacing.md};

        &.expanded {
            max-height: 2000px;
            padding: ${theme.spacing.md};
        }
    }
`;
const CollapsibleSection = ({title, children, defaultExpanded = false}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <StyledCollapsible>
            <button
                className={`collapsible-header ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h3>{title}</h3>
                <span className="icon">{isExpanded ? '−' : '+'}</span>
            </button>
            <div className={`collapsible-content ${isExpanded ? 'expanded' : ''}`}>
                {children}
            </div>
        </StyledCollapsible>
    );
};

export default CollapsibleSection;
