import { Component } from "react";
import { Problem } from "../common/Problem";
import Form, { InputData } from "../organisms/Form";
import ProblemSet from "../molucules/ProblemSet";
import { ABC, AGC, ARC, ContestInfo, getContestType, OTHER } from "../common/Contest";
import { randomChoice } from "../common/utility/RandomChoice";
import { difficultyToColor, BLACK, colors, ColorMap, Color } from "../common/Colors";
import Card from "../atoms/Card";

type States = {
    problems: Array<Problem>
}

class VirtualContestGenerator extends Component<{}, States> {
    constructor(props: {}) {
        super(props);
        this.state = {
            problems: []
        };
    }

    handleInput = (input: InputData) => {
        const strMinDate = input.dateMin;
        const strMaxDate = input.dateMax;
        const minDate = new Date(strMinDate);
        const maxDate = new Date(strMaxDate);

        const includeABC = input.srcs.abc;
        const includeARC = input.srcs.arc;
        const includeAGC = input.srcs.agc;
        const includeOther = input.srcs.other;

        const selectNum = input.nums;

        let problem_set: Array<Problem> = [];

        let self = this;

        const promiseLoadContestInfo = new Promise<Set<string> | undefined>(function (resolve, _) {
            const contestInfoURL = "https://kenkoooo.com/atcoder/resources/contests.json";
            const contestInfoRequest = new XMLHttpRequest();
            contestInfoRequest.open('GET', contestInfoURL);
            contestInfoRequest.responseType = 'json';
            contestInfoRequest.send();

            contestInfoRequest.onload = () => {
                const contest_list: Array<string> = contestInfoRequest.response
                    .filter((contest: ContestInfo) => {
                        const startDate: Date = new Date(contest["start_epoch_second"] * 1000);

                        if (strMinDate && startDate < minDate) return false;
                        if (strMaxDate && startDate > maxDate) return false;

                        const contest_type = getContestType(contest);

                        if (contest_type === ABC) {
                            return includeABC;
                        } else if (contest_type === ARC) {
                            return includeARC;
                        } else if (contest_type === AGC) {
                            return includeAGC;
                        } else if (contest_type === OTHER) {
                            return includeOther;
                        }

                        alert("Somethig wrong.")
                        return false;
                    })
                    .map(function (contest: ContestInfo) {
                        return contest["id"];
                    });

                const contests = new Set(contest_list);

                resolve(contests);
            };
            contestInfoRequest.onerror = function () {
                alert('Network Error.');
                resolve(undefined);
            };
        });

        promiseLoadContestInfo.then(function (contests?: Set<string>) {
            const promiseLoadContestProblemInfo = new Promise<Set<string> | undefined>(function (resolve, _) {
                if (contests === undefined) {
                    resolve(undefined);
                    return;
                }

                type ContestProblemInfo = {
                    contest_id: string,
                    problem_id: string,
                    problem_index: string
                }

                const contestProblemInfo = "https://kenkoooo.com/atcoder/resources/contest-problem.json";
                const contestProblemInfoRequest = new XMLHttpRequest();
                contestProblemInfoRequest.open('GET', contestProblemInfo);
                contestProblemInfoRequest.responseType = 'json';
                contestProblemInfoRequest.send();

                contestProblemInfoRequest.onload = function () {
                    const problem_list: Array<string> = contestProblemInfoRequest.response
                        .filter(function (contestProblem: ContestProblemInfo) {
                            return contests.has(contestProblem["contest_id"]);
                        })
                        .map(function (contestProblem: ContestProblemInfo) {
                            return contestProblem["problem_id"];
                        });

                    const problems = new Set(problem_list);

                    resolve(problems);
                };
                contestProblemInfoRequest.onerror = function () {
                    alert('Network Error.');

                    resolve(undefined);
                };
            });

            promiseLoadContestProblemInfo.then(function (problems?: Set<string>) {
                const promiseLoadProblemModel = new Promise<ColorMap<Array<string>> | undefined>(function (resolve, _) {
                    if (problems === undefined) {
                        resolve(undefined);
                        return;
                    }

                    type ProblemModel = {
                        slope?: number,
                        intercept?: number,
                        variance?: number,
                        difficulty?: number,
                        discrimination?: number,
                        irt_loglikelihood?: number,
                        irt_users?: number,
                        is_experimental?: boolean
                    }
                    type ProblemModels = {
                        [s in string]: ProblemModel
                    }

                    const difficultyInfoURL = "https://kenkoooo.com/atcoder/resources/problem-models.json";
                    const difficultyInfoRequest = new XMLHttpRequest();
                    difficultyInfoRequest.open('GET', difficultyInfoURL);
                    difficultyInfoRequest.responseType = 'json';
                    difficultyInfoRequest.send();

                    difficultyInfoRequest.onload = function () {
                        let problemsGroupByColor = {} as ColorMap<Array<string>>;
                        colors.forEach((color: Color) => problemsGroupByColor[color] = []);

                        const difficultyInfo: ProblemModels = difficultyInfoRequest.response;

                        problems.forEach((problem: string) => {
                            const color = problem in difficultyInfo ? difficultyToColor(difficultyInfo[problem]["difficulty"]) : BLACK;
                            problemsGroupByColor[color].push(problem)
                        });

                        resolve(problemsGroupByColor);
                    };
                    difficultyInfoRequest.onerror = function () {
                        alert('Network Error.');
                        resolve(undefined);
                    };
                });
                promiseLoadProblemModel.then(function (problemsGroupByColor?: ColorMap<Array<string>>) {
                    if (problemsGroupByColor === undefined) {
                        return;
                    }

                    colors.forEach((color) => {
                        if (problemsGroupByColor[color].length < selectNum[color]) {
                            alert(`There are not enough problems. Category: ${color}`);
                            return;
                        }

                        randomChoice(problemsGroupByColor[color], selectNum[color]).forEach((id: string) => {
                            problem_set.push({
                                id: id,
                                color: color,
                            })
                        })
                    });

                    self.setState({ problems: problem_set });
                });
            });
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Card title="設定">
                        <Form handleInput={this.handleInput} />
                    </Card>
                </div>
                <div style={{ paddingTop: "0.5em" }}>
                    <Card title="問題セット">
                        <ProblemSet problems={this.state.problems} />
                    </Card>
                </div>
            </div>
        );
    }
};

export default VirtualContestGenerator