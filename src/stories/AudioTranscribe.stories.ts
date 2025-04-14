import type {Meta, StoryObj} from '@storybook/react';
import AudioTranscriber
  from "../site/widgets/custom-elements/nat-ceo-thn/components/audio-transcriber/AudioTranscriber";


const meta: Meta<typeof AudioTranscriber> = {
  title: "Apps In Progress/Audio Transcriber",
  component: AudioTranscriber,
};

type Story = StoryObj<typeof AudioTranscriber>;
export default meta;

export const AudioTranscriberComplete: Story = {
  args: {
  },
};