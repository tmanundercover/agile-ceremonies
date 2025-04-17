import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const ResponsibilitiesContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #7928CA;
  margin-bottom: 1rem;
`;

const ResponsibilitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ResponsibilitiesCard = ({ title = "Primary Responsibilities", responsibilities = [] }) => {
  return (
    <ResponsibilitiesContainer>
      <Title>{title}</Title>
      <ResponsibilitiesList>
        {responsibilities.map((item, index) => (
          <TodoItem key={index} text={item} />
        ))}
      </ResponsibilitiesList>
    </ResponsibilitiesContainer>
  );
};

export default ResponsibilitiesCard;
