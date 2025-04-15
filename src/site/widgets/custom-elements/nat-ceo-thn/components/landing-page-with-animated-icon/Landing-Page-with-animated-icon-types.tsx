import { GitHub, LinkedIn, ArrowDown } from "@wix/wix-ui-icons-common";

export interface SocialLinkType {
    icon: typeof GitHub | typeof LinkedIn | typeof ArrowDown;
    username: string;
    platform: string;
    url: string;
}
