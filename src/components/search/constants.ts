// ジャンル名マッピング
export const GENRE_NAMES: Record<number, string> = {
    0: "general",
    1: "artist",
    3: "copyright",
    4: "character",
    5: "meta",
};

// ジャンル色マッピング
export const GENRE_COLORS: Record<number, "gray" | "purple" | "orange" | "green" | "blue"> = {
    0: "gray",      // general
    1: "purple",    // artist
    3: "orange",    // copyright
    4: "green",     // character
    5: "blue",      // meta
};
