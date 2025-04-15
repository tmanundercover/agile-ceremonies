import type { Meta, StoryObj } from '@storybook/react';
import {
  LandingPageBuilder
} from "../site/widgets/custom-elements/nat-ceo-thn/components/landing-page-builder/LandingPageBuilder";
import AILandingPage
  from "../site/widgets/custom-elements/nat-ceo-thn/components/landing-page-with-animated-icon/Landing-Page-with-animated-icon";
import React from "react";

const meta = {
  title: "Apps In Progress/Landing Page - AI",
} satisfies Meta<typeof AILandingPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullLandingPage: Story = {
  render: () => {
    return (
      <AILandingPage />
    );
  }
};
