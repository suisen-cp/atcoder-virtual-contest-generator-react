import { Component } from "react";

type Props = {
    label: string,
    value: string,
    onDateChange: (new_value: string) => void
}

class DateInput extends Component<Props, {}> {
    handleChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onDateChange(event.target.value);
    };

    render() {
        return (
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">
                    {this.props.label}
                </label>
                <div className="col-sm-10">
                    <input type="date" className="form-control" value={this.props.value} onChange={this.handleChange} />
                </div>
            </div>
        );
    }
};

export default DateInput
