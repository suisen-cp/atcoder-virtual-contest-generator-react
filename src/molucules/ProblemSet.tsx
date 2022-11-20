import { Component } from "react";
import DifficultyCircle from "../atoms/DifficultyCircle";
import { Problem, toAtCoderURL } from "../common/Problem";

type Props = {
    problems: Array<Problem>
}

class ProblemSet extends Component<Props> {
    render() {
        return (
            <div>
                <div className="table-responsive">
                    <table className="table" style={{ tableLayout: "fixed" }}>
                        <thead>
                            <tr>
                                <th style={{ width: "1em" }}></th>
                                <th>ID</th>
                                <th>Contest</th>
                                <th>Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.problems.map((problem: Problem, index: number) => {
                                    return (
                                        <tr key={problem.problemID}>
                                            <th>
                                                <DifficultyCircle color={problem.color} />
                                            </th>
                                            <th>
                                                {/* {String.fromCharCode(65 + index)}.&nbsp; */}
                                                <a href={toAtCoderURL(problem).toString()}>{problem.problemID}</a>
                                            </th>
                                            <th>
                                                {problem.contestTitle}
                                            </th>
                                            <th>
                                                {problem.problemTitle}
                                            </th>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ProblemSet
