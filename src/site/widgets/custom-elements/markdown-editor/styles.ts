import styled from 'styled-components';
import { Theme } from './theme';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 100vh;
  min-height: 100px;
`;

export const Toolbar = styled.div`
  padding: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  color: #ff4444;
`;

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TopSection = styled.div`
  display: flex;
  gap: 16px;
  height: 50vh;
  min-height: 500px;
`;

export const FragmentManagement = styled.div`
  width: 300px;
  background: #2d2d2d;
  padding: 16px;
  border-right: 1px solid #404040;
`;

export const FragmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
`;

export const FragmentItem = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.medium};
  padding: ${props => props.theme.spacing.medium};
  background: ${props => props.theme.colors.secondary};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: ${props => props.theme.borderRadius};
`;

export const FragmentType = styled.span`
  background: #505050;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
`;

export const FragmentPreview = styled.span`
  flex: 1;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RemoveFragmentButton = styled.button`
  background: none;
  border: none;
  color: #808080;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #ff4444;
  }
`;

export const EditorPane = styled.div`
  flex: 1;
`;

export const PreviewPane = styled.div`
  flex: 1;
  margin-top: 16px;
  max-height: 50vh;
  overflow-y: auto;
`;

export const EditorWrapper = styled.div`
  border: 1px solid #404040;
  border-radius: 4px;
`;

export const Preview = styled.div`
  padding: 16px;
  background: #2d2d2d;
  border: 1px solid #404040;
  border-radius: 4px;
`;

export const SectionTitle = styled.h2`
  margin-bottom: 16px;
`;

export const ActionButton = styled.button<{ theme: Theme }>`
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid ${props => props.theme.colors.actionBorder};
  background-color: ${props => props.theme.colors.actionBg};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  font-size: 14px;
  transition: ${props => props.theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => props.theme.colors.actionBgHover};
  }

  svg {
    margin-right: ${props => props.theme.spacing.medium};
  }
`;

export const StyledSelect = styled.select<{ theme: Theme }>`
  padding: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.medium};
`;

export const StyledTextArea = styled.textarea<{ theme: Theme }>`
  padding: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  width: 100%;
  min-height: 100px;
  margin-bottom: ${props => props.theme.spacing.medium};
  resize: vertical;
`;

export const FragmentForm = styled.form<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.large};
`;

export const PreviewContainer = styled.div`
  svg {
    cursor: pointer;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

