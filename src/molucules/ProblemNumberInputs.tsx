import { Component } from "react";
import BorderLessNumerInput from "../atoms/BorderLessNumberInput";
import DifficultyCircle from "../atoms/DifficultyCircle";
import { Color, ColorMap, colorToDifficultyDescription } from "../common/Colors";

type Props = {
    nums: ColorMap<number>
    onNumberChange: (color: Color, new_num: number) => void
};

class ProblemNumberInputs extends Component<Props> {
    handleNumberChange = (color: Color, new_num: number) => {
        this.props.onNumberChange(color, new_num);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table" style={{ tableLayout: "fixed" }}>
                    <thead>
                        <tr>
                            <td className="table-entry" style={{ width: "4em" }}>難易度</td>
                            {
                                Object.entries(colorToDifficultyDescription).map(
                                    ([color, description]) => {
                                        return (
                                            <th scope="col" className="table-entry" key={color}>
                                                <DifficultyCircle color={color as Color}/><br/>{description}
                                            </th>
                                        );
                                    }
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table-entry">問題数</td>
                            {
                                Object.entries(this.props.nums).map(
                                    ([color, num]) => {
                                        const onNumberChange = (new_num: number) => this.handleNumberChange(color as Color, new_num);
                                        return (
                                            <th scope="row" className="table-entry" key={color}>
                                                <BorderLessNumerInput value={num} onNumberChange={onNumberChange} />
                                            </th>
                                        );
                                    }
                                )
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export { type ColorMap }
export default ProblemNumberInputs