import { PropsWithChildren } from "react";

type Props = {
    title: string
} & PropsWithChildren

const Card = (props: Props) => (
    <div className="card">
        <div className="card-header">
            <h2 className="card-title">{props.title}</h2>
        </div>
        <div className="card-body">
            {props.children}
        </div>
    </div>
);

export default Card