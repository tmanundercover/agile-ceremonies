/************
 .web.js file
 ************

 Backend '.web.js' files contain functions that run on the server side and can be called from page code.

 This function uses the Overwatch API OWAPI to request playing statistical data on a certain player. It is scraped from the Blizzard site:
 https://overwatch.blizzard.com/en-us/search/?q=kamikazero page.

 Learn more at https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/web-modules/calling-backend-code-from-the-frontend

 ****/

import { webMethod, Permissions } from '@wix/web-methods';

export const getAgoMessage = webMethod(
    Permissions.Anyone,
    (agoSinceThisDate) => {
        const fixedDate = new Date(agoSinceThisDate);
        const currentDate = new Date();

        const difference = currentDate.getTime() - fixedDate.getTime();

        // Time calculations
        const years = Math.floor(difference / (365.25 * 24 * 60 * 60 * 1000));
        const months = Math.floor((difference % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
        const days = Math.floor((difference % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
        const hours = Math.floor((difference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((difference % (60 * 60 * 1000)) / (60 * 1000));

        const parts:string[] = [];

        // Function to handle pluralization
        const addTimePart = (value:number, singular:string) => {
            if (value > 0) parts.push(`${value} ${singular}${value > 1 ? 's' : ''}`);
        };

        // Add values only if greater than 0

        addTimePart(years, "year");

        addTimePart(months, "month");
        addTimePart(days, "day");
        if(years <= 0){
            addTimePart(hours, "hour");
            addTimePart(minutes, "minute");
        }

        // Final message
        return parts.length > 0 ? parts.join(" ") + " ago" : "Just now";
    }
);