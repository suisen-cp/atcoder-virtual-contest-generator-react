import { Component } from "react";
import CheckboxInput from "../atoms/CheckboxInput";

import { Source, SourceMap, sourceToDescription } from "../common/Sources"

type Props = {
    srcs: SourceMap<boolean>
    onToggle: (source: Source) => void
}

class SourceSelectorInputs extends Component<Props> {
    handleToggle = (source: Source) => {
        this.props.onToggle(source);
    }

    render() {
        return (
            <div>
                {
                    Object.entries(this.props.srcs).map(([source, checked]) => {
                        const onToggle = () => this.handleToggle(source as Source);
                        return (
                            <div key={source}>
                                <CheckboxInput label={sourceToDescription[source as Source]} value={checked} onToggle={onToggle} />
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default SourceSelectorInputs