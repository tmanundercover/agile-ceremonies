import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const InfoCardContainer = styled.div`
  position: relative;
  margin: ${theme.spacing.lg} 0;
  padding: ${theme.spacing.lg};
  background: ${props => props.background || 'var(--card-bg)'};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoCardIcon = styled.div`
  font-size: 32px;
  background: var(--primary);
  color: white;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const InfoCardContent = styled.div`
  flex: 1;
`;

const InfoCardTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${theme.spacing.sm};
  font-size: 20px;
  color: var(--text-color);
`;

const InfoCardText = styled.div`
  color: var(--text-color);
  margin-bottom: ${theme.spacing.md};
`;

const InfoCardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const InfoCardButton = styled.a`
  display: inline-block;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${props => props.isPrimary ? 'var(--primary)' : 'transparent'};
  color: ${props => props.isPrimary ? 'white' : 'var(--primary)'};
  border: 1px solid var(--primary);
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: all ${theme.transitionSpeed};
  
  &:hover {
    background: ${props => props.isPrimary ? 'var(--primary-dark)' : 'rgba(147, 51, 234, 0.1)'};
    transform: translateY(-2px);
  }
`;

export const InfoCard = ({ title, icon, children, actions, background }) => {
  return (
    <InfoCardContainer background={background}>
      <InfoCardIcon>{icon}</InfoCardIcon>
      <InfoCardContent>
        <InfoCardTitle>{title}</InfoCardTitle>
        <InfoCardText>{children}</InfoCardText>
        <InfoCardActions>
          {actions.map((action, index) => (
            <InfoCardButton
              key={index} 
              href={action.link} 
              isPrimary={action.primary}
            >
              {action.label}
            </InfoCardButton>
          ))}
        </InfoCardActions>
      </InfoCardContent>
    </InfoCardContainer>
  );
};

export default InfoCard;
