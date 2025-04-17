import React from 'react';
import styled from 'styled-components';

const SchematicContainer = styled.div`
  margin: 1rem 0;
`;

const ImageContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const LegendContainer = styled.div`
  margin-top: 1rem;
`;

const LegendItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LegendColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${props => props.color};
`;

const LegendText = styled.div`
  font-size: 0.9rem;
`;

const WorkflowSchematic = ({ 
  id, 
  title = "Workflow Schematic",
  imageSrc, 
  imageAlt, 
  imageStyle = { maxWidth: "500px" },
  legendItems = [] 
}) => {
  return (
    <SchematicContainer id={id}>
      <h2>{title}</h2>
      <ImageContainer className="workflow-diagram">
        <img style={imageStyle} src={imageSrc} alt={imageAlt} className="interactive-image"/>
      </ImageContainer>

      {legendItems.length > 0 && (
        <LegendContainer className="legend">
          <h3>Legend</h3>
          <LegendItems className="legend-items">
            {legendItems.map((item, index) => (
              <LegendItem key={index} className="legend-item">
                <LegendColor className="legend-color" color={item.color}></LegendColor>
                <LegendText className="legend-text">{item.text}</LegendText>
              </LegendItem>
            ))}
          </LegendItems>
        </LegendContainer>
      )}
    </SchematicContainer>
  );
};

export default WorkflowSchematic;
