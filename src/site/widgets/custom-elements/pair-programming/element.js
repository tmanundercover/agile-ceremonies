import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import PairProgrammingWrapper from './PairProgrammingWrapper';
const CustomElement = ({ displayName = `Your Widget's Title`, }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(PairProgrammingWrapper, null)));
};
const customElement = reactToWebComponent(CustomElement, React, ReactDOM, {
    props: {
        displayName: 'string',
    },
});
export default customElement;
