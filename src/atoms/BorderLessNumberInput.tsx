import { ChangeEvent, ChangeEventHandler, Component } from "react"

type Props = {
    value: number
    onNumberChange: (new_num: number) => void
}

class BorderLessNumerInput extends Component<Props> {

    handleChange : ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.onNumberChange(parseInt(event.target.value));
    }

    render() {
        return <input type="number" min="0" className="table-input" value={this.props.value} onChange={this.handleChange}/>
    }
}

export default BorderLessNumerInput