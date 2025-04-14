import type {Meta, StoryObj} from '@storybook/react';
import AudioTranscriber
  from "../site/widgets/custom-elements/nat-ceo-thn/components/audio-transcriber/AudioTranscriber";


const meta: Meta<typeof AudioTranscriber> = {
  title: "Apps In Progress/Audio Transcriber",
  component: AudioTranscriber,
};

type Story = StoryObj<typeof AudioTranscriber>;
export default meta;


/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const AudioTranscriberComplete: Story = {
  args: {
  },
};