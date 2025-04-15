import React, {type FC} from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import styled from 'styled-components';
import AIAgentCompass from "./components/ai-agent-compass/AIAgentCompass";
import AudioTranscriber from "./components/Audio Transcriber/AudioTranscriber";
import {LandingPageBuilder} from "./components/landing-page-builder/LandingPageBuilder";

const WidgetContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

interface Props {
  displayName?: string;
}

const CustomElement: FC<Props> = ({
  displayName = `Your Widget's Title`,
}) => {
  return (
    <WidgetContainerStyled>
      <LandingPageBuilder/>
    </WidgetContainerStyled>
  );
};

const customElement = reactToWebComponent(
  CustomElement,
  React,
  ReactDOM as any,
  {
    props: {
      displayName: 'string',
    },
  }
);

export default customElement;
