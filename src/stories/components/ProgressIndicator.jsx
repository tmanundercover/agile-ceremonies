import React, {useEffect, useState} from "react";
import styled from "styled-components";
import theme from "../theme";

export const StyledProgressBar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    z-index: 1000;

    .progress-bar {
        height: 100%;
        background-color: ${theme.colors.primary};
        width: ${props => props.progress}%;
        transition: width 0.2s ease;
    }
`;

export const ProgressIndicator = () => {
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        const calculateProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.scrollY;
            const scrollPercent = (scrollTop / documentHeight) * 100;
            setProgress(scrollPercent);
        };

        window.addEventListener('scroll', calculateProgress);
        return () => window.removeEventListener('scroll', calculateProgress);
    }, []);

    return (
        <StyledProgressBar progress={progress}>
            <div className="progress-bar"></div>
        </StyledProgressBar>
    );
};
