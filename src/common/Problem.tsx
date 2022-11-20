import { Color } from "./Colors"

export type Problem = {
    problemID: string,
    contestID: string,
    problemTitle: string,
    contestTitle: string,
    problemIndex: string,
    color: Color
}

export const toAtCoderURL = function (problem: Problem): URL {
    return new URL(`https://atcoder.jp/contests/${problem.contestID}/tasks/${problem.problemID}`);
}
