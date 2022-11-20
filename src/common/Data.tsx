import { BLACK, Color, difficultyToColor } from "./Colors";
import { Contest, ContestType } from "./Contest";
import { ContestProblem } from "./ContestProblem";

type RawContest = {
    id: string,
    start_epoch_second: number,
    duration_second: number,
    title: string,
    rate_change: string
}
type RawContestProblem = {
    contest_id: string,
    problem_id: string,
    problem_index: string
}
type RawProblemModel = {
    slope?: number,
    intercept?: number,
    variance?: number,
    difficulty?: number,
    discrimination?: number,
    irt_loglikelihood?: number,
    irt_users?: number,
    is_experimental?: boolean
}
type RawProblemModels = {
    [s in string]: RawProblemModel
}
type RawProblemDetail = {
    id: string,
    contest_id: string,
    problem_index: string,
    name: string,
    title: string,
    shortest_submission_id : number,
    shortest_contest_id: string,
    shortest_user_id: string,
    fastest_submission_id: number,
    fastest_contest_id: string,
    fastest_user_id: string,
    first_submission_id: number,
    first_contest_id: string,
    first_user_id: string,
    source_code_length: number,
    execution_time: 4,
    point: number,
    solver_count: number
}

function getContestType(contest: RawContest): ContestType {
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

class Data {
    private contests: Array<Contest> = [];
    private contestProblems: Array<ContestProblem> = [];
    private difficultyMap: Map<string, Color> = new Map();
    private titleMap: Map<string, string> = new Map();

    static async load() : Promise<Data> {
        console.log("load");
        let data: Data = new Data();
        data.contests = await Data.loadContests();
        data.contestProblems = await Data.loadContestProblems();
        data.difficultyMap = await Data.loadDifficultyMap();
        data.titleMap = await Data.loadTitleMap();

        return data;
    }

    getContests() {
        return this.contests;
    }
    getContestProblems() {
        return this.contestProblems;
    }
    getDifficultyCategory(problemID: string) {
        return this.difficultyMap.get(problemID) || BLACK;
    }
    getTitle(problemID: string) {
        return this.titleMap.get(problemID) as string;
    }

    private static loadContests() {
        return new Promise<Array<Contest>>((resolve, reject) => {
            const contestInfoURL = "https://kenkoooo.com/atcoder/resources/contests.json";
            const contestInfoRequest = new XMLHttpRequest();
            contestInfoRequest.open('GET', contestInfoURL);
            contestInfoRequest.responseType = 'json';
            contestInfoRequest.send();
        
            let contestList: Array<Contest> = [];
            
            contestInfoRequest.onload = () => {
                const contestInfo : Array<RawContest> = contestInfoRequest.response;
                contestList = contestInfo.map((contest: RawContest) : Contest => {
                    const startDate: Date = new Date(contest["start_epoch_second"] * 1000);
                    const contest_type = getContestType(contest);
                    return {
                        id: contest.id,
                        title: contest.title,
                        type: contest_type,
                        startDate: startDate,
                    }
                });
                resolve(contestList);
            };
            contestInfoRequest.onerror = function () {
                alert('Network Error.');
                reject();
            };
        });
    }

    private static loadContestProblems() {
        return new Promise<Array<ContestProblem>>((resolve, reject) => {
            const contestProblemInfoURL = "https://kenkoooo.com/atcoder/resources/contest-problem.json";
            const contestProblemInfoRequest = new XMLHttpRequest();
            contestProblemInfoRequest.open('GET', contestProblemInfoURL);
            contestProblemInfoRequest.responseType = 'json';
            contestProblemInfoRequest.send();
        
            let contestProblemList: Array<ContestProblem> = [];
            
            contestProblemInfoRequest.onload = () => {
                const contestInfo : Array<RawContestProblem> = contestProblemInfoRequest.response;
                contestProblemList = contestInfo.map((contestProbelm: RawContestProblem) : ContestProblem => {
                    return {
                        contestID: contestProbelm.contest_id,
                        problemID: contestProbelm.problem_id,
                        problemIndex: contestProbelm.problem_index
                    }
                });
                resolve(contestProblemList);
            };
            contestProblemInfoRequest.onerror = function () {
                alert('Network Error.');
                reject();
            };
        });
    }

    private static async loadDifficultyMap() {
        return new Promise<Map<string, Color>>((resolve, reject) => {
            const difficultyInfoURL = "https://kenkoooo.com/atcoder/resources/problem-models.json";
            const difficultyInfoRequest = new XMLHttpRequest();
            difficultyInfoRequest.open('GET', difficultyInfoURL);
            difficultyInfoRequest.responseType = 'json';
            difficultyInfoRequest.send();
        
            let problemDifficultyMap : Map<string, Color> = new Map();
        
            difficultyInfoRequest.onload = function () {
                const difficultyInfo: RawProblemModels = difficultyInfoRequest.response;
        
                Object.entries(difficultyInfo).forEach(([id, problemModel]) => {
                    const color = id in difficultyInfo ? difficultyToColor(problemModel.difficulty) : BLACK;
                    problemDifficultyMap.set(id, color);
                });
                resolve(problemDifficultyMap);
            };
            difficultyInfoRequest.onerror = function () {
                alert('Network Error.');
                reject();
            };
        });
    }

    private static async loadTitleMap() {
        return new Promise<Map<string, string>>((resolve, reject) => {
            const problemDetailURL = "https://kenkoooo.com/atcoder/resources/merged-problems.json";
            const problemDetailRequest = new XMLHttpRequest();
            problemDetailRequest.open('GET', problemDetailURL);
            problemDetailRequest.responseType = 'json';
            problemDetailRequest.send();
        
            let problemTitleMap : Map<string, string> = new Map();
        
            problemDetailRequest.onload = function () {
                const problemDetails: Array<RawProblemDetail> = problemDetailRequest.response;
        
                problemDetails.forEach((problemDetail: RawProblemDetail) => {
                    problemTitleMap.set(problemDetail.id, problemDetail.title);
                });
                resolve(problemTitleMap);
            };
            problemDetailRequest.onerror = function () {
                alert('Network Error.');
                reject();
            };
        });
    }
}

export default Data


// const contestList : Array<Contest> = function() {
//     const contestInfoURL = "https://kenkoooo.com/atcoder/resources/contests.json";
//     const contestInfoRequest = new XMLHttpRequest();
//     contestInfoRequest.open('GET', contestInfoURL);
//     contestInfoRequest.responseType = 'json';
//     contestInfoRequest.send();

//     let contestList: Array<Contest> = [];
    
//     contestInfoRequest.onload = () => {
//         const contestInfo : Array<RawContest> = contestInfoRequest.response;
//         contestList = contestInfo.map((contest: RawContest) : Contest => {
//             const startDate: Date = new Date(contest["start_epoch_second"] * 1000);
//             const contest_type = getContestType(contest);
//             return {
//                 id: contest.id,
//                 title: contest.title,
//                 type: contest_type,
//                 startDate: startDate,
//             }
//         });
//     };
//     contestInfoRequest.onerror = function () {
//         alert('Network Error.');
//     };

//     return contestList;
// }();

// const contestProblemList = function() {
//     const contestProblemInfoURL = "https://kenkoooo.com/atcoder/resources/contest-problem.json";
//     const contestProblemInfoRequest = new XMLHttpRequest();
//     contestProblemInfoRequest.open('GET', contestProblemInfoURL);
//     contestProblemInfoRequest.responseType = 'json';
//     contestProblemInfoRequest.send();

//     let contestProblemList: Array<ContestProblem> = [];
    
//     contestProblemInfoRequest.onload = () => {
//         const contestInfo : Array<RawContestProblem> = contestProblemInfoRequest.response;
//         contestProblemList = contestInfo.map((contestProbelm: RawContestProblem) : ContestProblem => {
//             return {
//                 contestID: contestProbelm.contest_id,
//                 problemID: contestProbelm.problem_id,
//                 problemIndex: contestProbelm.problem_index
//             }
//         });
//     };
//     contestProblemInfoRequest.onerror = function () {
//         alert('Network Error.');
//     };

//     return contestProblemList;
// }();

// const problemDifficultyMap = function() {
//     const difficultyInfoURL = "https://kenkoooo.com/atcoder/resources/problem-models.json";
//     const difficultyInfoRequest = new XMLHttpRequest();
//     difficultyInfoRequest.open('GET', difficultyInfoURL);
//     difficultyInfoRequest.responseType = 'json';
//     difficultyInfoRequest.send();

//     let problemDifficultyMap : Map<string, Color> = new Map();

//     difficultyInfoRequest.onload = function () {
//         const difficultyInfo: RawProblemModels = difficultyInfoRequest.response;

//         contestProblemList.forEach((problem: ContestProblem) => {
//             const problemID = problem.problemID;
//             const color = problemID in difficultyInfo ? difficultyToColor(difficultyInfo[problemID]["difficulty"]) : BLACK;
//             problemDifficultyMap.set(problem.problemID, color);
//         });
//     };
//     difficultyInfoRequest.onerror = function () {
//         alert('Network Error.');
//     };
//     return problemDifficultyMap;
// }();

// const problemTitleMap = function() {
//     const problemDetailURL = "https://kenkoooo.com/atcoder/resources/merged-problems.json";
//     const problemDetailRequest = new XMLHttpRequest();
//     problemDetailRequest.open('GET', problemDetailURL);
//     problemDetailRequest.responseType = 'json';
//     problemDetailRequest.send();

//     let problemTitleMap : Map<string, string> = new Map();

//     problemDetailRequest.onload = function () {
//         const problemDetails: Array<RawProblemDetail> = problemDetailRequest.response;

//         problemDetails.forEach((problemDetail: RawProblemDetail) => {
//             problemTitleMap.set(problemDetail.id, problemDetail.title);
//         });
//     };
//     problemDetailRequest.onerror = function () {
//         alert('Network Error.');
//     };
//     return problemTitleMap;
// }();

// export { contestList, contestProblemList, problemDifficultyMap, problemTitleMap }
