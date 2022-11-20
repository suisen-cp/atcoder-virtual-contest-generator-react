export const BLACK = "black";
export const GRAY = "gray";
export const BROWN = "brown";
export const GREEN = "green";
export const CYAN = "cyan";
export const BLUE = "blue";
export const YELLOW = "yellow";
export const ORANGE = "orange";
export const RED = "red";
export const BRONZE = "bronze";
export const SILVER = "silver";
export const GOLD = "gold";

export const colors = [
    BLACK,
    GRAY,
    BROWN,
    GREEN,
    CYAN,
    BLUE,
    YELLOW,
    ORANGE,
    RED,
    BRONZE,
    SILVER,
    GOLD
] as const;

export type Color = (typeof colors)[number]

export type ColorMap<T> = {
    [color in Color]: T
};

export function initColorMap<T>(default_value: T) : ColorMap<T> {
    let res = {} as ColorMap<T>;
    colors.forEach((color: string) => res[color as Color] = default_value );
    return res;
}
export function updateColorMap<T>(mp: Readonly<ColorMap<T>>, color: Color, new_val: T) : ColorMap<T> {
    let res : ColorMap<T> = Object.assign({}, mp);
    res[color] = new_val;
    return res;
}

export const colorToDifficultyDescription : ColorMap<string> = {
    black: "Unknown",
    gray: "0~400",
    brown: "400~800",
    green: "800~1200",
    cyan: "1200~1600",
    blue: "1600~2000",
    yellow: "2000~2400",
    orange: "2400~2800",
    red: "2800~3200",
    bronze: "3200~3600",
    silver: "3600~4000",
    gold: "4000~inf",
};

export function difficultyToColor(difficulty?: number) {
    if (difficulty === undefined) return BLACK;
    const index = Math.min(1 + Math.max(0, Math.floor(difficulty / 400)), colors.length - 1);
    return colors[index];
}