import React, {useState} from 'react';
import {StyledCodeBlock} from "./styled-components";
import styled from "styled-components";
import theme from "../theme";

export const StyledCodeBlock = styled.div`
    margin: ${theme.spacing.md} 0;
    border-radius: ${theme.borderRadius};
    overflow: hidden;

    .code-header {
        background: ${theme.colors.neutral700};
        color: white;
        padding: ${theme.spacing.xs} ${theme.spacing.md};
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .copy-button {
        background: transparent;
        border: 1px solid white;
        color: white;
        border-radius: 4px;
        padding: 2px 8px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            background: white;
            color: ${theme.colors.neutral700};
        }
    }

    pre {
        margin: 0;
        padding: ${theme.spacing.md};
        background-color: #282c34;
        color: #abb2bf;
        overflow-x: auto;
    }
`;

const CodeBlockStyled = ({language, code}) => {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <StyledCodeBlock>
            <div className="code-header">
                <span className="code-language">{language}</span>
                <button className="copy-button" onClick={copyCode}>
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className={`language-${language}`}>
        <code>{code}</code>
      </pre>
        </StyledCodeBlock>
    );
};

export default CodeBlockStyled;
