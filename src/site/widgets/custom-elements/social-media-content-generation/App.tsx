import React, {FC} from "react";
import YouTubeDescriptionGenerator from "./youTube-description-generator/YouTubeDescriptionGenerator";
import { Theme } from "@radix-ui/themes";

const App: FC = (() => {
    return (<Theme><YouTubeDescriptionGenerator/></Theme>);
})

export default App;