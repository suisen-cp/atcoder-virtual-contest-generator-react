export type ContestInfo = {
    id: string,
    start_epoch_second: number,
    duration_second: number,
    title: string,
    rate_change: string
}

export type ContestType = "abc" | "arc" | "agc" | "other"

export const ABC: ContestType = "abc";
export const ARC: ContestType = "arc";
export const AGC: ContestType = "agc";
export const OTHER: ContestType = "other";

export function getContestType(contest: ContestInfo): ContestType {
    const contest_id = contest["id"];

    if (contest_id.match(/abc[0-9]+/)) return "abc";
    if (contest_id.match(/arc[0-9]+/)) return "arc";
    if (contest_id.match(/agc[0-9]+/)) return "agc";

    const rate_change = contest["rate_change"];

    if (rate_change === " ~ 1199") return "abc";
    if (rate_change === " ~ 1999") return "abc";
    if (rate_change === " ~ 2799") return "arc";
    if (rate_change === "ALL") return "agc";

    return "other";
}
