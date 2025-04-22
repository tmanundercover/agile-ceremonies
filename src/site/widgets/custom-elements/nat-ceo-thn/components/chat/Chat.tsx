import React, { useState, useRef, useEffect } from 'react';
import { Button, Dialog, Text } from '@radix-ui/themes';
import { ChatButtonStyled, ChatFooterStyled, ChatInputStyled } from "../../styledComponents";
import styled from 'styled-components';
import theme, { aiAgentColors } from '../../../pair-programming/theme';
import { Teammate } from '../../../pair-programming/components/teammate-selector/Teammate.types';

// Styled components for messages
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MessageBubble = styled.div<{ isUser?: boolean; accentColor?: string }>`
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius};
  max-width: 80%;
  box-shadow: ${theme.shadows.sm};
  margin-bottom: ${theme.spacing.sm};
  font-size: 15px;
  line-height: 1.5;
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

const MessageGroup = styled.div<{ isUser?: boolean }>`
  display: flex;
  flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const EnhancedChatButton = styled(ChatButtonStyled)<{ accentColor?: string }>`
  background-color: ${props => props.accentColor || '#6E7B8B'};
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: ${theme.shadows.md};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: transform 0.2s ${theme.animations.easeInOut}, 
              box-shadow 0.2s ${theme.animations.easeInOut};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.shadows.lg};
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const StyledDialogContent = styled(Dialog.Content)`
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.shadows.xl};
  border: 1px solid ${theme.colors.neutral300};
  max-width: 400px !important;
  overflow: hidden;
`;

const ChatHeader = styled(Dialog.Title)<{ accentColor?: string; emoji?: string }>`
  background-color: ${props => props.accentColor || '#6E7B8B'};
  color: white;
  padding: ${theme.spacing.md};
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '${props => props.emoji || '👤'}';
    margin-right: ${theme.spacing.sm};
  }
`;

const EnhancedChatFooter = styled(ChatFooterStyled)`
  padding: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.neutral300};
  background-color: ${theme.colors.neutral100};
`;

const EnhancedChatInput = styled(ChatInputStyled)<{ accentColor?: string }>`
  border-radius: 20px;
  border: 1px solid ${theme.colors.neutral300};
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: ${props => props.accentColor || '#6E7B8B'};
    box-shadow: 0 0 0 2px ${props => props.accentColor ? `${props.accentColor}33` : 'rgba(110, 123, 139, 0.2)'};
  }
`;

const SendButton = styled(Button)<{ accentColor?: string }>`
  background-color: ${props => props.accentColor || '#6E7B8B'} !important;
  border-radius: 20px;
  padding: 0 ${theme.spacing.md};
  
  &:hover {
    background-color: ${props => props.accentColor ? `${props.accentColor}DD` : theme.colors.primaryDark} !important;
  }
`;

const CloseButton = styled(Button)`
  margin: ${theme.spacing.sm} !important;
  align-self: flex-end;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  background-color: white;
`;

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatProps {
    isOpen: boolean;
    onToggle: () => void;
    teammate?: Teammate;
}

export const Chat: React.FC<ChatProps> = ({ isOpen, onToggle, teammate }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Get accent color based on teammate or default
    const getAccentColor = () => {
        if (!teammate) return '#6E7B8B'; // Default color
        const name = teammate.persona.name;
        return (aiAgentColors as Record<string, string>)[name] || '#6E7B8B';
    };

    const accentColor = getAccentColor();

    // Set initial message when teammate changes
    useEffect(() => {
        if (teammate) {
            const initialMessage = `Hi! I'm ${teammate.persona.name}, your ${teammate.persona.role.toLowerCase()}. How can I help you today?`;
            setMessages([{ text: initialMessage, isUser: false }]);
        } else {
            setMessages([{ text: "Hi! I'm your assistant. How can I help you today?", isUser: false }]);
        }
    }, [teammate]);

    // Scroll to bottom of messages when new messages are added
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        // Add user message to chat
        const userMessage = { text: message, isUser: true };
        setMessages(prev => [...prev, userMessage]);

        // Clear input
        setMessage('');

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
                        message: message.trim(),
                        teammate: teammate ? {
                            name: teammate.persona.name,
                            role: teammate.persona.role,
                            capabilities: teammate.persona.capabilities
                        } : null
                    }),
                }
            );

            const data = await response.json();

            // Format the response - replace \n with actual line breaks
            const formattedResponse = data.helpDeskResp.output.replace(/\\n/g, '\n');

            // Add teammate's response to chat
            const teammateMessage = { text: formattedResponse, isUser: false };
            setMessages(prev => [...prev, teammateMessage]);

        } catch (error) {
            console.error('Error sending message:', error);
            // Add error message to chat
            setMessages(prev => [...prev, {
                text: "Sorry, I'm having trouble connecting. Please try again later.",
                isUser: false
            }]);
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

    const getTeammateName = () => teammate?.persona.name || "Assistant";
    const getTeammateInitial = () => teammate?.persona.name.charAt(0) || "A";

    // Role-based emoji
    const getRoleEmoji = () => {
        if (!teammate) return '👤';

        switch(teammate.persona.role) {
            case 'Developer': return '👨‍💻';
            case 'Graphic Designer': return '🎨';
            case 'PM': return '📊';
            case 'Requirements': return '📝';
            case 'CEO': return '👔';
            case 'Testing': return '🧪';
            case 'Dev Ops': return '🔧';
            case 'Async Teammate': return '⏰';
            default: return '👤';
        }
    };

    const emojiForHeader = getRoleEmoji();

    return (
        <>
            <EnhancedChatButton onClick={onToggle} accentColor={accentColor}>
                <span role="img" aria-label={`Chat with ${getTeammateName()}`}>💬</span>
            </EnhancedChatButton>

            {isOpen && (
                <div>
                    <Dialog.Root open={isOpen} onOpenChange={onToggle}>
                        <StyledDialogContent style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '600px',
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px'
                        }}>
                            <ChatHeader
                                accentColor={accentColor}
                                emoji={emojiForHeader}
                            >
                                Chat with {getTeammateName()}
                            </ChatHeader>
                            <ChatMessages>
                                {messages.map((msg, index) => (
                                    <MessageGroup key={index} isUser={msg.isUser}>
                                        <Avatar isUser={msg.isUser} accentColor={accentColor}>
                                            {msg.isUser ? 'You' : getTeammateInitial()}
                                        </Avatar>
                                        <MessageContainer>
                                            <MessageBubble isUser={msg.isUser} accentColor={accentColor}>
                                                {msg.text}
                                            </MessageBubble>
                                        </MessageContainer>
                                    </MessageGroup>
                                ))}
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
                            </ChatMessages>
                            <EnhancedChatFooter>
                                <EnhancedChatInput
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    disabled={isLoading}
                                    accentColor={accentColor}
                                />
                                <SendButton
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !message.trim()}
                                    accentColor={accentColor}
                                >
                                    Send
                                </SendButton>
                            </EnhancedChatFooter>
                            <CloseButton variant="soft" onClick={onToggle}>
                                Close Chat
                            </CloseButton>
                        </StyledDialogContent>
                    </Dialog.Root>
                </div>
            )}
        </>
    );
};

