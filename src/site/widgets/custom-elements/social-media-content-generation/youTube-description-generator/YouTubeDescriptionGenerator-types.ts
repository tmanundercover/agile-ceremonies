export interface YouTubeDescriptionGeneratorProps {
  initialText?: string;
}

export interface TagType {
  tagTitle: string;
  _id: string;
}

export interface DescriptionResponseType {
  description: string;
  title: string;
  tags: string[];
  commaDelimitedTags: string;
  error?: string;
}

export interface ContainerStyleType {
  backgroundColor: string;
}
