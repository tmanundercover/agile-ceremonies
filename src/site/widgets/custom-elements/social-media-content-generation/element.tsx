import React, { type FC } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import styles from './element.module.css';
import styled from "styled-components";
import App from "./App";

interface Props {
  displayName?: string;
}

const WidgetContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const CustomElement: FC<Props> = ({
  displayName = `Your Widget's Title`,
}) => {
  return (
      <WidgetContainerStyled><App/></WidgetContainerStyled>
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
