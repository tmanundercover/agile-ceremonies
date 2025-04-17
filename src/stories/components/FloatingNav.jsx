import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import theme from "../theme";

export const StyledFloatingNav = styled.nav`
    position: fixed;
    right: 20px;
    top: 20px;
    background-color: ${theme.colors.cardBg};
    border-radius: ${theme.borderRadius};
    padding: ${theme.spacing.sm};
    box-shadow: ${theme.boxShadow};
    z-index: 100;
    max-width: 200px;
    transform: translateY(${props => props.scrolled ? 0 : '-10px'});
    opacity: ${props => props.scrolled ? 1 : 0.7};
    transition: all 0.3s ease;

    &:hover {
        opacity: 1;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        margin-bottom: 2px;
    }

    button {
        background: transparent;
        border: none;
        padding: 4px 8px;
        width: 100%;
        text-align: left;
        cursor: pointer;
        font-size: 14px;
        color: ${theme.colors.textColor};
        border-radius: 4px;
        transition: background-color 0.2s;

        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }

        &.active {
            background-color: ${theme.colors.primary};
            color: white;
        }
    }
`;

const FloatingNav = () => {
    const [activeSection, setActiveSection] = useState('intro');
    const [scrolled, setScrolled] = useState(false);
    const sections = [
        {id: 'intro', label: 'Introduction'},
        {id: 'original-prompt', label: 'Original Prompt'},
        {id: 'org-charts', label: 'Organization Charts'},
        {id: 'timeline', label: 'Timeline'},
        {id: 'agents', label: 'AI Agents'},
        {id: 'architecture', label: 'Architecture'},
        {id: 'implementation', label: 'Implementation'},
        {id: 'concepts', label: 'AI Concepts'},
        {id: 'careers', label: 'New Careers'}
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrolled(scrollPosition > 50);

            // Find current section
            const sectionElements = sections.map(section => ({
                id: section.id,
                element: document.getElementById(section.id),
                offset: document.getElementById(section.id)?.offsetTop || 0
            }));

            const currentSection = [...sectionElements].reverse()
                .find(section => scrollPosition >= section.offset - 100);

            if (currentSection) setActiveSection(currentSection.id);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({behavior: 'smooth'});
        setActiveSection(id);
    };

    return (
        <StyledFloatingNav scrolled={scrolled}>
            <ul>
                {sections.map(section => (
                    <li key={section.id}>
                        <button
                            className={activeSection === section.id ? 'active' : ''}
                            onClick={() => scrollToSection(section.id)}
                        >
                            {section.label}
                        </button>
                    </li>
                ))}
            </ul>
        </StyledFloatingNav>
    );
};

export default FloatingNav;
