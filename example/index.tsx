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
                <div className="wrapper">
                    <CircleSlider
                        value={value}
                        size={150}
                        shadow={false}
                        knobColor="#ff5722"
                        onChange={this.handleChange}
                        showTooltip={true}
                        progressColor="#FDB11B"
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
                </div>
                <div className="wrapper">
                    <CircleSlider
                        value={value}
                        onChange={this.handleChange}
                        progressColor="#6C7290"
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
                </div>
                <div className="wrapper">
                    <CircleSlider
                        value={value}
                        size={120}
                        knobRadius={15}
                        progressWidth={20}
                        circleWidth={3}
                        onChange={this.handleChange}
                        progressColor="#6656B6"
                        tooltipColor="#6ab6e1"
                        showTooltip={true}
                        tooltipSize={26}
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
                </div>
                <div className="wrapper">
                    <CircleSlider
                        value={value}
                        size={140}
                        knobRadius={20}
                        progressWidth={20}
                        circleWidth={10}
                        onChange={this.handleChange}
                        progressColor="#5DC9A3"
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
                </div>
                <div className="wrapper">
                    <CircleSlider
                        value={value}
                        size={140}
                        knobRadius={15}
                        progressWidth={10}
                        circleWidth={25}
                        onChange={this.handleChange}
                        progressColor="#6AB6E1"
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
                </div>
                <div className="code">
                    <SyntaxHighlighter language="bash" style={vs}>
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
