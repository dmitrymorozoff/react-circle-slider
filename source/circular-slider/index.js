import React, { Component } from "react";
import PropTypes from "prop-types";
import { MouseHelper } from "./helpers/mouse-helper/index.jsx";
import { CircularSliderHelper } from "./helpers/circular-slider-helper/index.jsx";

export class CircularSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            currentStepValue: 0
        };

        this.maxLineWidth = Math.max(
            this.getMainCircleStrokeWidth(),
            this.getMainProgressStrokeWidth()
        );

        this.radius = this.getCenter() - Math.max(this.maxLineWidth, this.getKnobRadius() * 2) / 2;

        const { min, max, stepSize, value } = this.props;

        this.stepsCount = 1 + (max - min) / stepSize;
        this.stepsArray = Array.from(
            {
                length: this.stepsCount
            },
            (v, i) => min + i * stepSize
        );
        this.circularSliderHelper = new CircularSliderHelper(this.stepsArray, value);
    }

    componentDidMount() {
        this.mouseHelper = new MouseHelper(this.svg, this.radius, this.radius / 2);
        this.setState({
            angle: this.circularSliderHelper.getAngle(),
            currentStepValue: this.circularSliderHelper.getCurrentStep()
        });
    }

    updateAngle = angle => {
        this.circularSliderHelper.updateCurrentStepFromAngle(angle);
        const currentStep = this.circularSliderHelper.getCurrentStep();
        this.setState({
            angle,
            currentStepValue: currentStep
        });
        this.props.onChange(currentStep);
    };

    updateSlider = () => {
        const angle = this.mouseHelper.getNewSliderAngle();
        if (Math.abs(angle - this.state.angle) < Math.PI) {
            this.updateAngle(angle);
        }
    };

    getMainCircleStrokeWidth = () => {
        const { circleWidth, circleWidthInit, size } = this.props;
        return circleWidth === undefined ? size / 2 / circleWidthInit : circleWidth;
    };

    getMainProgressStrokeWidth = () => {
        const { progressWidth, progressWidthInit, size } = this.props;
        return progressWidth === undefined ? size / 2 / progressWidthInit : progressWidth;
    };

    getCenter = () => {
        return this.props.size / 2;
    };

    getAngle = () => {
        return this.state.angle + Math.PI / 2;
    };

    getKnobRadius = () => {
        const { knobRadius, knobRadiusInit, size } = this.props;
        return knobRadius || size / 2 / knobRadiusInit;
    };

    getPathX = () => {
        return this.getCenter() + this.radius * Math.cos(this.getAngle());
    };

    getPathY = () => {
        return this.getCenter() + this.radius * Math.sin(this.getAngle());
    };

    getPathDirection = () => {
        return this.getAngle() < (3 / 2) * Math.PI ? 0 : 1;
    };

    getCurve = () => {
        let points = [];
        const center = this.getCenter();
        points.push("M" + center);
        points.push(center + this.radius);
        points.push("A");
        points.push(this.radius);
        points.push(this.radius);
        points.push(0);
        points.push(this.getPathDirection());
        points.push(1);
        points.push(this.getPathX());
        points.push(this.getPathY());
        return points.join(" ");
    };

    handleMouseMove = event => {
        event.preventDefault();
        this.mouseHelper.setNewPosition(event);
        this.updateSlider();
    };

    handleMouseUp = event => {
        event.preventDefault();
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.handleMouseUp);
    };

    handleMouseDown = event => {
        event.preventDefault();
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseup", this.handleMouseUp);
    };

    render() {
        const { size, progressColor, knobColor, circleColor } = this.props;
        return (
            <svg
                ref={svg => (this.svg = svg)}
                width={`${size}px`}
                height={`${size}px`}
                viewBox={`0 0 ${size} ${size}`}
                onMouseDown={this.handleMouseDown}
            >
                <g>
                    <circle
                        style={{
                            strokeWidth: this.getMainCircleStrokeWidth(),
                            stroke: circleColor,
                            fill: "none"
                        }}
                        r={this.radius}
                        cx={this.getCenter()}
                        cy={this.getCenter()}
                    />
                    <path
                        style={{
                            strokeLinecap: "round",
                            strokeWidth: this.getMainProgressStrokeWidth(),
                            stroke: progressColor,
                            fill: "none"
                        }}
                        d={this.getCurve()}
                    />
                    <circle
                        style={{
                            fill: knobColor,
                            cursor: "pointer"
                        }}
                        r={this.getKnobRadius()}
                        cx={this.getPathX()}
                        cy={this.getPathY()}
                    />
                </g>
            </svg>
        );
    }
}

CircularSlider.propTypes = {
    size: PropTypes.number,
    circleWidth: PropTypes.number,
    progressWidth: PropTypes.number,
    knobRadius: PropTypes.number,
    value: PropTypes.number,
    stepSize: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    circleColor: PropTypes.string,
    progressColor: PropTypes.string,
    knobColor: PropTypes.string,
    onChange: PropTypes.func
};

CircularSlider.defaultProps = {
    size: 100,
    value: 0,
    circleColor: "#EDEDED",
    progressColor: "#ADA1FB",
    knobColor: "#ADA1FB",
    circleWidthInit: 9,
    progressWidthInit: 7,
    knobRadiusInit: 6,
    stepSize: 1,
    min: 0,
    max: 100,
    onChange: () => {}
};
