import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

export interface Message {
  id: string;
  sender: {
    name: string;
    type: 'user' | 'ai' | 'system';
    avatarUrl?: string;
  };
  content: string;
  timestamp: Date;
}

interface ChatLogProps {
  messages: Message[];
  title?: string;
}

const ChatLogContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.neutral200};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.neutral500};
    border-radius: 3px;
    
    &:hover {
      background-color: ${theme.colors.neutral700};
    }
  }
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
  width: 100%;
  box-sizing: border-box;
`;

const ChatTitle = styled.h2`
  font-size: ${theme.typography.heading3.fontSize};
  margin-top: 0;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.primary};
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: -4px;
    left: 0;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

const ChatCounter = styled.span`
  font-size: 13px;
  color: ${theme.colors.neutral700};
  background-color: ${theme.colors.neutral200};
  padding: 2px 8px;
  border-radius: 12px;
  white-space: nowrap;
`;

interface MessageProps {
  $type: 'user' | 'ai' | 'system';
}

const getMessageColor = (type: 'user' | 'ai' | 'system') => {
  switch (type) {
    case 'user':
      return theme.colors.info;
    case 'ai':
      return theme.colors.primary;
    case 'system':
      return theme.colors.neutral700;
    default:
      return theme.colors.neutral700;
  }
};

const MessageBubble = styled.div<MessageProps>`
  padding: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  background-color: ${props => `${getMessageColor(props.$type)}10`};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.shadows.sm};
  border-left: 3px solid ${props => getMessageColor(props.$type)};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  box-sizing: border-box;
  
  &:hover {
    transform: translateX(3px);
    box-shadow: ${theme.shadows.md};
  }
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};
`;

const SenderInfo = styled.div<MessageProps>`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${props => getMessageColor(props.$type)};
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${theme.colors.neutral300};
  margin-right: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Timestamp = styled.div`
  font-size: 11px;
  color: ${theme.colors.neutral700};
`;

const MessageContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${theme.colors.textColor};
  white-space: pre-wrap;
  word-break: break-word;
`;

const EmptyChatLog = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  color: ${theme.colors.neutral500};
  font-style: italic;
  border: 1px dashed ${theme.colors.neutral300};
  border-radius: ${theme.borderRadius};
  margin-top: ${theme.spacing.md};
  box-sizing: border-box;
  width: 100%;
`;

const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const ChatLog: React.FC<ChatLogProps> = ({ messages, title = "Agent Communication" }) => {
  return (
    <ChatLogContainer>
      <ChatHeader>
        <ChatTitle>{title}</ChatTitle>
        <ChatCounter>{messages.length} messages</ChatCounter>
      </ChatHeader>

      {messages.length > 0 ? (
        messages.map(message => (
          <MessageBubble key={message.id} $type={message.sender.type}>
            <MessageHeader>
              <SenderInfo $type={message.sender.type}>
                <Avatar>
                  {message.sender.avatarUrl ? (
                    <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} />
                  ) : (
                    getInitials(message.sender.name)
                  )}
                </Avatar>
                {message.sender.name}
              </SenderInfo>
              <Timestamp>{formatTimestamp(message.timestamp)}</Timestamp>
            </MessageHeader>
            <MessageContent>{message.content}</MessageContent>
          </MessageBubble>
        ))
      ) : (
        <EmptyChatLog>No messages available</EmptyChatLog>
      )}
    </ChatLogContainer>
  );
};

export default ChatLog;
