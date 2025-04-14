import type { Meta, StoryObj } from '@storybook/react';
import {
  LandingPageBuilder
} from "../site/widgets/custom-elements/nat-ceo-thn/components/landing-page-builder/LandingPageBuilder";


const meta = {
  title: "Apps In Progress/Landing Page Builder",
  component: LandingPageBuilder,
} satisfies Meta<typeof LandingPageBuilder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};