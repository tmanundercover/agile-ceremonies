import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChatMessage } from '../../models';
import theme, { aiAgentColors } from '../../theme';
import { Teammate } from '../../components/teammate-selector/Teammate.types';
import { Button } from '@radix-ui/themes';

// Props interface
interface AgentChatSidebarProps {
  selectedTeammate: Teammate | null;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

// Styled components for the chat with enhanced styling
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0; /* Critical for flex child to shrink properly */
  border: 1px solid ${theme.colors.neutral300};
  border-radius: ${theme.borderRadius};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  background-color: white;
  margin-top: ${theme.spacing.md};
`;

const ChatHeader = styled.div<{ accentColor?: string }>`
  padding: ${theme.spacing.md};
  background-color: ${props => props.accentColor || '#6E7B8B'};
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 16px;
  
  &:before {
    content: '💬';
    margin-right: ${theme.spacing.sm};
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  min-height: 0; /* Allow container to shrink */
  overflow-y: auto;
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm}; /* Reduce gap to fit more messages */
  background-color: #f8f9fa;
`;

// Message group with avatar
const MessageGroup = styled.div<{ isUser?: boolean }>`
  display: flex;
  flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
  align-items: flex-start;
  margin-bottom: ${theme.spacing.sm}; /* Reduce spacing */
`;

const Avatar = styled.div<{ isUser?: boolean; accentColor?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: ${props => props.isUser ? '0' : theme.spacing.sm};
  margin-left: ${props => props.isUser ? theme.spacing.sm : '0'};
  background-color: ${props => props.isUser ? theme.colors.primaryLight : props.accentColor || '#6E7B8B'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MessageBubble = styled.div<{ isUser?: boolean; accentColor?: string }>`
  padding: ${theme.spacing.sm}; /* Reduce padding */
  border-radius: ${theme.borderRadius};
  max-width: 80%;
  box-shadow: ${theme.shadows.sm};
  margin-bottom: ${theme.spacing.xs}; /* Reduce spacing */
  font-size: 14px; /* Smaller font */
  line-height: 1.4;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.isUser ? theme.colors.primary : '#f8f9fa'};
  color: ${props => props.isUser ? 'white' : theme.colors.textColor};
  border: 1px solid ${props => props.isUser ? 'transparent' : theme.colors.neutral300};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    ${props => props.isUser ? 'right: -8px' : 'left: -8px'};
    width: 16px;
    height: 16px;
    transform: translateY(50%) rotate(45deg);
    background-color: ${props => props.isUser ? theme.colors.primary : '#f8f9fa'};
    border: 1px solid ${props => props.isUser ? 'transparent' : theme.colors.neutral300};
    border-top: 0;
    border-left: ${props => props.isUser ? '0' : '1px solid ' + theme.colors.neutral300};
    border-right: ${props => props.isUser ? '1px solid transparent' : '0'};
    z-index: 0;
  }
`;

const MessageTime = styled.div`
  font-size: 11px;
  color: ${props => props.color || theme.colors.neutral600};
  text-align: right;
  margin-top: 4px;
`;

const ChatFooter = styled.div`
  padding: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.neutral300};
  background-color: ${theme.colors.neutral100};
  display: flex;
  gap: ${theme.spacing.sm};
`;

const ChatInput = styled.input<{ accentColor?: string }>`
  flex: 1;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 20px;
  border: 1px solid ${theme.colors.neutral300};
  transition: border-color 0.2s ease;
  font-size: 15px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.accentColor || '#6E7B8B'};
    box-shadow: 0 0 0 2px ${props => props.accentColor ? `${props.accentColor}33` : 'rgba(110, 123, 139, 0.2)'};
  }
