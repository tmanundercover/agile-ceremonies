import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import App from "./App";
const CustomElement = ({ displayName = `Your Widget's Title`, }) => {
    return (React.createElement(App, null));
};
const customElement = reactToWebComponent(CustomElement, React, ReactDOM, {
    props: {
        displayName: 'string',
    },
});
export default customElement;
