import * as React from "react";
import * as ReactDOM from "react-dom";
import { CircularSlider } from "../src";
declare let module: any;

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

ReactDOM.render(
    <div>
        <App />
    </div>,
    document.getElementById("root"),
);

if (module.hot) {
    module.hot.accept();
}
