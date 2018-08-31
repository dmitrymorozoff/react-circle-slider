import * as React from "react";
import * as ReactDOM from "react-dom";
import { CircleSlider } from "../src/circle-slider";

interface IState {
    value: number;
}

export class App extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = { value: 0 };
    }
    public handleChange = (value: any) => {
        this.setState({ value });
    };

    public handleChangle = (value: number) => {
        // tslint:disable-next-line:no-console
        console.log(`Changed value ${value}`);
    };

    public render() {
        return (
            <div>
                <CircleSlider
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
                    {this.state.value}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
