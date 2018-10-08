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
        // tslint:disable-next-line:no-console
        console.log(`Changed value ${value}`);
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
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircleSlider value={value} onChange={this.handleChange} />
                <div
                    style={{
                        textAlign: "center",
                        fontFamily: "sans-serif",
                        marginTop: "0.5rem",
                    }}
                >
                    {value}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "0.5rem",
                    }}
                >
                    <input
                        id="control"
                        type="range"
                        value={value}
                        onChange={this.handleChangeRange}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
