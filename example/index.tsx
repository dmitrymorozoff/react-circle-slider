import * as React from "react";
import * as ReactDOM from "react-dom";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { vs } from "react-syntax-highlighter/styles/prism";
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
        const codeString = `npm install --save react-circle-slider`;
        return (
            <div className="container">
                <div className="wrapper">
                    <CircleSlider
                        value={value}
                        onChange={this.handleChange}
                        showTooltip={true}
                    />
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
                    <div className="code">
                        <SyntaxHighlighter language="bash" style={vs}>
                            {codeString}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
