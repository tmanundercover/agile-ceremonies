import React from 'react';
import {Button, Dialog, Text} from '@radix-ui/themes';
import {ChatButtonStyled, ChatFooterStyled, ChatInputStyled} from "../../styledComponents";


interface ChatProps {
    isOpen: boolean;
    onToggle: () => void;
}

export const Chat: React.FC<ChatProps> = ({ isOpen, onToggle }) => {
    return (
        <>
            <ChatButtonStyled onClick={onToggle}>
                <span role="img" aria-label="Chat with Josh">💬</span>
            </ChatButtonStyled>

            {isOpen && (
                <Dialog.Root open={isOpen} onOpenChange={onToggle}>
                    <Dialog.Content
                        style={{maxWidth: '500px', display: 'flex', flexDirection: 'column', height: '600px'}}>
                        <Dialog.Title>Chat with Josh</Dialog.Title>
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '16px',
                            display: 'flex',cc
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <div className="message assistant">
                                Hi! I'm Josh, your design assistant. How can I help you with your sticker?
                            </div>
                            {/* Add message history here */}
                        </div>
                        <ChatFooterStyled>
                            <ChatInputStyled
                                placeholder="Type your message..."
                            />
                            <Button>Send</Button>
                        </ChatFooterStyled>
                        <Dialog.Close>
                            <Button variant="soft" style={{margin: '0 16px 16px'}}>
                                Close Chat
                            </Button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Root>
            )}
        </>
    );
};
