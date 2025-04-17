import React, { useState } from 'react';
import StandupModal from '../../site/widgets/custom-elements/pair-programming/standup/StandupModal';
import styled from 'styled-components';
import theme from '../theme';

// Styled components
const DocsContainer = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.cardBg};
  color: ${theme.colors.textColor};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
`;

const DocSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const DocTitle = styled.h1`
  font-size: ${theme.typography.heading1.fontSize};
  font-weight: ${theme.typography.heading1.fontWeight};
  position: relative;
  display: inline-block;
  margin-bottom: ${theme.spacing.lg};
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    bottom: -8px;
    left: 0;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.heading2.fontSize};
  font-weight: ${theme.typography.heading2.fontWeight};
  border-bottom: 2px solid ${theme.colors.primaryLight};
  padding-bottom: ${theme.spacing.xs};
  margin-top: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
`;

const SubTitle = styled.h3`
  font-size: ${theme.typography.heading3.fontSize};
  font-weight: ${theme.typography.heading3.fontWeight};
  margin-top: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.primary};
`;

const Text = styled.p`
  margin-bottom: ${theme.spacing.md};
  line-height: ${theme.typography.body.lineHeight};
`;

const HighlightBox = styled.div`
  background-color: rgba(147, 51, 234, 0.15);
  border-left: 4px solid ${theme.colors.primary};
  padding: ${theme.spacing.md};
  margin: ${theme.spacing.md} 0;
  border-radius: 0 ${theme.borderRadius} ${theme.borderRadius} 0;
`;

const PropertyTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${theme.spacing.md} 0;
`;

const TableHeader = styled.th`
  padding: ${theme.spacing.md};
  text-align: left;
  border-bottom: 1px solid ${theme.colors.neutral500};
  color: ${theme.colors.primaryLight};
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: ${theme.spacing.md};
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin: ${theme.spacing.md} 0;
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.primary ? theme.colors.primaryDark : 'rgba(147, 51, 234, 0.1)'};
    transform: translateY(-2px);
    box-shadow: ${theme.boxShadow};
  }
`;

const CodeBlock = styled.pre`
  background: ${theme.colors.neutral900};
  color: ${theme.colors.primary};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius};
  overflow-x: auto;
  margin: ${theme.spacing.md} 0;
  font-family: 'Consolas', 'Monaco', 'Andale Mono', monospace;
  font-size: 0.9em;
  line-height: 1.5;
  
  /* Add slight syntax highlighting for better contrast */
  .keyword { color: #F56565; }
  .string { color: #68D391; }
  .comment { color: #A0AEC0; font-style: italic; }
  .function { color: #63B3ED; }
  .variable { color: #F6AD55; }
`;

const List = styled.ul`
  margin: ${theme.spacing.sm} 0;
  padding-left: ${theme.spacing.lg};
`;

const ListItem = styled.li`
  margin-bottom: ${theme.spacing.xs};
`;

const StandupModalDocs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  
  const demoTeammate = {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'Developer',
    avatarUrl: ''
  };
  
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };
  
  const handleCloseModal = (data) => {
    setIsModalVisible(false);
    if (data.name) { // Only set if we have actual data (not a cancel)
      setSubmittedData(data);
    }
  };
  
  // Create a styled wrapper for the modal to ensure it appears centered
  const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;
  
  return (
    <DocsContainer>
      <DocTitle>Standup Modal Component</DocTitle>
      
      <DocSection>
        <SectionTitle>Overview</SectionTitle>
        <Text>
          The Standup Modal component provides an interface for team members to submit their daily standup
          information. This includes completed tasks, in-progress work, planned tasks, blockers, and
          help requests.
        </Text>
        
        <HighlightBox>
          <SubTitle>Integration Point</SubTitle>
          <Text>
            This modal is designed to integrate with the Standup component. When a user clicks "Submit Standup", 
            this modal appears to collect detailed information about the team member's status.
          </Text>
        </HighlightBox>
      </DocSection>
      
      <DocSection>
        <SectionTitle>Properties</SectionTitle>
        <PropertyTable>
          <thead>
            <tr>
              <TableHeader>Property</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Description</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>teammate</TableCell>
              <TableCell>Teammate | null</TableCell>
              <TableCell>The team member submitting the standup data</TableCell>
            </tr>
            <tr>
              <TableCell>onClose</TableCell>
              <TableCell>(data: StandupData) =&gt; void</TableCell>
              <TableCell>Callback function when modal is closed with data or canceled</TableCell>
            </tr>
            <tr>
              <TableCell>isEntering</TableCell>
              <TableCell>boolean</TableCell>
              <TableCell>Controls animation state of the modal entrance</TableCell>
            </tr>
          </tbody>
        </PropertyTable>
      </DocSection>
      
      <DocSection>
        <SectionTitle>Interactive Preview</SectionTitle>
        <Text>Click the button below to open the standup modal and test its functionality:</Text>
        
        <ButtonGroup>
          <ActionButton primary onClick={handleOpenModal}>Open Standup Modal</ActionButton>
        </ButtonGroup>
        
        {isModalVisible && (
          <ModalWrapper>
            <StandupModal 
              teammate={demoTeammate} 
              onClose={handleCloseModal} 
              isEntering={true}
            />
          </ModalWrapper>
        )}
        
        {submittedData && (
          <div>
            <SubTitle>Submitted Standup Data:</SubTitle>
            <CodeBlock>
              {JSON.stringify(submittedData, null, 2)}
            </CodeBlock>
          </div>
        )}
      </DocSection>
      
      <DocSection>
        <SectionTitle>Data Model</SectionTitle>
        <Text>
          The standup modal collects and structures information according to the following model:
        </Text>
        
        <HighlightBox>
          <SubTitle>StandupData</SubTitle>
          <List>
            <ListItem><strong>name:</strong> string - Team member's name</ListItem>
            <ListItem><strong>status:</strong> string - Current work status (On Track, Blocked, At Risk)</ListItem>
            <ListItem><strong>blockers:</strong> string[] - List of blockers preventing progress</ListItem>
            <ListItem><strong>helpRequest:</strong> HelpRequest - Request for assistance from teammates</ListItem>
            <ListItem><strong>tasksCompleted:</strong> Task[] - Tasks completed since last standup</ListItem>
            <ListItem><strong>tasksInProgress:</strong> Task[] - Tasks currently being worked on</ListItem>
            <ListItem><strong>tasksPlanned:</strong> Task[] - Tasks planned for upcoming work</ListItem>
          </List>
        </HighlightBox>
      </DocSection>
      
      <DocSection>
        <SectionTitle>Implementation Example</SectionTitle>
        <CodeBlock>
          {`// Example usage in a component
import StandupModal from './StandupModal';

const MyComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const currentUser = { id: '1', name: 'John Doe', role: 'Developer', email: 'john@example.com' };
  
  const handleStandupSubmit = (standupData) => {
    setShowModal(false);
    // Process the standupData
    console.log('Standup submitted:', standupData);
  };
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>Submit Standup</button>
      
      {showModal && (
        <StandupModal
          teammate={currentUser}
          onClose={handleStandupSubmit}
          isEntering={true}
        />
      )}
    </>
  );
};`}
        </CodeBlock>
      </DocSection>
    </DocsContainer>
  );
};

export default StandupModalDocs;

