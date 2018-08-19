import * as ReactDOM from "react-dom";
import * as React from "react";
import { CircularSlider } from "../src/circular-slider";

interface IState {
    value: number;
}

export class App extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = { value: 0 };
    }
    handleChange = (value: any) => {
        this.setState({ value });
    };

    handleChangle = () => {};

    render() {
        return (
            <div>
                <CircularSlider
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
