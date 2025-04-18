import React, { type FC } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import styles from './element.module.css';
import App from "./App";
import { AppContainer } from './styledComponents';

interface Props {
  displayName?: string;
}

const CustomElement: FC<Props> = ({
  displayName = `Your Widget's Title`,
}) => {
  return (
      <AppContainer><App /></AppContainer>
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
