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
                        progressWidth={5}
                        circleWidth={5}
                        knobRadius={5}
                        onChange={this.handleChange}
                    />
                    <div className="title">{value}</div>
                    <div className="range">
                        <input
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
                        progressWidth={10}
                        circleWidth={5}
                        knobRadius={8}
                        size={80}
                        knobColor="#9D74FC"
                        progressColor="#9D74FC"
                        disabled={true}
                        onChange={this.handleChange}
                    />
                    <div className="title">{value}</div>
                    <div className="range">
                        <input
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
                        progressWidth={4}
                        circleWidth={12}
                        knobRadius={10}
                        knobColor="#41cb93"
                        progressColor="#41cb93"
                        onChange={this.handleChange}
                    />
                    <div className="title">{value}</div>
                    <div className="range">
                        <input
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
                        progressWidth={12}
                        circleWidth={5}
                        size={150}
                        knobRadius={10}
                        knobColor="#41cb93"
                        progressColor="#41cb93"
                        onChange={this.handleChange}
                    />
                    <div className="title">{value}</div>
                    <div className="range">
                        <input
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
                        progressWidth={10}
                        circleWidth={5}
                        knobRadius={5}
                        onChange={this.handleChange}
                    />
                    <div className="title">{value}</div>
                    <div className="range">
                        <input
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
