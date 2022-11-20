import { Component } from "react";
import DifficultyCircle from "../atoms/DifficultyCircle";
import { Problem } from "../common/Problem";

type Props = {
    problems: Array<Problem>
}

class ProblemSet extends Component<Props> {
    render() {
        return (
            <div>
                <ol type="A">
                {
                    this.props.problems.map((problem: Problem) => {
                        return (
                            <li key={problem.id}>
                                <DifficultyCircle color={problem.color}/>
                                {problem.id}
                            </li>
                        );
                    })
                }
                </ol>
            </div>
        );
    }
}

export default ProblemSet
