export const POST_RATE_LIMIT = 30; // Minimum wait time between posts
export const POST_MAX_CHARS = 200;
export const FEED_REFRESH_INTERVAL = 3000;
export const POST_FEEDS = {
    PUBLIC: "public",
    FOLLOWING: "following",
    USER: "user",
};
export const ERROR_MSGS = {
    RATE_LIMITED: `Whoah, hold on there! You can only post every ${POST_RATE_LIMIT} seconds.`,
};

// Keys
export const POSTS_STORE_KEY = "posts";

export const themes = {
    dark: {
        errorRed: "#C92F45",
        successGreen: "#3bab5b",
        mainBackground: "#111111",
        card: "#1D1D22",
        text: "#ffffff",
        mediumText: "#e5e5e7",
        lightText: "#cbcbcf",
        profileHover: "#26262a",
        buttonPrimary: "#1D8BFE",
        buttonPrimaryText: "#ffffff",
        buttonPrimaryHoverBackground: "#1873d3",
        buttonPrimaryHoverText: "#ffffff",
        buttonSecondary: "transparent",
        buttonSecondaryText: "#1D8BFE",
        buttonSecondaryBorder: "#1D8BFE",
        buttonSecondaryHoverBackground: "#1A2E4B",
        buttonSecondaryHoverText: "#1D8BFE",
        buttonLink: "transparent",
        buttonLinkText: "#1D8BFE",
        buttonLinkHoverBackground: "transparent",
        buttonLinkHoverText: "#ffffff",
        postBorder: "#1D1D22",
        tooltipBackground: "#1D1D22",
        tooltipBorder: "#4c4c4c",
        snackbarText: "#ffffff",
        snackbarError: "#C92F45",
        snackbarSuccess: "#3bab5b",
    },
    light: {
        mainBackground: "red",
        card: "blue",
        text: "#ffffff",
        lightText: "#cbcbcf",
        profileHover: "#26262a",
        buttonPrimary: "#237BFF",
        buttonSecondary: "#1E1E1E",
        buttonSecondaryBorder: "#cbcbcf",
    },
};
