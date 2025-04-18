import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ChatMessage, Teammate } from '../../models';
import theme from '../../theme';

// Props interface
interface AgentChatSidebarProps {
  selectedTeammate: Teammate | null;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

// Styled components for the chat
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 400px;
  border-top: 1px solid ${theme.colors.neutral400};
  margin-top: ${theme.spacing.md};
`;

const ChatHeader = styled.div`
  padding: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.neutral400};
  font-weight: bold;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
`;

const ChatAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: ${theme.spacing.sm};
  font-size: 12px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const MessageBubble = styled.div<{ $isInbound: boolean }>`
  max-width: 85%;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius};
  background-color: ${props => props.$isInbound ? theme.colors.primary : theme.colors.neutral200};
  color: ${props => props.$isInbound ? 'white' : theme.colors.neutral800};
  align-self: ${props => props.$isInbound ? 'flex-end' : 'flex-start'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow-wrap: break-word;
  word-break: break-word;

  // Create a "speech bubble" tail
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    top: 10px;
    
    ${props => props.$isInbound 
      ? `right: -8px; border-left-color: ${theme.colors.primary};` 
      : `left: -8px; border-right-color: ${theme.colors.neutral200};`}
  }
`;

const MessageSender = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const MessageTime = styled.div`
  font-size: 10px;
  color: ${props => props.color || theme.colors.neutral600};
  text-align: right;
  margin-top: 4px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.neutral400};
`;

const ChatInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.neutral400};
  border-radius: ${theme.borderRadius};
  margin-right: ${theme.spacing.sm};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight};
  }
`;

const SendButton = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius};
  padding: 0 ${theme.spacing.md};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
  
  &:disabled {
    background-color: ${theme.colors.neutral400};
    cursor: not-allowed;
  }
`;

const NoTeammateSelectedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: ${theme.colors.neutral600};
  font-style: italic;
`;

const SystemMessage = styled.div`
  font-size: 12px;
  color: ${theme.colors.neutral600};
  text-align: center;
  margin: ${theme.spacing.xs} 0;
  font-style: italic;
  background-color: ${theme.colors.neutral100};
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius};
`;

// Helper to format the timestamp
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const AgentChatSidebar: React.FC<AgentChatSidebarProps> = ({ 
  selectedTeammate, 
  messages, 
  onSendMessage 
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && onSendMessage) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (!selectedTeammate) {
    return (
      <ChatContainer>
        <NoTeammateSelectedContainer>
          Select a teammate to view chat
        </NoTeammateSelectedContainer>
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatAvatar>{selectedTeammate.name.charAt(0)}</ChatAvatar>
        Chat with {selectedTeammate.name}
      </ChatHeader>
      
      <MessagesContainer>
        {messages.map(message => {
          // For system messages, show them centered
          if (message.sender.type === 'system') {
            return <SystemMessage key={message.id}>{message.content}</SystemMessage>;
          }
          
          // Determine if message is inbound (from an agent) or outbound (from user to agent)
          const isInbound = message.sender.type === 'ai';
          
          return (
            <MessageBubble 
              key={message.id} 
              $isInbound={isInbound}
            >
              <MessageSender>{message.sender.name}</MessageSender>
              {message.content}
              <MessageTime color={isInbound ? 'rgba(255,255,255,0.7)' : undefined}>
                {formatTime(message.timestamp)}
              </MessageTime>
            </MessageBubble>
          );
        })}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <ChatInputContainer>
        <ChatInput
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          aria-label="Message input"
        />
        <SendButton 
          onClick={handleSendMessage}
          disabled={!inputMessage.trim()}
          aria-label="Send message"
        >
          Send
        </SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default AgentChatSidebar;
