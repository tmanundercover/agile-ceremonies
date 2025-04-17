import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const TagContainer = styled.span`
  background: ${props => props.isAgent ? 'transparent' : theme.colors.primaryLight};
  color: ${props => props.isAgent ? theme.colors.primary : 'white'};
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  margin: 2px;
  
  ${props => props.isAgent && `
    border: 1px dashed ${theme.colors.primary};
    
    &:hover {
      background: ${theme.colors.primaryLight};
      color: white;
      text-decoration: none;
    }
    
    &:before {
      content: "🤖";
      margin-right: 6px;
    }
  `}
  
  ${props => !props.isAgent && `
    border: 1px solid ${theme.colors.primaryDark};
  `}
`;

const Tag = ({ text, link, isAgent = false }) => {
  if (link) {
    return (
      <TagContainer 
        as="a" 
        href={link} 
        isAgent={isAgent}
      >
        {text}
      </TagContainer>
    );
  }
  
  return <TagContainer isAgent={isAgent}>{text}</TagContainer>;
};

export default Tag;
