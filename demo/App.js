import React, { Component } from "react";
import { CircularSlider } from "../source/index";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
    }
    handleChange = value => {
        this.setState({ value });
    };

    handleChangle = () => {};
    render() {
        return (
            <div>
                <CircularSlider value={this.state.value} onChange={this.handleChange} />
                <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
                    {this.state.value}
                </div>
            </div>
        );
    }
}
