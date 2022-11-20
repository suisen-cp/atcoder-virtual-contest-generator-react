import { Component } from "react";

type Props = {
    onClick: () => void
}

class ResetButton extends Component<Props> {
    render() {
        return (
            <button className="btn btn-danger" onClick={this.props.onClick} type="reset">reset</button>
        )
    }
}

export default ResetButton