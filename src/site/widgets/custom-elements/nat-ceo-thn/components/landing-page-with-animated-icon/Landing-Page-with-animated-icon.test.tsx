import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { composeStories } from "@storybook/react";
import * as stories from "../../../../../../stories/AILandingPage.stories";

// Compose all the stories properly to get renderable components
const {FullLandingPage} = composeStories(stories);

describe("AILandingPage", () => {
    it("renders the heading and description", () => {
        render(<FullLandingPage />);
        expect(screen.getByText("Future-ready websites with built-in AI")).toBeInTheDocument();
        expect(
            screen.getByText("Transforming ideas into intelligent digital experiences through cutting-edge AI integration and responsive design. Bringing innovation to every pixel and interaction.")
        ).toBeInTheDocument();
    });

    it("renders social links", () => {
        render(<FullLandingPage />);
        expect(screen.getByText("tmanundercover")).toBeInTheDocument();
        expect(screen.getByText("the-handsomest-nerd")).toBeInTheDocument();
        expect(screen.getByText("Hire me on Fiverr")).toBeInTheDocument();
    });

    it("handles hover states on social buttons", () => {
        render(<FullLandingPage />);
        const githubButton = screen.getByText("tmanundercover");
        fireEvent.mouseEnter(githubButton);
        expect(githubButton).toHaveStyle("color: #FFFFFF");
        fireEvent.mouseLeave(githubButton);
        expect(githubButton).toHaveStyle("color: #4A5568");
    });

    it("matches the Chromatic screenshot", async () => {
        const { container } = render(<FullLandingPage />);
        expect(container).toMatchSnapshot();
    });
});
