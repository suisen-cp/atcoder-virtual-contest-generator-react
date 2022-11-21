import { Component } from "react";

type Props = {
    label: string,
    value: boolean,
    onToggle: () => void
}

class CheckboxInput extends Component<Props> {
    render() {
        return (
            <label className="form-check-label form-check">
                <input type="checkbox" className="form-check-input" checked={this.props.value} onChange={this.props.onToggle}/>&nbsp;
                {this.props.label}
            </label>
        )
    }
}

export default CheckboxInput
