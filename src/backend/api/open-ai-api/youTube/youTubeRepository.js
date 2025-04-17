import wixData from "wix-data";
/**
 * Retrieves the access token from the database.
 *
 * @async
 * @method getAccessTokenFromDatabase
 * @description Retrieves the access token from the database.
 * @returns {Promise<object|null>} The access token or null if not found.
 */
export const getAccessTokenFromDatabase = async () => {
    const accessTokenRow = await wixData.query("tokens").eq("type", "full_token").find();
    let accessToken;
    if (accessTokenRow.length > 0) {
        console.log("success retrieving accessToken from db", accessTokenRow.items[0]); //see item below
        accessToken = JSON.parse(accessTokenRow.items[0].value);
    }
    else {
        console.log("ERROR: no full token in db");
        throw ("ERROR: no full token in db");
    }
    return accessToken;
};
/**
 * Persists the tokens in the database.
 *
 * @async
 * @method persistTokens
 * @description Persists the tokens in the database.
 * @param {TokenResponse} tokens - The tokens to persist.
 * @returns {Promise<{status: string}>}
 */
export const persistTokens = async (tokens) => {
    try {
        console.debug("Persist these Tokens: ", tokens);
        console.debug('Persisting tokens in database');
        const tokenTypes = [];
        if (!!(tokens.tokens.access_token) || !!(tokens.tokens.refresh_token)) {
            console.debug("There is at least one token to persist", tokens);
            tokenTypes.push({ type: 'full_token', value: JSON.stringify(tokens) });
            console.debug("There is at least one token to persist again ", tokenTypes);
            if (!!(tokens.tokens.access_token)) {
                const accessToken = tokens.tokens.access_token;
                console.debug("Requesting Store of Access Token");
                tokenTypes.push({ type: 'access_token', value: accessToken });
            }
            if (!!(tokens.tokens.refresh_token)) {
                const refreshToken = tokens.tokens.refresh_token;
                console.debug("Requesting Store of Refresh Token");
                tokenTypes.push({ type: 'refresh_token', value: refreshToken });
            }
        }
        console.log("TokenTypes outside", tokenTypes);
        const promisesToRally = [];
        for (let tokenType of tokenTypes) {
            if (!!(tokenType.value)) {
                console.log("TokenType?", tokenType);
                const existingToken = await wixData.query("tokens").eq("type", tokenType.type).find();
                if (existingToken.length > 0) {
                    const currentTokensCollectionId = existingToken.items[0]._id;
                    promisesToRally.push(updateTokensCollection(tokenType, currentTokensCollectionId));
                }
                else {
                    promisesToRally.push(saveTokensCollection(tokenType));
                }
            }
        }
        const allPromises = await Promise.all(promisesToRally);
        console.debug(`New Tokens have been stored - 
            access_token: ${!!tokens.tokens.access_token ? "true" : "false"} 
            refresh_token: ${!!tokens.tokens.refresh_token ? "true" : "false"}`, allPromises);
        return { status: "SUCCESS" };
    }
    catch (error) {
        console.error(`Error persisting tokens: ${error.message}`);
        console.trace('Error persisting tokens');
        throw error;
    }
};
/**
 * Persists the YouTube channel Information details in the CMS.
 *
 * @async
 * @method persistChannelInfo
 * @description Persists the YouTube channel Information details in the CMS.
 * @param {ChannelInfo} newChannelInfo - A row from the youtubeChannelInfo Table.
 * @param {WixDataResult} currentChannelInfo - A row from the youtubeChannelInfo Table.
 * @returns {Promise<any>}
 */
