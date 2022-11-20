import { Component, MouseEventHandler } from "react";
import DateInputs from "../molucules/DateInputs";
import ProblemNumberInputs from "../molucules/ProblemNumberInputs";
import { ColorMap, Color, initColorMap } from "../common/Colors";
import { initSourceMap, Source, SourceMap } from "../common/Sources";
import SourceSelectorInputs from "../molucules/SourceSelectorInputs";
import ResetButton from "../atoms/ResetButton";

type State = {
    dateMin: string,
    dateMax: string,
    nums: ColorMap<number>,
    srcs: SourceMap<boolean>
}
export type InputData = State

type Props = {
    handleInput: (input: InputData) => void
};

class Form extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            dateMin: '',
            dateMax: '',
            nums: initColorMap(0),
            srcs: initSourceMap(true)
        }
    }

    handleClick: MouseEventHandler<HTMLButtonElement> = () => {
        this.props.handleInput(this.state);
    }

    handleNumberChange = (color: Color, new_num: number) => {
        let new_state = { ...this.state };
        new_state.nums[color] = new_num;
        this.setState(new_state);
    };
    handleResetNumber = () => {
        let new_state = { ...this.state };
        new_state.nums = initColorMap(0);
        this.setState(new_state);
    };

    handleToggleSource = (source: Source) => {
        let new_state = { ...this.state };
        new_state.srcs[source] = !new_state.srcs[source];
        this.setState(new_state);
    };
    handleResetSources = () => {
        let new_state = { ...this.state };
        new_state.srcs = initSourceMap(true);
        this.setState(new_state);
    };

    handleMinDateChange = (new_date: string) => {
        this.setState({ dateMin: new_date });
    };
    handleMaxDateChange = (new_date: string) => {
        this.setState({ dateMax: new_date });
    };
    handleResetDate = () => {
        this.setState({ dateMin: '', dateMax: '' });
    };

    render() {
        return (
            <div>
                <h4>Difficulty <ResetButton onClick={this.handleResetNumber}/> </h4>
                <ProblemNumberInputs nums={this.state.nums} onNumberChange={this.handleNumberChange} />

                <h4>出典 <ResetButton onClick={this.handleResetSources}/> </h4>
                <SourceSelectorInputs srcs={this.state.srcs} onToggle={this.handleToggleSource}/>

                <h4>コンテスト開始時刻 <ResetButton onClick={this.handleResetDate}/> </h4>
                <DateInputs
                    dateMin={this.state.dateMin}
                    dateMax={this.state.dateMax}
                    onMinDateChange={this.handleMinDateChange}
                    onMaxDateChange={this.handleMaxDateChange}
                />
                <button type="button" className="btn btn-primary w-100" onClick={this.handleClick}>
                    Generate Virtual Contest
                </button>
            </div>
        )
    }
}

export default Form;
