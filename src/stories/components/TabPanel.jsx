import React, {useState} from 'react';
import styled from "styled-components";
import theme from "../theme";

export const StyledTabPanel = styled.div`
    margin: ${theme.spacing.lg} 0;

    .tab-buttons {
        border-bottom: 2px solid ${theme.colors.neutral500};
        display: flex;

        button {
            padding: ${theme.spacing.md};
            background: transparent;
            border: none;
            color: ${theme.colors.textColor};
            position: relative;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: ${theme.colors.primary};
            }

            &.active {
                color: ${theme.colors.primary};

                &:after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: ${theme.colors.primary};
                }
            }
        }
    }

    .tab-content {
        padding: ${theme.spacing.md};
        border: 1px solid ${theme.colors.neutral500};
        border-top: none;
        border-radius: 0 0 ${theme.borderRadius} ${theme.borderRadius};
    }
`;

const TabPanel = ({tabs}) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <StyledTabPanel>
            <div className="tab-buttons">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={activeTab === index ? 'active' : ''}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {tabs[activeTab].content}
            </div>
        </StyledTabPanel>
    );
};

export default TabPanel;
