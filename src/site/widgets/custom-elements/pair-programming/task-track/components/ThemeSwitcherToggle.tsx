import React, {useEffect, useState} from "react";
import styled from "styled-components";
import theme from "../../theme";

interface ThemeToggleProps {
}export const StyledThemeToggle = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${theme.colors.cardBg};
    border: none;
    box-shadow: ${theme.boxShadow};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    z-index: 100;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

export const ThemeSwitcherToggle: React.FC<ThemeToggleProps> = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        setIsDarkMode(savedTheme === 'dark');
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = (): void => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <StyledThemeToggle onClick={toggleTheme} aria-label="Toggle dark mode">
            {isDarkMode ? '☀️' : '🌙'}
        </StyledThemeToggle>
    );
};