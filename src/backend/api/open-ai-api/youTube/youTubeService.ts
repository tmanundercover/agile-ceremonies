import {persistChannelInfo, retrieveFirstChannelsInfo} from "./youTubeRepository";
import {getSecretSecret} from "./youTubeAuth";
import {secrets} from "@wix/secrets";

const {google} = require("googleapis");

interface ChannelInfo {
    snippetTitle: string;
    snippetDescription: string;
    thumbnail: {
        url: string;
        width: number;
        height: number;
    };
    statisticsVideoCount: number;
    customUrl: string;
    channelId: string;
}

interface YoutubeChannelResponse {
    data?: {
        items?: Array<{
            id: string;
            snippet: {
                title: string;
                description: string;
                thumbnails: {
                    medium: {
                        url: string;
                        width: number;
                        height: number;
                    }
                }
            };
            statistics: {
                videoCount: string;
                snippet: {
                    thumbnails: {
                        medium: {
                            url: string;
                            width: number;
                            height: number;
                        }
                    }
                }
            };
            customUrl: string;
        }>
    }
}

/**
 * Creates a YouTube client instance.
 *
 * @method getYoutubeClient
 * @description Creates a YouTube client instance with the provided OAuth2 client.
 * @param {typeof google.auth.OAuth2} oAuth2Client - The OAuth2 client instance.
 * @returns {typeof google.youtube_v3.Youtube} The YouTube client instance.
 */
const getYoutubeClient = (oAuth2Client: typeof google.auth.OAuth2): typeof google.youtube_v3.Youtube => {
    try {
        console.debug('Creating YouTube client');
        const youtube = google.youtube({
            version: 'v3',
            auth: oAuth2Client,
        });
        console.info('YouTube client created successfully');
        return youtube;
    } catch (error: any) {
        console.error(`Error creating YouTube client: ${error.message}`);
        console.trace('Error creating YouTube client');
        throw error;
    }
};

/**
 * Retrieves the authenticated users first channel information.
 *
 * @async
 * @method getFirstChannelInfoFromYoutube
 * @description Retrieves the channel information using the channel ID.
 * @param {typeof google.youtube_v3.Youtube} youtube - The YouTube client.
 * @returns {Promise<ChannelInfo>} The channel information.
 */
const getFirstChannelInfoFromYoutube = async (youtube: typeof google.youtube_v3.Youtube): Promise<ChannelInfo> => {
    const listChannelParams = {
        part: ["snippet", "contentDetails", "statistics"],
        mine: true,
    };

    try {
        console.debug('Retrieving channel information');

        const retrievedChannel: Promise<ChannelInfo> = new Promise((resolve, reject) => {
            return youtube.channels.list(listChannelParams, function(err: Error | null, response: YoutubeChannelResponse) {
                console.log('The API returned', response);
                if (err) {
                    console.log('The API returned an error: ' + err.message);
                    reject(err.message);
                }
                const channels = response?.data?.items || [];
                if (channels.length === 0) {
                    console.log('No channel found.');
                    reject("No channel found");
                } else {
                    console.log(`Channel Found: Its title is ${channels[0].snippet.title}, and it has ${channels[0].statistics.videoCount} videos.`);
                    resolve({
                        snippetTitle: channels[0].snippet.title,
                        snippetDescription: channels[0].snippet.description,
                        thumbnail: channels[0].statistics.snippet.thumbnails.medium,
                        statisticsVideoCount: parseInt(channels[0].statistics.videoCount),
                        customUrl: channels[0].customUrl,
                        channelId: channels[0].id
                    });
                }
            });
        });

        console.log("The retrieved channel", retrievedChannel);
        return retrievedChannel.then(result => result);
    } catch (error: any) {
        console.error(`Error retrieving channel information: ${error.message}`);
        console.trace('Error retrieving channel information');
        throw error;
    }
};

/**
 * Updates the channel information in the database.
 *
 * @method updateChannels
 * @description Updates the channel information in the database using the provided OAuth2 client.
 * @param {typeof google.auth.OAuth2} oAuth2Client - The OAuth2 client instance.
 * @returns {Promise<any>}
 */
