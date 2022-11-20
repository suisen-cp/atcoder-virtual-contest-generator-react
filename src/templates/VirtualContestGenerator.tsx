import { Component } from "react";
import { Problem } from "../common/Problem";
import Form, { InputData } from "../organisms/Form";
import ProblemSet from "../molucules/ProblemSet";
import { ABC, AGC, ARC, OTHER, Contest } from "../common/Contest";
import { randomChoice } from "../common/utility/RandomChoice";
import { colors, ColorMap, Color } from "../common/Colors";
import Card from "../atoms/Card";
import Data from "../common/Data";
import { ContestProblem } from "../common/ContestProblem";

type States = {
    problems: Array<Problem>
}

class VirtualContestGenerator extends Component<{}, States> {
    static promiseData: Promise<Data> = Data.load();

    constructor(props: {}) {
        super(props);
        this.state = {
            problems: []
        };
    }

    handleInput = (input: InputData) => {
        VirtualContestGenerator.promiseData.then((data) => {
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

            const filteredContestList = data.getContests().filter((contest: Contest) => {
                if (strMinDate && contest.startDate < minDate) return false;
                if (strMaxDate && contest.startDate > maxDate) return false;

                if (contest.type === ABC) {
                    return includeABC;
                } else if (contest.type === ARC) {
                    return includeARC;
                } else if (contest.type === AGC) {
                    return includeAGC;
                } else if (contest.type === OTHER) {
                    return includeOther;
                }
                return false;
            });

            const filteredContestIDs = new Map(filteredContestList.map((contest: Contest) => {
                return [contest.id, contest.title];
            }));

            const filteredContestProblemList = data.getContestProblems().filter((contestProblem: ContestProblem) => {
                return filteredContestIDs.has(contestProblem.contestID);
            });

            let problemsGroupByColor = {} as ColorMap<Array<ContestProblem>>;
            colors.forEach((color: Color) => problemsGroupByColor[color] = []);

            filteredContestProblemList.forEach((contestProblem: ContestProblem) => {
                const color: Color = data.getDifficultyCategory(contestProblem.problemID);
                problemsGroupByColor[color].push(contestProblem)
            });

            colors.forEach((color) => {
                if (problemsGroupByColor[color].length < selectNum[color]) {
                    alert(`There are not enough problems. Category: ${color}`);
                    return;
                }

                randomChoice(problemsGroupByColor[color], selectNum[color]).forEach((problem: ContestProblem) => {
                    problem_set.push({
                        problemID: problem.problemID,
                        contestID: problem.contestID,
                        problemTitle: data.getTitle(problem.problemID),
                        contestTitle: filteredContestIDs.get(problem.contestID) as string,
                        problemIndex: problem.problemIndex,
                        color: color,
                    })
                })
            });

            this.setState({ problems: problem_set });
        });
    }

    render() {
        return (
            <div>
                <div><h1>AtCoder Virtual Contest Generator</h1></div>
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