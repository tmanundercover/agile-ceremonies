import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getYoutubeDescriptionResponse } from './openAI.web';
import './YouTubeDescriptionGenerator.css';

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
  const [containerStyle, setContainerStyle] = useState({ backgroundColor: '#15191E' });
  const [descriptionText, setDescriptionText] = useState('Let me help you plan your day. Please enter your tasks for today, one per line above. I\'ll tell you what order and times you should do them.');
  const [title, setTitle] = useState('');
  const [commaDelimitedTags, setCommaDelimitedTags] = useState('');
  const [showTags, setShowTags] = useState(false);

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
      const response = await getYoutubeDescriptionResponse(inputText);
      
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
    <div className="youtube-description-generator">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your text here"
      />
      
      <button onClick={handleGenerate} disabled={isLoading}>
        Generate Description
      </button>

      {isLoading && (
        <div className="loader">
          <img src="/path-to-your-loader-image.gif" alt="Loading..." />
        </div>
      )}

      <div className="description-container" style={containerStyle}>
        <h3>{title}</h3>
        <p>{descriptionText}</p>
      </div>

      {showTags && (
        <>
          <div className="tags-container" style={containerStyle}>
            {tags.map(tag => (
              <span key={tag._id} className="tag">
                {tag.tagTitle}
              </span>
            ))}
          </div>
          
          <div className="comma-delimited-tags" style={containerStyle}>
            <p>{commaDelimitedTags}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default YouTubeDescriptionGenerator;
