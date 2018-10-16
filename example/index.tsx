import * as React from "react";
import * as ReactDOM from "react-dom";
import { CircleSlider } from "../src/circle-slider";

interface IState {
    value: number;
}

export class App extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = { value: 50 };
    }
    public handleChange = (value: any) => {
        this.setState({ value });
    };

    public handleChangeRange = (event: any) => {
        this.setState({
            value: event.target.valueAsNumber,
        });
    };

    public render() {
        const { value } = this.state;
        return (
            <div className="container">
                <div className="wrapper">
                    <CircleSlider value={value} onChange={this.handleChange} />
                    <div className="title">{value}</div>
                    <div className="range">
                        <input
                            min={0}
                            max={100}
                            id="control"
                            type="range"
                            value={value}
                            onChange={this.handleChangeRange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
