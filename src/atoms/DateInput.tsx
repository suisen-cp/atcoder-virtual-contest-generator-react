import { Component } from "react";

type Props = {
    label: string,
    value: string,
    onDateChange: (new_value: string) => void
}

class DateInput extends Component<Props, {}> {
    handleChange : React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onDateChange(event.target.value);
    };

    render() {
        return (
            <label className="form-label">
                {this.props.label}
                <input type="date" className="form-control" value={this.props.value} onChange={this.handleChange} />
            </label>
        );
    }
};

export default DateInput
