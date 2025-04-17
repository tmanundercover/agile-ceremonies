import {getYouTubeDescriptionResponse} from "./open-ai-api/youTube/youTubeService";

/**
This file allows you to call backend APIs from your frontend of this app.
You can generate various API methods including GET, POST, PUT, and DELETE.
To learn more, check out our documentation: https://wix.to/Iabrrso

Here's how you can call your API from your frontend code:

import { httpClient } from '@wix/essentials';

function MyComponent() {
  const callMyBackend = async () => {
    const res = await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/youtube-api`);
    console.log(await res.text());
  };

  return <button onClick={callMyBackend}>Call backend GET function</button>;
};
*/
export async function POST(req: Request) {
  const url = new URL(req.url);

  // Extract the query parameters from the URL
  const {videoDescription, videoDescriptionOptions} = Object.fromEntries(url.searchParams);

  const theOpenAIResponse = await getYouTubeDescriptionResponse(videoDescription, videoDescriptionOptions)

  const commaDelimitedTagList = theOpenAIResponse.tags.map((tag:string) =>
      tag.replace(/^#/, '') // Remove the hashtag symbol
          .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space where case changes
  ).join(', ');

  return {...theOpenAIResponse, commaDelimitedTags: commaDelimitedTagList};
};


