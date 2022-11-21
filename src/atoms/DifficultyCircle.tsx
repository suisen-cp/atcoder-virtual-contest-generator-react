import { Color } from "../common/Colors";

const DifficultyCircle = (props: { color: Color }) => {
    const className = "difficulty-circle " + props.color;
    return <span className={className}/>
};

export default DifficultyCircle;
