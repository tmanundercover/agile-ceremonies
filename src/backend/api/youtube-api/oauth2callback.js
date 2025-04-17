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
import { storeAccessTokens } from "../open-ai-api/youTube/youTubeAuth";
/**
 * Handles OAuth2 callback from YouTube authentication.
 *
 * @async
 * @method oauth2callback
 * @description Processes the authentication code received from YouTube and stores access tokens.
 * @param {Request} request - The HTTP request containing the OAuth2 authentication code.
 * @returns {Promise<Response>} A response indicating success or failure of authentication.
 */
export async function GET(request) {
    console.log("start get oauth2callback: ", request);
    const data = await request.json();
    const url = data.url;
    console.log("url", url);
    let code;
    try {
        // Extract the authorization code from the request query parameters
        code = data.code;
    }
    catch (e) {
        console.error("Error: ", e);
        return new Error("Error: We could not authorize the YouTube application requested");
    }
    try {
        // Store access tokens in the database using the authorization code
        await storeAccessTokens(code);
        return { status: "200", body: { message: "Success: YouTube application authorized successfully" } };
    }
    catch (error) {
        console.error("Error getting token: ", error);
        return new Error("AuthError: " + error.message);
    }
}
;
export async function PUT(request) {
    console.log("start put oauth2callback: ", request);
    const data = await request.json();
    const url = data.url;
    console.log("url", url);
    let code;
    try {
        // Extract the authorization code from the request query parameters
        code = data.code;
    }
    catch (e) {
        console.error("Error: ", e);
        return Error("Error: We could not authorize the YouTube application requested");
    }
    try {
        // Store access tokens in the database using the authorization code
        await storeAccessTokens(code);
        return { status: "200", body: { message: "Success: YouTube application authorized successfully" } };
    }
    catch (error) {
        console.error("Error getting token: ", error);
        return new Response("AuthError: " + error.message);
    }
}
;
