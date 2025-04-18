import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

interface TodoServicesTagProps {
  service: string;
}

const ServiceTagContainer = styled.span`
  display: inline-block;
  padding: 2px 8px;
  margin: 0 4px 4px 0;
  border-radius: ${theme.borderRadius};
  font-size: 11px;
  font-weight: 500;
  background-color: ${props => getServiceColor(props.children as string).bg};
  color: ${props => getServiceColor(props.children as string).text};
  border: 1px solid ${props => getServiceColor(props.children as string).border};
`;

// Function to determine color based on service name
function getServiceColor(service: string): { bg: string; text: string; border: string } {
  const serviceColors: { [key: string]: { bg: string; text: string; border: string } } = {
    'Firebase': { bg: '#FFCB2B15', text: '#F57C00', border: '#FFCA28' },
    'Firebase Functions': { bg: '#FFCB2B15', text: '#F57C00', border: '#FFCA28' },
    'Firebase Firestore': { bg: '#FFCB2B15', text: '#F57C00', border: '#FFCA28' },
    'Firebase RTDB': { bg: '#FFCB2B15', text: '#F57C00', border: '#FFCA28' },
    'Firebase Authentication': { bg: '#FFCB2B15', text: '#F57C00', border: '#FFCA28' },
    'n8n': { bg: '#6A57D515', text: '#6A57D5', border: '#6A57D580' },
    'Wix': { bg: '#FAD04015', text: '#F6921E', border: '#FAD04080' },
    'Wix Custom Elements': { bg: '#FAD04015', text: '#F6921E', border: '#FAD04080' },
    'React': { bg: '#61DAFB15', text: '#61DAFB', border: '#61DAFB80' },
    'TypeScript': { bg: '#3178C615', text: '#3178C6', border: '#3178C680' },
    'Docker': { bg: '#2496ED15', text: '#2496ED', border: '#2496ED80' },
    'GitHub API': { bg: '#18121815', text: '#181218', border: '#18121880' },
    'OpenAI': { bg: '#41268815', text: '#412688', border: '#41268880' },
    'OpenAI API': { bg: '#41268815', text: '#412688', border: '#41268880' },
  };

  // Return color for specific service, or default if not found
  return serviceColors[service] || { bg: '#E8E8E815', text: theme.colors.primary, border: '#E8E8E880' };
}

const TodoServicesTag: React.FC<TodoServicesTagProps> = ({ service }) => {
  return (
    <ServiceTagContainer>
      {service}
    </ServiceTagContainer>
  );
};

export default TodoServicesTag;
