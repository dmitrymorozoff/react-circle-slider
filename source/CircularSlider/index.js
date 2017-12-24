import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.scss";

export class CircularSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPinching: false
        };
    }
    componentDidMount() {
        this.x = 0;
        this.y = 0;
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
    }

    handleMouseUp = () => {
        this.setState({ isPinching: false });
    };

    handleMouseDown = e => {
        e.preventDefault();
        const { left, top, width, height } = this.potar.getBoundingClientRect();
        this.x = e.pageX - (left + width / 2);
        this.y = top + height / 2 - e.pageY;
        this.setState({ isPinching: true });
    };

    handleMouseMove = e => {
        if (this.state.isPinching) {
            const { left, top, width, height } = this.potar.getBoundingClientRect();
            const x = e.pageX - (left + width / 2);
            const y = top + height / 2 - e.pageY;
            const dx = (x - this.x) / 100;
            const dy = (y - this.y) / 100;
            this.x = x;
            this.y = y;
            if (this.props.onChange) {
                let xValue = this.props.value + dx;
                let yValue = this.props.value + dy;
                if (xValue < 0) {
                    xValue = 0;
                }
                if (xValue > 1) {
                    xValue = 1;
                }
                if (yValue < 0) {
                    yValue = 0;
                }
                if (yValue > 1) {
                    yValue = 1;
                }
                this.props.onChange(xValue, yValue);
            }
        }
    };

    render() {
        const { radius, circleWidth, progressWidth, knobRadius, value } = this.props;
        const p = 2 * Math.PI * (radius - circleWidth / 2);
        const viewBoxPadding = knobRadius + 10;
        const strokeWidthCircle = circleWidth;
        const strokeWidthProgress = progressWidth;
        const strokeDashoffset = p * (1 - value);
        const strokeDasharray = p;
        return (
            <svg
                className="m-circular-slider"
                ref={potar => (this.potar = potar)}
                viewBox={`0 0 ${radius * 2} ${radius * 2}`}
                onMouseDown={this.handleMouseDown}
            >
                <circle
                    className="m-circular-slider__circle"
                    style={{ strokeWidth: strokeWidthCircle }}
                    r={radius - circleWidth / 2}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    className="m-circular-slider__progress"
                    style={{
                        strokeWidth: strokeWidthProgress,
                        strokeDashoffset,
                        strokeDasharray
                    }}
                    r={radius - circleWidth / 2}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    className="m-circular-slider__knob"
                    r={knobRadius}
                    cx={radius}
                    cy={radius * 2 - strokeWidthProgress / 4}
                />
            </svg>
        );
    }
}
