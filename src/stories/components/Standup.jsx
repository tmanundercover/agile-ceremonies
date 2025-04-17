import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StandupModal from "../../site/widgets/custom-elements/pair-programming/standup/StandupModal";

export const StandupContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
`;

const CountdownTitle = styled.h3`
  margin-top: 0;
  color: white;
  font-size: 18px;
`;

const StandupDate = styled.div`
  font-size: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
`;

const TimerDisplay = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
  color: ${props => props.isLate ? '#EF4444' : 'white'};
  display: flex;
  justify-content: space-between;
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const TimeValue = styled.span`
  font-size: 2rem;
`;

const TimeLabel = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.8;
  margin-top: 0.25rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  background-color: ${props => props.isLate ? '#EF4444' : 'white'};
  color: ${props => props.isLate ? 'white' : '#9333EA'};
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  flex-grow: 2;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.isLate ? '#DC2626' : '#F9FAFB'};
    transform: translateY(-2px);
  }
`;

const ResetButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: ${props => props.isLate ? 'block' : 'none'};

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const StatusMessage = styled.p`
  margin: 0.5rem 0;
  font-style: italic;
  color: ${props => props.isLate ? '#FECACA' : 'rgba(255, 255, 255, 0.8)'};
`;

const Standup = ({ hours, minutes, period }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isLate, setIsLate] = useState(false);
  const [nextStandupDate, setNextStandupDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: '1',
    name: 'Current User',
    email: 'user@example.com',
    role: 'Developer',
    avatarUrl: ''
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const standupTime = new Date();
      
      // Convert hours to 24-hour format
      let standupHours = parseInt(hours);
      if (period.toLowerCase() === 'pm' && standupHours !== 12) {
        standupHours += 12;
      } else if (period.toLowerCase() === 'am' && standupHours === 12) {
        standupHours = 0;
      }
      
      standupTime.setHours(standupHours);
      standupTime.setMinutes(parseInt(minutes));
      standupTime.setSeconds(0);
      
      // If standup time is already past today, set it for tomorrow
      if (now > standupTime) {
        standupTime.setDate(standupTime.getDate() + 1);
        setIsLate(true);
        return Math.floor((now - (new Date(now.getFullYear(), now.getMonth(), now.getDate(), standupHours, parseInt(minutes), 0))) / 1000);
      } else {
        setIsLate(false);
        setNextStandupDate(standupTime);
        return Math.floor((standupTime - now) / 1000);
      }
    };
    
    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());
    
    // Update every second
    const timerId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [hours, minutes, period]);
  
  const formatTime = (seconds) => {
    if (seconds === null) return { h: "00", m: "00", s: "00" };
    
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    const pad = (num) => num.toString().padStart(2, '0');
    return { h: pad(h), m: pad(m), s: pad(s) };
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleModalClose = (data) => {
    setShowModal(false);
    if (data.name) { // Only consider it submitted if there's a name (not cancelled)
      // Process the submitted data
      console.log('Standup data submitted:', data);
      alert("Standup submitted successfully!");
    }
  };
  
  const handleReset = () => {
    setIsLate(false);
    setTimeRemaining(0);
  };

  const time = formatTime(timeRemaining);

  return (
    <StandupContainer>
      <CountdownTitle>Next Daily Standup at {hours}:{minutes.toString().padStart(2, '0')} {period}</CountdownTitle>
      <StandupDate>{formatDate(nextStandupDate)}</StandupDate>

      <TimerDisplay isLate={isLate}>
        <TimeUnit>
          <TimeValue>{time.h}</TimeValue>
          <TimeLabel>hours</TimeLabel>
        </TimeUnit>
        <TimeUnit>
          <TimeValue>{time.m}</TimeValue>
          <TimeLabel>minutes</TimeLabel>
        </TimeUnit>
        <TimeUnit>
          <TimeValue>{time.s}</TimeValue>
          <TimeLabel>seconds</TimeLabel>
        </TimeUnit>
      </TimerDisplay>
      
      <StatusMessage isLate={isLate}>
        {isLate 
          ? "You're late for standup! Please submit now." 
          : "Time remaining until standup"}
      </StatusMessage>
      
      <ButtonContainer>
        <SubmitButton 
          isLate={isLate} 
          onClick={handleSubmit}
        >
          {isLate ? "Submit Standup NOW!" : "Submit Standup"}
        </SubmitButton>
        
        <ResetButton 
          isLate={isLate}
          onClick={handleReset}
        >
          Reset
        </ResetButton>
      </ButtonContainer>

      {showModal && (
        <StandupModal
          teammate={currentUser}
          onClose={handleModalClose}
          isEntering={true}
        />
      )}
    </StandupContainer>
  );
};

export default Standup;