export const persistChannelInfo = (newChannelInfo, currentChannelInfo) => {
    const currentChannelCollectionId = currentChannelInfo?.items[0]?._id;
    if (newChannelInfo?.snippetTitle && (newChannelInfo.snippetTitle.length === 0)) {
        return Promise.reject("Error getting Channel Information.");
    }
    return new Promise((resolve, reject) => {
        try {
            if (currentChannelCollectionId) {
                resolve(updateChannelInfoCollection(newChannelInfo, currentChannelCollectionId));
            }
            else {
                resolve(saveChannelInfoCollection(newChannelInfo));
            }
        }
        catch (error) {
            console.error(`Error persisting channel info: ${error.message}`);
            reject(error);
        }
    });
};
/**
 * Update existing YouTube channel Information details in the CMS.
 *
 * @async
 * @method updateChannelInfoCollection
 * @description Persists the YouTube channel Information details in the CMS.
 * @param {ChannelInfo} newChannelInfo - A row from the youtubeChannelInfo Table.
 * @param {string} currentChannelCollectionId - The id of the channel row in the CMS to update.
 * @returns {Promise<any>}
 */
const updateChannelInfoCollection = async (newChannelInfo, currentChannelCollectionId) => {
    try {
        const updateResponse = await wixData.update("youtubeChannelInfo", {
            ...newChannelInfo,
            _id: currentChannelCollectionId
        });
        console.log("success updating channel in db", updateResponse); //see item below
        return updateResponse;
    }
    catch (error) {
        console.error("Error Updating Channel in DB: ", error);
        throw error;
    }
};
/**
 * Saves the new YouTube channel Information details in the CMS.
 *
 * @async
 * @method saveChannelInfoCollection
 * @description Persists the YouTube channel Information details in the CMS.
 * @param {ChannelInfo} newChannelInfo - A row from the youtubeChannelInfo Table.
 * @returns {Promise<any>}
 */
const saveChannelInfoCollection = async (newChannelInfo) => {
    try {
        const saveResponse = await wixData.save("youtubeChannelInfo", newChannelInfo);
        console.log("success saving channel in db", saveResponse);
        return saveResponse;
    }
    catch (error) {
        console.error("Error Saving Channel in DB: ", error);
        throw error;
    }
};
/**
 * Update existing token details in the CMS.
 *
 * @async
 * @method updateTokensCollection
 * @description Persists the YouTube channel Information details in the CMS.
 * @param {TokenType} tokenToStore - The token to store in the db.
 * @param {string} currentTokensCollectionId - The id of the tokens row in the CMS to update.
 * @returns {Promise<any>}
 */
const updateTokensCollection = async (tokenToStore, currentTokensCollectionId) => {
    console.log(`Updating existing ${tokenToStore.type} token in DB`);
    try {
        const results = await wixData.update("tokens", { ...tokenToStore, _id: currentTokensCollectionId });
        console.log(`success updating token ${tokenToStore.type}`, results);
        return Promise.resolve(results);
    }
    catch (error) {
        console.error(`Error creating token ${tokenToStore.type}`, error);
        return Promise.reject(error.message);
    }
};
/**
 * Saves new token details in the CMS.
 *
 * @async
 * @method saveTokensCollection
 * @description Persists the YouTube tokens Information details in the CMS.
 * @param {TokenType} tokenToStore - A new row for the youtubeChannelInfo Table.
 * @returns {Promise<any>}
 */
const saveTokensCollection = async (tokenToStore) => {
    console.log(`Creating new ${tokenToStore.type} token:`);
    try {
        const results = await wixData.save("tokens", tokenToStore);
        console.log(`success creating token ${tokenToStore.type}`, results);
        return Promise.resolve(results);
    }
    catch (error) {
        console.error(`Error creating token ${tokenToStore.type}`, error);
        return Promise.reject(error.message);
    }
};
/**
 * retrieves the channel info from the database.
 *
 * @async
 * @method retrieveFirstChannelsInfo
 * @description Gets the YouTube channel Information details from the CMS.
 * @returns {Promise<any>}
 */
export const retrieveFirstChannelsInfo = async () => {
    try {
        const allChannels = await wixData.query("youtubeChannelInfo").find();
        return allChannels[0];
    }
    catch (error) {
        console.error(`Retrieving all Channel Info`, error);
        throw error.message;
    }
};
