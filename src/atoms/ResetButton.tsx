import { Component } from "react";

type Props = {
    onClick: () => void
}

class ResetButton extends Component<Props> {
    render() {
        return (
            <button className="btn-sm btn btn-outline-danger" style={{ height: "80%" }} onClick={this.props.onClick} type="reset">reset</button>
        )
    }
}

export default ResetButton