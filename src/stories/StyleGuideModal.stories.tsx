import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StyleGuideModal } from "../site/widgets/custom-elements/nat-ceo-thn/components/landing-page-builder/components/StyleGuideModal";

const meta = {
  title: "Apps In Progress/Landing Page Builder/Style Guide Modal",
  component: StyleGuideModal,
  args: {
    styleGuide: {
      primaryColor: "#9333EA",
      secondaryColor: "#A855F7",
      fontFamily: "Roboto, sans-serif",
      spacing: 16,
      borderRadius: 8,
    },
    onClose: () => console.log("Modal closed"),
    onSave: (newStyleGuide) => console.log("Saved style guide:", newStyleGuide),
  },
} satisfies Meta<typeof StyleGuideModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
