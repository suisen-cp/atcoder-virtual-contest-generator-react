export type ContestType = "abc" | "arc" | "agc" | "other"

export type Contest = {
    id: string,
    title: string,
    type: ContestType,
    startDate: Date
}

export const ABC: ContestType = "abc";
export const ARC: ContestType = "arc";
export const AGC: ContestType = "agc";
export const OTHER: ContestType = "other";
