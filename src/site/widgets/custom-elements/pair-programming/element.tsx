import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import PairProgrammingWrapper from './PairProgrammingWrapper';

interface Props {
  displayName?: string;
}

const CustomElement: FC<Props> = ({
                                      displayName = `Your Widget's Title`,
                                  }) => {
  return (
    <>
        {/*hi*/}
        <PairProgrammingWrapper />
        </>
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