export const updateChannels = async (oAuth2Client: typeof google.auth.OAuth2): Promise<any> => {
    try {
        const youtube = getYoutubeClient(oAuth2Client);

        const newChannelInfo = await getFirstChannelInfoFromYoutube(youtube);
        console.log("The New Channel Info", newChannelInfo);

        const currentChannelInfo = await retrieveFirstChannelsInfo();
        console.log("The Current Channel Info", currentChannelInfo);

        return persistChannelInfo(newChannelInfo, currentChannelInfo);
    } catch (error: any) {
        console.error(`Error retrieving updating channel: ${error.message}`);
        throw error;
    }
};

/**
 * Updates the channel information in the database.
 *
 * @method updateChannels
 * @description Updates the channel information in the database using the provided OAuth2 client.
 * @param {typeof google.auth.OAuth2} oAuth2Client - The OAuth2 client instance.
 * @returns {Promise<any>}
 */
export const getYouTubeDescriptionResponse = async (videoDescription: string, videoDescriptionOptions: string) => {
    const secret = await secrets.getSecretValue("open-ai-api-key");

    const apiKey = secret.value;

    // const getMessagesForOptions = (videoDescriptionOptions) => {
    //     return [{
    //         role: "system",
    //         content: getYouTubeSystemPrompt(),
    //     },]
    // }

    const getSystemMessages = () => {
        return [
            {
                role: "system",
                content: "You are an expert in YouTube content optimization, specializing in gaming videos, particularly Overwatch 2 gameplay featuring Soldier:76. Your task is to generate an engaging, SEO-optimized YouTube title and description that maximizes reach, retention, and engagement."
            },
            {
                role: "system",
                content: "Title Guidelines:\n- Keep it short, attention-grabbing, and click-friendly.\n- Highlight key moments, such as multi-kills, strategic plays, or pro tips.\n- Use power words (e.g., 'Epic,' 'Clutch,' 'Pro Tip,' 'Insane,' 'Must-See').\n- If applicable, frame it as a pro tip or a lesson learned from the match."
            },
            {
                role: "system",
                content: "Description Structure:\n1. Exciting Intro (1-2 sentences) – Hook the viewer with the clip’s key moment or theme.\n2. Clip Breakdown (2-3 sentences) – Explain what happens in the clip, emphasizing skill, strategy, or a standout moment.\n3. Pro Tip (If applicable, 1-2 sentences) – Provide a valuable gameplay insight related to the clip.\n4. Key Highlights (Bullet points) – List major moments concisely for easy skimming.\n5. Engagement Question (1 sentence) – Encourage comments by asking about similar experiences.\n6. Call-to-Action (1 sentence) – Encourage subscriptions, likes, and engagement.\n7. Hashtag List – Include SEO-friendly hashtags relevant to Overwatch 2, Soldier:76, and gameplay moments."
            },
            {
                role: "system",
                content: "Example Input:\n'In this clip, I take high ground before activating Tactical Visor, timing my ult perfectly to eliminate Moira, Cassidy, and Mercy. Moira was mid-Ult, so I prioritized her first before dropping down to clean up the rest. The key takeaway is that Tactical Visor has a delay before locking on, so positioning and timing are everything.'"
            },
            {
                role: "system",
                content: "Example Output (model should only respond in JSON format):\n{\n  \"title\": \"Soldier:76 Pro Tip – Time Your Ult & Take High Ground for Maximum Impact | Overwatch 2\",\n  \"description\": \"🔥 Soldier:76 PRO TIP – TIME YOUR ULT & USE HIGH GROUND for a TRIPLE KILL | Overwatch 2 🔥\\n\\nTactical Visor isn’t just point-and-shoot—it’s all about timing and positioning. I take high ground before activating my ult, ensuring a clear line of sight and eliminating Moira, Cassidy, and Mercy. Moira was mid-Ult, making her the first priority, then I drop down to clean up Cassidy and Mercy. Pro Tip: Always position yourself before activating Tactical Visor—it takes a second to lock on, so good timing is everything.\\n\\n🎯 Key Moments:\\n✅ Tactical Visor activated from high ground for better sightlines 🏔️\\n✅ Moira shut down mid-Ult—no healing for them 💀\\n✅ Cassidy & Mercy cleaned up for a triple kill 🔥\\n\\n💬 How do you position yourself before ulting with Soldier:76? Drop your best high-ground ult plays in the comments!\\n\\n🔔 Subscribe for more Overwatch 2 highlights, strategies, and unfiltered rants!\",\n  \"tags\": [ \"#Overwatch2\", \"#Soldier76\", \"#FPSGaming\", \"#OverwatchPlays\", \"#OverwatchClips\", \"#RespawnRants\", \"#GamingHighlights\", \"#ShooterGames\", \"#TacticalVisor\", \"#ProTip\", \"#HighGround\", \"#TripleKill\", \"#Moira\", \"#Cassidy\", \"#Mercy\", \"#CompetitiveGaming\" ]\n}"
            },
            {
                role: "system",
                content: "Format your response strictly as JSON without markdown syntax with the following structure:\n{\n  \"title\": \"Generated YouTube Title\",\n  \"description\": \"Generated YouTube Description\",\n  \"tags\": [ \"#Overwatch2\", \"#Soldier76\", \"#FPSGaming\", \"#OverwatchPlays\", \"#OverwatchClips\", \"#RespawnRants\", \"#GamingHighlights\", \"#ShooterGames\", \"#TacticalVisor\", \"#ProTip\", \"#HighGround\", \"#TripleKill\", \"#Moira\", \"#Cassidy\", \"#Mercy\", \"#CompetitiveGaming\" ]\n}"
            }]
    }

    const systemMessages = getSystemMessages()
    // const optionsMessages = getMessagesForOptions(videoDescriptionOptions);

    const messages = [...systemMessages, {
        role: "user",
        content: `Here is my description of the video:\n${videoDescription}\n\nPlease create a youtube title and description for me.`,
    }]

    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
            method: "post",
            headers: {
                "Authorization": "Bearer " + apiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: messages,
            })
        }
    );

    let jsonResponse
    try {
        const final = await completion.json()

        console.log("the openai response: ", final)
        console.log("The messages that would have been sent ", messages)
        if (!final.choices) {
            throw Error(final.Error ?? "There was an unknown error")
        }

        jsonResponse = JSON.parse(final.choices[0].message.content)
//         jsonResponse = {
//             "title": "Soldier:76 Pro Tip – Time Your Ult & Take High Ground for Maximum Impact | Overwatch 2",
//             "description": `🔥 Soldier:76 PRO TIP – TIME YOUR ULT & USE HIGH GROUND for a TRIPLE KILL | Overwatch 2 🔥
//
//             Tactical Visor isn’t just point-and-shoot—it’s all about timing and positioning. I take high ground before activating my ult, ensuring a clear line of sight and eliminating Moira, Cassidy, and Mercy. Moira was mid-Ult, making her the first priority, then I drop down to clean up Cassidy and Mercy. Pro Tip: Always position yourself before activating Tactical Visor—it takes a second to lock on, so good timing is everything.
//
// 🎯 Key Moments:
//             ✅ Tactical Visor activated from high ground for better sightlines 🏔️
//     ✅ Moira shut down mid-Ult—no healing for them 💀
// ✅ Cassidy & Mercy cleaned up for a triple kill 🔥
//
//     💬 How do you position yourself before ulting with Soldier:76? Drop your best high-ground ult plays in the comments!
//
// 🔔 Subscribe for more Overwatch 2 highlights, strategies, and unfiltered rants!`,
//             "tags": [
//                 "#Overwatch2", "#Soldier76", "#FPSGaming", "#OverwatchPlays", "#OverwatchClips", "#RespawnRants", "#GamingHighlights",
//                 "#ShooterGames", "#TacticalVisor", "#ProTip", "#HighGround", "#TripleKill", "#Moira", "#Cassidy", "#Mercy", "#CompetitiveGaming"
//             ]
//         }
    } catch (e:any) {
        console.log("Error: ", e)
        return {description: e.message}
    }

    console.log("the openai response: ", jsonResponse)

    return jsonResponse
}
