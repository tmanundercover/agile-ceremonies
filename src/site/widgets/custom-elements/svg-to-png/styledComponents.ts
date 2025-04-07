import styled from "styled-components";

export const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    color: #000000;
    
    .container {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    
    .editor-section {
        width: 100%;
        height: 300px;
        min-height: 200px;
        max-height: 40vh;
        padding: 16px;
        border-bottom: 1px solid #e0e0e0;
        overflow: hidden;
        
        .code-editor {
            height: 100%;
            position: relative;
            
            pre {
                margin: 0;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                padding: 12px;
                background: transparent;
                pointer-events: none;
                overflow: hidden;
                white-space: pre-wrap;
                word-wrap: break-word;
                box-sizing: border-box;
                
                code {
                    background: transparent;
                    pointer-events: none;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    display: block;
                    width: 100%;
                }
            }
            
            textarea {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                resize: none;
                padding: 12px;
                border: 1px solid #e0e0e0;
                border-radius: 4px;
                background: transparent;
                font-family: 'Fira Code', monospace;
                font-size: 14px;
                line-height: 1.5;
                color: transparent;
                caret-color: #000;
                white-space: pre-wrap;
                word-wrap: break-word;
                overflow-wrap: break-word;
                z-index: 1;
                box-sizing: border-box;
                overflow: auto;
                
                &::selection {
                    background: rgba(74, 144, 226, 0.2);
                }
            }
        }
    }
    
    .preview-section {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    
    .tab-navigation {
        padding: 16px 16px 0;
        background: #f8f9fa;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .tab-list {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding-bottom: 1px;
    }
    
    .tab-button {
        padding: 8px 16px;
        border: 1px solid #e0e0e0;
        border-bottom: none;
        background: #f8f9fa;
        border-radius: 4px 4px 0 0;
        cursor: pointer;
        white-space: nowrap;
        
        &.active {
            background: #ffffff;
            border-bottom: 2px solid #4a90e2;
            margin-bottom: -1px;
        }
        
        &:hover:not(.active) {
            background: #e9ecef;
        }
    }
    
    .tab-content-container {
        flex: 1;
        overflow: auto;
        padding: 16px;
        height: calc(100vh - 300px);
    }
`;

export const CodeBlock = styled.pre`
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 16px;
    margin: 8px 0;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 14px;
    line-height: 1.5;
    
    .token.comment { color: #6a737d; }
    .token.keyword { color: #d73a49; }
    .token.string { color: #032f62; }
    .token.function { color: #6f42c1; }
    .token.operator { color: #005cc5; }
    .token.punctuation { color: #24292e; }
`;

export const CodeContainer = styled.div`
    position: relative;
    margin: 16px 0;
    overflow: hidden;
    
    &:hover .copy-button {
        opacity: 1;
    }
`;

export const ButtonContainer = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }

  svg {
    width: 18px;
    height: 18px;
    fill: #4a90e2;
  }

  .parent-container:hover & {
    opacity: 1;
  }
`;

export const PreviewContainer = styled.div`
    overflow: auto;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 16px;
    margin: 16px 0;
    height: calc(100vh - 200px);
    background: #f8f8f8;
    position: relative;
    
    &:hover .copy-button {
        opacity: 1;
    }
    
    .preview-controls {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 16px;
    }
    
    .svg-preview {
        width: 100%;
        height: calc(100% - 50px);
        overflow: auto;
        touch-action: manipulation;
    }
`;

export const PngPreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 16px;
    height: calc(100vh - 200px);
    overflow: hidden;
    
    .preview-container {
        width: 100%;
        height: calc(100% - 60px);
        overflow: auto;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 16px;
        background: white;
        
        img {
            max-width: 100%;
            height: auto;
            touch-action: manipulation;
        }
    }
    
    .download-button {
        padding: 8px 16px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        
        &:hover {
            background: #45a049;
        }
    }
`;

export const ConversionsForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

export const ConversionItem = styled.div`
    background: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
`;

export const ConversionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #eef1f5;

    h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #2d3748;
    }

    .actions {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .size-info {
        color: #718096;
        font-size: 14px;
        font-weight: 500;
        background: #f7fafc;
        padding: 4px 12px;
        border-radius: 20px;
    }
`;

export const ConversionContent = styled.pre`
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    padding-right: 48px;
    margin: 0;
    overflow-y: hidden;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 14px;
    line-height: 1.6;
    color: #4a5568;
    height: 2.4em;
    min-height: 2.4em;
    max-height: 2.4em;
    white-space: nowrap;
    position: relative;
    
    &:hover {
        border-color: #cbd5e0;
    }

    &::-webkit-scrollbar {
        width: 0;
        height: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: transparent;
    }

    &:hover::-webkit-scrollbar-thumb {
        background: #cbd5e0;
        border-radius: 3px;
    }
`;

export const DiagnosticsContainer = styled.div`
    .diagnostics-panel {
        padding: 16px;
        background: #f8f9fa;
        border-radius: 8px;
        
        h3 {
            margin-top: 0;
            margin-bottom: 16px;
            color: #212529;
        }
    }

    .diagnostics-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
        
        > div {
            padding: 8px;
            border-radius: 4px;
            background: #ffffff;
        }
    }

    .success {
        color: #28a745;
    }

    .error {
        color: #dc3545;
    }

    .cleaned-svg {
        pre {
            background: #f8f9fa;
            padding: 12px;
            border-radius: 4px;
            overflow-x: auto;
        }
    }

    .operations-log {
        h4 {
            margin-top: 0;
            margin-bottom: 8px;
        }
        
        > div {
            margin-bottom: 8px;
            padding: 8px;
            border-radius: 4px;
            background: #f8f9fa;
        }
    }

    .download-log-button {
        margin-top: 16px;
        padding: 12px 24px;
        background: linear-gradient(to bottom, #4a90e2, #357abd);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
        
        &:hover {
            background: linear-gradient(to bottom, #357abd, #2a609e);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            transform: translateY(-1px);
        }
        
        &:active {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
    }
`;

