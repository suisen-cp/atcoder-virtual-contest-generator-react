import { Component } from "react";
import DateInput from "../atoms/DateInput";

type Props = {
    dateMin: string,
    dateMax: string,
    onMinDateChange: (new_date: string) => void,
    onMaxDateChange: (new_date: string) => void,
}

class DateInputs extends Component<Props> {
    handleMinDateChange = (new_date: string) => {
        this.props.onMinDateChange(new_date);
    }

    handleMaxDateChange = (new_date: string) => {
        this.props.onMaxDateChange(new_date);
    }

    render() {
        return (
            <div>
                <div>
                    <DateInput label="Min" value={this.props.dateMin} onDateChange={this.handleMinDateChange} />
                </div>
                <div>
                    <DateInput label="Max" value={this.props.dateMax} onDateChange={this.handleMaxDateChange} />
                </div>
            </div>
        )
    }
}

export default DateInputs
