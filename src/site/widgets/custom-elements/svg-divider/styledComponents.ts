import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    .thumbnail-enter {
        opacity: 0;
        transform: scale(0.9);
    }
    .thumbnail-enter-active {
        opacity: 1;
        transform: scale(1);
        transition: opacity 300ms, transform 300ms;
    }
    .thumbnail-exit {
        opacity: 1;
        transform: scale(1);
    }
    .thumbnail-exit-active {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 300ms, transform 300ms;
    }
`;

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    font-family: 'Roboto', sans-serif;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    &.dark {
        background-color: #333;
        color: #f9f9f9;
    }

    .main-content {
        flex: 1;
        padding: 20px;
        margin-left: 0;
        overflow: auto;
    }

    .thumbnails-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 20px;
    }
`;

export const InputSection = styled.div`
    margin-bottom: 20px;

    label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
    }

    input {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }

    .dark & {
        input {
            background-color: #555;
            color: #f9f9f9;
            border-color: #444;
        }
    }
`;

export const Button = styled.button`
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    background-color: ${props => (props.disabled ? '#ccc' : '#007BFF')};
    color: white;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => (props.disabled ? '#ccc' : '#0056b3')};
    }

    &:disabled {
        cursor: not-allowed;
    }

    .dark & {
        background-color: ${props => (props.disabled ? '#555' : '#0056b3')};
    }
`;

export const Error = styled.p`
    color: red;
    margin-top: 10px;

    .dark & {
        color: #ff6b6b;
    }
`;

export const Thumbnail = styled.img`
    border: 2px solid gray;
    margin: 5px;
    cursor: pointer;
    width: 150px;
    height: 150px;
    object-fit: cover;
    transition: border-color 0.3s;

    &.selected {
        border-color: blue;
    }

    &:hover {
        border-color: #007BFF;
    }

    .dark & {
        border-color: #888;

        &.selected {
            border-color: #1e90ff;
        }

        &:hover {
            border-color: #1e90ff;
        }
    }

    &.disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;

export const SubThumbnailsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
`;

export const SelectedThumbnail = styled.img`
    border: 2px solid blue;
    margin: 5px;
    cursor: pointer;
    width: 150px;
    height: 150px;
    object-fit: cover;
    transition: border-color 0.3s;

    &:hover {
        border-color: #007BFF;
    }

    .dark & {
        border-color: #1e90ff;

        &:hover {
            border-color: #1e90ff;
        }
    }
`;

export const OutputSection = styled.div`
    text-align: left;

    img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100px;
        margin: 5px;
        border: 1px solid #ddd;
    }

    .dark & {
        img {
            border-color: #555;
        }
    }
`;

export const SvgPreview = styled.div`
    width: 100%;
    height: auto;
    overflow: auto;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    touch-action: none;
    transform-origin: center;
    background-color: white;
    border-radius: 8px;

    svg {
        max-width: 100%;
        height: auto;
    }

    .dark & {
        background-color: #444;
        border-color: #555;
    }
`;

export const SvgPreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    flex: 1;
`;

export const SvgPreviewTitle = styled.h2`
    margin-bottom: 10px;
    text-align: center;
    font-weight: bold;
    color: #333;

    .dark & {
        color: #f9f9f9;
    }
`;

export const SettingsButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    svg {
        width: 24px;
        height: 24px;
        fill: ${props => (props.theme === 'dark' ? '#f9f9f9' : '#333')};
    }
`;

export const Sidebar = styled.div`
    width: 200px;
    background-color: #f9f9f9;
    padding: 20px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    border-right: 2px solid #ddd;
    transition: background-color 0.3s, border-color 0.3s;

    .dark & {
        background-color: #333;
        color: #f9f9f9;
        border-color: #555;
    }

    .thumbnails-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }
`;

export const SelectedThumbnailsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    margin-top: 20px;

    img {
        margin-bottom: 10px;
    }
`;

export const Modal = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
    &.open {
        transform: translateY(0);
    }
    .dark & {
        background-color: #333;
    }
`;

export const ModalContent = styled.div`
    padding: 20px;
    max-height: 300px;
    overflow-y: auto;
`;

export const ModalToggle = styled.button`
    position: fixed;
    bottom: 10px;
    right: 10px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;

    .dark & {
        background-color: #0056b3;
    }
`;

export const Badge = styled.span`
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 5px 10px;
    margin-left: 10px;
    font-size: 14px;
`;

export const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px;
    overflow: auto;

    .dark & {
        background-color: #444;
        color: #f9f9f9;
    }
`;

export const SelectedThumbnailsSection = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: #f9f9f9;
    border-left: 2px solid #ddd;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    padding: 20px;
    overflow-y: auto;

    &.open {
        transform: translateX(0);
    }

    .dark & {
        background-color: #333;
        color: #f9f9f9;
        border-color: #555;
    }
`;

export const SubThumbnailsFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #f9f9f9;
    border-top: 1px solid #ddd;

    .dark & {
        background-color: #333;
        border-color: #555;
    }
`;

