import React, { Component } from "react";
import PropTypes from "prop-types";
import { MouseHelper } from "./components/MouseHelper/index.jsx";
import { CircularSliderHelper } from "./components/CircularSliderHelper/index.jsx";

export class CircularSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            currentStepValue: 0
        };
        this.maxLineWidth = Math.max(
            this.getCircleProgressMainCircleStrokeWidth(),
            this.getCircleProgressMainProgressStrokeWidth()
        );
        this.radius =
            this.props.size / 2 -
            Math.max(this.maxLineWidth, this.getCircleProgressKnobRadius() * 2) / 2;
        this.stepsCount = 1 + (this.props.max - this.props.min) / this.props.stepSize;
        this.stepsArray = Array.from(
            {
                length: this.stepsCount
            },
            (v, i) => this.props.min + i * this.props.stepSize
        );
        this.circularSliderHelper = new CircularSliderHelper(this.stepsArray, this.props.value);
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
        this.setState({
            angle,
            currentStepValue: this.circularSliderHelper.getCurrentStep()
        });
    };
    updateSlider = () => {
        const angle = this.mouseHelper.getNewSliderAngle();
        if (Math.abs(angle - this.state.angle) < Math.PI) {
            this.updateAngle(angle);
        }
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
    getCircleProgressMainCircleStrokeWidth = () => {
        return this.props.circleWidth === undefined
            ? this.props.size / 2 / this.props.circleWidthRel
            : this.props.circleWidth;
    };
    getCircleProgressMainProgressStrokeWidth = () => {
        return this.props.progressWidth === undefined
            ? this.props.size / 2 / this.props.progressWidthRel
            : this.props.progressWidth;
    };
    getCircleProgressCenter = () => {
        return this.props.size / 2;
    };
    getCircleProgressAngle = () => {
        return this.state.angle + Math.PI / 2;
    };
    getCircleProgressKnobRadius = () => {
        return this.props.knobRadius || this.props.size / 2 / this.props.knobRadiusRel;
    };
    getCircleProgressPathX = () => {
        return (
            this.getCircleProgressCenter() + this.radius * Math.cos(this.getCircleProgressAngle())
        );
    };
    getCircleProgressPathY = () => {
        return (
            this.getCircleProgressCenter() + this.radius * Math.sin(this.getCircleProgressAngle())
        );
    };
    getCircleProgressPathDirection = () => {
        return this.getCircleProgressAngle() < 3 / 2 * Math.PI ? 0 : 1;
    };
    getCircleProgressCurve = () => {
        let points = [];
        points.push("M" + this.getCircleProgressCenter());
        points.push(this.getCircleProgressCenter() + this.radius);
        points.push("A");
        points.push(this.radius);
        points.push(this.radius);
        points.push(0);
        points.push(this.getCircleProgressPathDirection());
        points.push(1);
        points.push(this.getCircleProgressPathX());
        points.push(this.getCircleProgressPathY());
        return points.join(" ");
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
                            strokeWidth: this.getCircleProgressMainCircleStrokeWidth(),
                            stroke: circleColor,
                            fill: "none"
                        }}
                        r={this.radius}
                        cx={this.getCircleProgressCenter()}
                        cy={this.getCircleProgressCenter()}
                    />
                    <path
                        style={{
                            strokeWidth: this.getCircleProgressMainProgressStrokeWidth(),
                            stroke: progressColor,
                            fill: "none"
                        }}
                        d={this.getCircleProgressCurve()}
                    />
                    <circle
                        style={{ fill: knobColor }}
                        r={this.getCircleProgressKnobRadius()}
                        cx={this.getCircleProgressPathX()}
                        cy={this.getCircleProgressPathY()}
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
    knobColor: PropTypes.string
};

CircularSlider.defaultProps = {
    size: 100,
    value: 0,
    circleColor: "#243648",
    progressColor: "#eb213a",
    knobColor: "#eb213a",
    circleWidthRel: 20,
    progressWidthRel: 10,
    knobRadiusRel: 7,
    stepSize: 1,
    min: 0,
    max: 100
};
