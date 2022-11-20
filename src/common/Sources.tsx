export const sources = [
    "abc",
    "arc",
    "agc",
    "other"
] as const;

export type Source = (typeof sources)[number]

export type SourceMap<T> = {
    [color in Source]: T
};

export function initSourceMap<T>(default_value: T) : SourceMap<T> {
    let res = {} as SourceMap<T>;
    sources.forEach((color: string) => res[color as Source] = default_value );
    return res;
}
export function updateSourceMap<T>(mp: Readonly<SourceMap<T>>, color: Source, new_val: T) : SourceMap<T> {
    let res : SourceMap<T> = Object.assign({}, mp);
    res[color] = new_val;
    return res;
}

export const sourceToDescription : SourceMap<string> = {
    abc: "ABC, ABC-Like",
    arc: "ARC, ARC-Like",
    agc: "AGC, AGC-Like",
    other: "Others"
};