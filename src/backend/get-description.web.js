import { Permissions, webMethod } from "@wix/web-methods";
import { httpClient } from "@wix/essentials";
// import wixSecretsBackend from "@wix/wix-secrets-backend.v2";
// export const getOpenAITaskListResponse = webMethod(
//     Permissions.Anyone,
//     async (aNote) => {
//
//         console.log("Calling Server side wix function");
//         return getTaskList(aNote)
//     });
//
export const getYoutubeDescriptionResponse = webMethod(Permissions.Anyone, async (videoDescription, videoDescriptionOptions) => {
    console.log("Calling Server side wix get youtube description function", videoDescriptionOptions, videoDescription);
    const callMyBackendPOST = async () => {
        const res = await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/api/open-ai-api`, {
            method: "POST",
            body: JSON.stringify({ videoDescription, videoDescriptionOptions }),
        });
        const responseVal = await res.json();
        console.log("the response from the server: ", responseVal);
        return res.json();
    };
    return callMyBackendPOST();
});
//
// const getTaskList = async (theNote:string) => {
//
//     const taskList = theNote.split("\n").filter(t => t.trim() !== "");
//
//     const theAITaskList = await getTaskListResponse(taskList)
//
//     console.log("The Task list", theAITaskList);
//     return theAITaskList;
// }
// const getTaskListResponse = async (taskList:string[]) => {
//     const elevatedGetSecretValue = wixSecretsBackend.elevate(wixSecretsBackend.secrets.getSecretValue);
//     const apiKey = await elevatedGetSecretValue("open-ai-scheduler-api-key");
//
//     const taskListString = taskList.reduce((accumulation, currValue, index) => {
//         return accumulation + `${index}. ` + currValue + '\n';
//     }, "")
//
//     console.log("got the taskList: ", taskListString);
//     const completion = await fetch('https://api.openai.com/v1/chat/completions', {
//             method: "post",
//             headers: {
//                 "Authorization": "Bearer " + apiKey.value,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 model: "gpt-4o",
//                 messages: [{
//                     role: "system",
//                     content: "You are a smart personal assistant that helps users optimally plan their day. Given a list of tasks, create a structured schedule that prioritizes essential activities, groups similar tasks, and considers logical constraints like time dependencies and efficiency. Identify must-do tasks (e.g., scheduled meetings, school-related activities), group related tasks (e.g., outdoor tasks together), and space out mentally/physically demanding activities. Provide a brief explanation before listing the schedule and format it clearly with time slots. Example Output: 'Since your daughter won’t be home until the afternoon, we’ve scheduled her project later. We also grouped your outdoor activities together for efficiency. Here's your optimized plan:' 11AM: Prepare for meeting with Jessica, 1PM: Go for a 20-minute run, 2PM: Mow the lawn, 4PM: Help daughter with science project. Please provide the response in a json object with a property schedule that's an array of tasks. Each Task has a time and a task string. Provide the explanation as a member on the same level as schedule called explanation. Now, generate a schedule based on these tasks and only return the json object that can be parsed that I specified without markdown and no tick marks.",
//                 }, {
//                     role: "user",
//                     content: `Here are my tasks for today:\n${taskListString}\n\nPlease create an optimized schedule for me.`,
//                 }],
//             })
//         }
//     );
//
//     let jsonResponse
//     try {
//         const final = await completion.json()
//         console.log("the openai response: ", final)
//         if (!final.choices) {
//             throw Error(final.Error ?? "There was an unknown error")
//         }
//
//         jsonResponse = JSON.parse(final.choices[0].message.content)
//     } catch (e:any) {
//         console.log("Error: ", e)
//         return {explanation: e.message}
//     }
//     //REplace this with above just saving api calls.
//     // const jsonResponse = {
//     //     "explanation": "Since picking up the kids is time-sensitive, it's scheduled in the afternoon. I've grouped your grocery shopping with cooking to streamline your tasks. Your date night is planned for the evening as a relaxing end to your day.",
//     //     "schedule": [
//     //         {
//     //             "time": "3PM",
//     //             "task": "Pick up the kids"
//     //         },
//     //         {
//     //             "time": "4PM",
//     //             "task": "Go grocery shopping"
//     //         },
//     //         {
//     //             "time": "6PM",
//     //             "task": "Cook dinner"
//     //         },
//     //         // {
//     //         //     "time": "8PM",
//     //         //     "task": "Date night"
//     //         // },
//     //         // {
//     //         //     "time": "9PM",
//     //         //     "task": "Date night"
//     //         // }
//     //     ]
//     // }
//
//     console.log("the openai response: ", jsonResponse)
//
//     return jsonResponse
// }
const getYouTubeVideoDescription = async (videoDescription, videoDescriptionOptions) => {
    const theOpenAIResponse = await getYouTubeDescriptionResponse(videoDescription, videoDescriptionOptions);
    const commaDelimitedTagList = theOpenAIResponse.tags.map((tag) => tag.replace(/^#/, '') // Remove the hashtag symbol
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space where case changes
    ).join(', ');
    return { ...theOpenAIResponse, commaDelimitedTags: commaDelimitedTagList };
};
// const getYouTubeSystemPrompt = () => {
//     return `You are an expert in YouTube content optimization, specializing in gaming videos, particularly Overwatch 2 gameplay featuring Soldier:76. Your task is to generate an engaging, SEO-optimized YouTube title and description that maximizes reach, retention, and engagement.
//
// Title Guidelines:
// - Keep it short, attention-grabbing, and click-friendly.
// - Highlight key moments, such as multi-kills, strategic plays, or pro tips.
// - Use power words (e.g., 'Epic,' 'Clutch,' 'Pro Tip,' 'Insane,' 'Must-See').
// - If applicable, frame it as a pro tip or a lesson learned from the match.
//
// Description Structure:
// 1. Exciting Intro (1-2 sentences) – Hook the viewer with the clip’s key moment or theme.
// 2. Clip Breakdown (2-3 sentences) – Explain what happens in the clip, emphasizing skill, strategy, or a standout moment.
// 3. Pro Tip (If applicable, 1-2 sentences) – Provide a valuable gameplay insight related to the clip.
// 4. Key Highlights (Bullet points) – List major moments concisely for easy skimming.
// 5. Engagement Question (1 sentence) – Encourage comments by asking about similar experiences.
// 6. Call-to-Action (1 sentence) – Encourage subscriptions, likes, and engagement.
// 7. Hashtag List – Include SEO-friendly hashtags relevant to Overwatch 2, Soldier:76, and gameplay moments.
//
// Example Input:
// 'In this clip, I take high ground before activating Tactical Visor, timing my ult perfectly to eliminate Moira, Cassidy, and Mercy. Moira was mid-Ult, so I prioritized her first before dropping down to clean up the rest. The key takeaway is that Tactical Visor has a delay before locking on, so positioning and timing are everything.'
//
// Example Output (format this response as JSON only):
//
// {
//   "title": "Soldier:76 Pro Tip – Time Your Ult & Take High Ground for Maximum Impact | Overwatch 2",
//   "description": "🔥 Soldier:76 PRO TIP – TIME YOUR ULT & USE HIGH GROUND for a TRIPLE KILL | Overwatch 2 🔥\n\nTactical Visor isn’t just point-and-shoot—it’s all about timing and positioning. I take high ground before activating my ult, ensuring a clear line of sight and eliminating Moira, Cassidy, and Mercy. Moira was mid-Ult, making her the first priority, then I drop down to clean up Cassidy and Mercy. Pro Tip: Always position yourself before activating Tactical Visor—it takes a second to lock on, so good timing is everything.\n\n🎯 Key Moments:\n✅ Tactical Visor activated from high ground for better sightlines 🏔️\n✅ Moira shut down mid-Ult—no healing for them 💀\n✅ Cassidy & Mercy cleaned up for a triple kill 🔥\n\n💬 How do you position yourself before ulting with Soldier:76? Drop your best high-ground ult plays in the comments!\n\n🔔 Subscribe for more Overwatch 2 highlights, strategies, and unfiltered rants!",
//   "tags": [
//     "#Overwatch2", "#Soldier76", "#FPSGaming", "#OverwatchPlays", "#OverwatchClips", "#RespawnRants", "#GamingHighlights",
//     "#ShooterGames", "#TacticalVisor", "#ProTip", "#HighGround", "#TripleKill", "#Moira", "#Cassidy", "#Mercy", "#CompetitiveGaming"
//   ]
// }`
// }
const getYouTubeDescriptionResponse = async (videoDescription, videoDescriptionOptions) => {
    // const elevatedGetSecretValue = wixSecretsBackend.elevate(wixSecretsBackend.secrets.getSecretValue);
    // const apiKey = await elevatedGetSecretValue("open-ai-api-key");
    // const getMessagesForOptions = (videoDescriptionOptions) => {
    //     return [{
    //         role: "system",
    //         content: getYouTubeSystemPrompt(),
    //     },]
    // }
    const apiKey = "";
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
            }
        ];
    };
    const systemMessages = getSystemMessages();
    // const optionsMessages = getMessagesForOptions(videoDescriptionOptions);
    const messages = [...systemMessages, {
            role: "user",
            content: `Here is my description of the video:\n${videoDescription}\n\nPlease create a youtube title and description for me.`,
        }];
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
    });
    let jsonResponse;
    try {
        const final = await completion.json();
        console.log("the openai response: ", final);
        console.log("The messages that would have been sent ", messages);
        if (!final.choices) {
            throw Error(final.Error ?? "There was an unknown error");
        }
        jsonResponse = JSON.parse(final.choices[0].message.content);
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
    }
    catch (e) {
        console.log("Error: ", e);
        return { description: e.message };
    }
    console.log("the openai response: ", jsonResponse);
    return jsonResponse;
};
