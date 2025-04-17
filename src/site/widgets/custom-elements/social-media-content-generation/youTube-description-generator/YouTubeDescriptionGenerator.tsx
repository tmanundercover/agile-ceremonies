import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './YouTubeDescriptionGenerator.css';
import { getYoutubeDescriptionResponse } from '../../../../../backend/get-description.web';
import {
  YouTubeDescriptionGeneratorContainerStyled,
  TextAreaStyled,
  GenerateButtonStyled,
  LoaderContainerStyled,
  ResultContainerStyled,
  TitleStyled,
  DescriptionTextStyled,
  TagsContainerStyled,
  TagStyled,
  CommaDelimitedTagsContainerStyled,
  LoaderStyled,
} from './YouTubeDescriptionGenerator-styled-components';

interface Tag {
  tagTitle: string;
  _id: string;
}

interface DescriptionResponse {
  description: string;
  title: string;
  tags: string[];
  commaDelimitedTags: string;
  error?: string;
}

const YouTubeDescriptionGenerator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [descriptionText, setDescriptionText] = useState('Let me help you plan your day. Please enter your tasks for today, one per line above. I\'ll tell you what order and times you should do them.');
  const [title, setTitle] = useState('');
  const [commaDelimitedTags, setCommaDelimitedTags] = useState('');
  const [showTags, setShowTags] = useState(false);
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({ backgroundColor: 'black' });

  const handleSuccess = (response: DescriptionResponse) => {
    setContainerStyle({ backgroundColor: '#06ac06' });
    setDescriptionText(response.description);
    setCommaDelimitedTags(response.commaDelimitedTags);
    setTitle(`Title: ${response.title}`);
    setTags(response.tags.map(tag => ({ tagTitle: tag, _id: uuidv4() })));
    setShowTags(true);
  };

  const handleError = (errorMessage: string) => {
    setContainerStyle({ backgroundColor: '#a80808' });
    setDescriptionText(`My apologies. Please try to generate again because an error has occurred: ${errorMessage}`);
    setShowTags(false);
    setTags([]);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setContainerStyle({ backgroundColor: 'black' });
    setDescriptionText('');

    try {
      const response = await getYoutubeDescriptionResponse(inputText, {});

      if (response.error) {
        handleError(response.error);
      } else {
        handleSuccess(response);
      }
    } catch (e) {
      const error = e as Error;
      console.error("Error:", error.message);
      handleError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <YouTubeDescriptionGeneratorContainerStyled>
      <TextAreaStyled
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your text here"
      />

      <GenerateButtonStyled onClick={handleGenerate} disabled={isLoading}>
        Generate Description
      </GenerateButtonStyled>

      {isLoading && (
        <LoaderContainerStyled>
          <LoaderStyled />
        </LoaderContainerStyled>
      )}

      <ResultContainerStyled style={containerStyle}>
        <TitleStyled>{title}</TitleStyled>
        <DescriptionTextStyled>{descriptionText}</DescriptionTextStyled>
      </ResultContainerStyled>

      {showTags && (
        <>
          <TagsContainerStyled>
            {tags.map(tag => (
              <TagStyled key={tag._id}>
                {tag.tagTitle}
              </TagStyled>
            ))}
          </TagsContainerStyled>

          <CommaDelimitedTagsContainerStyled>
            <DescriptionTextStyled>{commaDelimitedTags}</DescriptionTextStyled>
          </CommaDelimitedTagsContainerStyled>
        </>
      )}
    </YouTubeDescriptionGeneratorContainerStyled>
  );
};

export default YouTubeDescriptionGenerator;

