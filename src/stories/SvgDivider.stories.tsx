import type { Meta, StoryObj } from '@storybook/react';
import SvgDivider from "../site/widgets/custom-elements/svg-divider/components/SvgDivider";


const meta = {
  title: "Apps In Progress/SVG Divider",
  component: SvgDivider,
} satisfies Meta<typeof SvgDivider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};