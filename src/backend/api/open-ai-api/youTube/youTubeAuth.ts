
import { secrets } from "@wix/secrets";
import {persistTokens} from "./youTubeRepository";

const {google} = require("googleapis");

interface AccessToken {
    tokens: {
        access_token?: string;
        refresh_token?: string;
        expiry_date?: number;
        scope?: string;
        token_type?: string;
    };
}

interface SecretValue {
    value: string;
}

/**
 * Creates a new OAuth2Client instance.
 *
 * @async
 * @method createOauth2Client
 * @description Creates a new OAuth2Client instance and returns it.
 * @param {string} client_id - The client ID for the OAuth2 client.
 * @param {AccessToken} [access_token] - The access_token for the OAuth2 client.
 * @returns {Promise<typeof google.auth.OAuth2>} The OAuth2 client instance.
 */
export const createOauth2Client = async (client_id: string, access_token?: AccessToken): Promise<typeof google.auth.OAuth2> => {
    try {
        console.debug(`Creating OAuth2 client with client ID`);
        const secret = await getSecretSecret();
        const redirectUrl = "https://thehandsomestnerd.wixstudio.com/overwatch/_functions/oauth2callback";
        const oAuth2Client = new google.auth.OAuth2(
            client_id,
            secret,
            encodeURI(redirectUrl)
        );
        console.info('OAuth2 client created successfully');
        if (!!access_token) {
            console.log("Setting Access token in oauthclient")
            oAuth2Client.setCredentials(access_token.tokens)
        } else {
            console.log("Setting Access token in oauthclient")
        }

        return Promise.resolve(oAuth2Client);
    } catch (error: any) {
        console.error(`Error creating OAuth2 client: ${error.message}`);
        console.trace('Error creating OAuth2 client');

        throw "createOauth2Client Error:" + error.message;
    }
};

/**
 * Generates the authorization URL for the OAuth2 client.
 *
 * @async
 * @method getAuthorizationUrl
 * @description Generates the authorization URL for the OAuth2 client.
 * @param {typeof google.auth.OAuth2} oAuth2Client - The OAuth2 client instance.
 * @returns {Promise<string>} The authorization URL.
 */
export const getAuthorizationUrl = async (oAuth2Client: typeof google.auth.OAuth2): Promise<string> => {
    try {
        console.debug('Generating authorization URL');
        const authorizationUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            response_type: 'code',
            scope: encodeURI('https://www.googleapis.com/auth/youtube.readonly'),
        });
        console.info('Authorization URL generated successfully');
        return authorizationUrl;
    } catch (error: any) {
        console.error(`Error generating authorization URL: ${error.message}`);
        console.trace('Error generating authorization URL');
        throw error;
    }
};

/**
 * Retrieves the secret value from Wix Secrets Manager.
 *
 * @async
 * @method getSecretSecret
 * @description Retrieves the secret value from Wix Secrets Manager.
 * @returns {Promise<string>} The secret value.
 */
export const getSecretSecret = async (): Promise<string> => {
    try {
        console.info('Retrieving secret value');
        const secret = await secrets.getSecretValue("youtube-secret");

        console.info('Secret value retrieved successfully');

        return secret.value;
    } catch (error: any) {
        console.error(`Error retrieving secret value: ${error.message}`);
        console.trace(`Error retrieving secret value: ${error.message}`)
        throw error;
    }
};

/**
 * Retrieves the client ID from Wix Secrets Manager.
 *
 * @async
 * @method getClientIdSecret
 * @description Retrieves the client ID from Wix Secrets Manager.
 * @returns {Promise<string>} The client ID.
 */
export const getClientIdSecret = async (): Promise<string> => {
    try {
        console.info('Retrieving client ID');

        const client_id: SecretValue = await secrets.getSecretValue("youtube-api-client-id");
        console.info('Client ID retrieved successfully');
        return client_id.value;
    } catch (error: any) {
        console.error(`Error retrieving client ID: ${error.message}`);
        throw error;
    }
};

/**
 * Stores OAuth2 access tokens.
 *
 * @async
 * @method storeAccessTokens
 * @description Creates a new OAuth2Client instance and retrieves tokens using the authorization code.
 * @param {string} code - The authorization code.
 * @returns {Promise<void>}
 */
export const storeAccessTokens = async (code: string): Promise<void> => {
    const client_id = await getClientIdSecret();
    const oAuth2Client = await createOauth2Client(client_id);

    try {
        const tokenResponse = await oAuth2Client.getToken(code);

        console.debug("Tokens Response", tokenResponse)
        await persistTokens(tokenResponse)
    } catch (error: any) {
        console.error(`Error storing access tokens: ${error.message}`);
        console.trace(`Error storing access tokens: ${error.message}`);
        throw error;
    }
};

/**
 * Retrieves the access token from the header.
 *
 * @async
 * @method getAccessTokenFromHeader
 * @description Retrieves the access token from the request header.
 * @param {string} authorizationHeader - The authorization header string.
 * @returns {Promise<string|undefined>} The access token or undefined if not found.
 */
export const getAccessTokenFromHeader = async (authorizationHeader: string): Promise<string | undefined> => {
    try {
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            return authorizationHeader.split(' ')[1];
        }
        return undefined;
    } catch (e: any) {
        console.debug("Auth Error: ");
        throw ("Auth Error: " + e.message);
    }
}