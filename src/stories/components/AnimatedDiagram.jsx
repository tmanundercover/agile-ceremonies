import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from "../theme";

// Styled components for the diagram
const DiagramContainer = styled.div`
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.6s ease, transform 0.6s ease;
  margin: ${theme.spacing.xl} 0;
  position: relative;
`;

const DiagramTitle = styled.h3`
  margin-bottom: ${theme.spacing.md};
  color: var(--text-color);
`;

const AnimatedDiagram = ({ id, title, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    // Predefined SVG diagrams
    const renderPredefinedDiagram = () => {
        if (id === 'agent-relationships') {
            return (
                <svg width="100%" height="300" viewBox="0 0 800 300">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7"
                            refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#9333EA" />
                        </marker>
                    </defs>

                    {/* CEO Node */}
                    <circle cx="400" cy="50" r="40" fill="#9333EA" />
                    <text x="400" y="55" textAnchor="middle" fill="white" fontSize="14">Nat (CEO)</text>

                    {/* PM Node */}
                    <circle cx="400" cy="150" r="30" fill="#A855F7" />
                    <text x="400" y="155" textAnchor="middle" fill="white" fontSize="12">Brian (PM)</text>

                    {/* Connection line */}
                    <line x1="400" y1="90" x2="400" y2="120"
                        stroke="#9333EA" strokeWidth="2" markerEnd="url(#arrowhead)" />

                    {/* More nodes */}
                    <circle cx="200" cy="225" r="25" fill="#7928CA" />
                    <text x="200" y="230" textAnchor="middle" fill="white" fontSize="11">Reqqy</text>

                    <circle cx="325" cy="225" r="25" fill="#EAB308" />
                    <text x="325" y="230" textAnchor="middle" fill="white" fontSize="11">Josh</text>

                    <circle cx="450" cy="225" r="25" fill="#22C55E" />
                    <text x="450" y="230" textAnchor="middle" fill="white" fontSize="10">James & Terrell</text>

                    <circle cx="575" cy="225" r="25" fill="#3B82F6" />
                    <text x="575" y="230" textAnchor="middle" fill="white" fontSize="11">Antosh</text>

                    {/* Connection lines */}
                    <line x1="380" y1="175" x2="210" y2="205"
                        stroke="#A855F7" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="390" y1="175" x2="330" y2="205"
                        stroke="#A855F7" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="410" y1="175" x2="445" y2="205"
                        stroke="#A855F7" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="420" y1="175" x2="565" y2="205"
                        stroke="#A855F7" strokeWidth="2" markerEnd="url(#arrowhead)" />
                </svg>
            );
        }

        if (id === 'system-architecture') {
            return (
                <svg width="100%" height="300" viewBox="0 0 800 300">
                    {/* Client */}
                    <rect x="350" y="20" width="100" height="40" rx="5" fill="#9333EA" />
                    <text x="400" y="45" textAnchor="middle" fill="white">Client Application</text>

                    {/* API Gateway */}
                    <rect x="350" y="100" width="100" height="40" rx="5" fill="#A855F7" />
                    <text x="400" y="125" textAnchor="middle" fill="white">API Gateway</text>

                    {/* Services */}
                    <rect x="200" y="180" width="100" height="40" rx="5" fill="#7928CA" />
                    <text x="250" y="205" textAnchor="middle" fill="white">Auth Service</text>

                    <rect x="350" y="180" width="100" height="40" rx="5" fill="#7928CA" />
                    <text x="400" y="205" textAnchor="middle" fill="white">Core Service</text>

                    <rect x="500" y="180" width="100" height="40" rx="5" fill="#7928CA" />
                    <text x="550" y="205" textAnchor="middle" fill="white">Analytics Service</text>

                    {/* Data Stores */}
                    <ellipse cx="300" cy="260" rx="50" ry="25" fill="#22C55E" />
                    <text x="300" y="265" textAnchor="middle" fill="white">PostgreSQL</text>

                    <ellipse cx="400" cy="260" rx="50" ry="25" fill="#EAB308" />
                    <text x="400" y="265" textAnchor="middle" fill="white">Redis</text>

                    <ellipse cx="500" cy="260" rx="50" ry="25" fill="#3B82F6" />
                    <text x="500" y="265" textAnchor="middle" fill="white">TimescaleDB</text>

                    {/* Connections */}
                    <line x1="400" y1="60" x2="400" y2="100" stroke="#9333EA" strokeWidth="2" />
                    <line x1="400" y1="140" x2="250" y2="180" stroke="#A855F7" strokeWidth="2" />
                    <line x1="400" y1="140" x2="400" y2="180" stroke="#A855F7" strokeWidth="2" />
                    <line x1="400" y1="140" x2="550" y2="180" stroke="#A855F7" strokeWidth="2" />
                    <line x1="400" y1="220" x2="400" y2="235" stroke="#7928CA" strokeWidth="2" />
                    <line x1="350" y1="220" x2="300" y2="235" stroke="#7928CA" strokeWidth="2" />
                    <line x1="450" y1="220" x2="500" y2="235" stroke="#7928CA" strokeWidth="2" />
                </svg>
            );
        }

        return null;
    };

    return (
        <DiagramContainer ref={ref} isVisible={isVisible} id={id}>
            {title && <DiagramTitle>{title}</DiagramTitle>}
            {renderPredefinedDiagram()}
            {children}
        </DiagramContainer>
    );
};

export default AnimatedDiagram;