`;

const SendButton = styled(Button)<{ accentColor?: string }>`
  background-color: ${props => props.accentColor || '#6E7B8B'} !important;
  border-radius: 20px;
  padding: 0 ${theme.spacing.md};
  color: white;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.accentColor ? `${props.accentColor}DD` : theme.colors.primaryDark} !important;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const NoTeammateSelectedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${theme.colors.neutral600};
  font-style: italic;
  background-color: #f8f9fa;
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
  const [isLoading, setIsLoading] = useState(false);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update local messages when external messages change
  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [localMessages]);

  // Get accent color based on teammate
  const getAccentColor = () => {
    if (!selectedTeammate) return '#6E7B8B'; // Default color
    const name = selectedTeammate.persona.name;
    return (aiAgentColors as Record<string, string>)[name] || '#6E7B8B';
  };

  const accentColor = getAccentColor();

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedTeammate) return;

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'User', type: 'user' },
      content: inputMessage,
      timestamp: new Date()
    };

    setLocalMessages(prev => [...prev, userMessage]);

    // Clear input
    setInputMessage('');

    // Set loading state
    setIsLoading(true);

    try {
      // Call the API with teammate information
      const response = await fetch(
        'http://127.0.0.1:5001/youtube-and-other-connections/us-central1/handleHelpDeskRequest',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage.content,
            teammate: selectedTeammate ? {
              name: selectedTeammate.persona.name,
              role: selectedTeammate.persona.role,
              capabilities: selectedTeammate.persona.capabilities
            } : null
          }),
        }
      );

      const data = await response.json();

      // Format the response - replace \n with actual line breaks
      const formattedResponse = data.helpDeskResp.output.replace(/\\n/g, '\n');

      // Add teammate's response to chat
      const teammateMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: {
          name: selectedTeammate.persona.name,
          type: 'ai'
        },
        content: formattedResponse,
        timestamp: new Date()
      };

      setLocalMessages(prev => [...prev, teammateMessage]);

      // Call parent onSendMessage to maintain app state
      if (onSendMessage) {
        onSendMessage(userMessage.content);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: {
          name: 'System',
          type: 'system'
        },
        content: "Sorry, I'm having trouble connecting. Please try again later.",
        timestamp: new Date()
      };

      setLocalMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTeammateInitial = () => selectedTeammate?.persona.name.charAt(0) || "A";

  if (!selectedTeammate) {
    return (
      <ChatContainer>
        <NoTeammateSelectedContainer>
          Select a teammate to chat
        </NoTeammateSelectedContainer>
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      <ChatHeader accentColor={accentColor}>
        Chat with {selectedTeammate.persona.name}
      </ChatHeader>
      
      <MessagesContainer>
        {localMessages.map(message => {
          // For system messages, show them centered
          if (message.sender.type === 'system') {
            return <SystemMessage key={message.id}>{message.content}</SystemMessage>;
          }
          
          // Determine if message is from user or AI
          const isUser = message.sender.type === 'user';
          
          return (
            <MessageGroup key={message.id} isUser={isUser}>
              <Avatar isUser={isUser} accentColor={accentColor}>
                {isUser ? 'You' : getTeammateInitial()}
              </Avatar>
              <MessageContainer>
                <MessageBubble isUser={isUser} accentColor={accentColor}>
                  {message.content}
                  <MessageTime color={isUser ? 'rgba(255,255,255,0.7)' : undefined}>
                    {formatTime(message.timestamp)}
                  </MessageTime>
                </MessageBubble>
              </MessageContainer>
            </MessageGroup>
          );
        })}

        {isLoading && (
          <MessageGroup isUser={false}>
            <Avatar isUser={false} accentColor={accentColor}>
              {getTeammateInitial()}
            </Avatar>
            <MessageContainer>
              <MessageBubble isUser={false}>
                <span>Thinking...</span>
              </MessageBubble>
            </MessageContainer>
          </MessageGroup>
        )}

        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <ChatFooter>
        <ChatInput
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
          accentColor={accentColor}
        />
        <SendButton 
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
          accentColor={accentColor}
        >
          Send
        </SendButton>
      </ChatFooter>
    </ChatContainer>
  );
};

export default AgentChatSidebar;

