import React, { Component } from "react";
import PropTypes from "prop-types";

export class CircularSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mousePressed: false
        };
        this.maxCurveWidth = Math.max(
            this.getCircleProgressMainCircleStrokeWidth(),
            this.getCircleProgressMainProgressStrokeWidth()
        );
        this.radius =
            this.props.side / 2 -
            Math.max(this.maxCurveWidth, this.getCircleProgressKnobRadius() * 2) / 2;
    }
    componentDidMount() {
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
    }
    componentWillUnmount() {
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
    }
    handleMouseUp = () => {
        this.setState({ mousePressed: false });
    };
    handleMouseDown = event => {
        event.preventDefault();
        this.setState({ mousePressed: true });
    };
    getCircleProgressMainCircleStrokeWidth() {
        return this.props.circleWidth === undefined
            ? this.props.side / 2 / this.props.circleWidthRel
            : this.props.circleWidth;
    }
    getCircleProgressMainProgressStrokeWidth() {
        return this.props.progressWidth === undefined
            ? this.props.side / 2 / this.props.progressWidthRel
            : this.props.progressWidth;
    }
    getCircleProgressCenter() {
        return this.props.side / 2;
    }
    getCircleProgressAngle() {
        return this.props.angle + Math.PI / 2;
    }
    getCircleProgressKnobRadius() {
        return this.props.knobRadius || this.props.side / 2 / this.props.knobRadiusRel;
    }
    getCircleProgressPathX() {
        return (
            this.getCircleProgressCenter() + this.radius * Math.cos(this.getCircleProgressAngle())
        );
    }
    getCircleProgressPathY() {
        return (
            this.getCircleProgressCenter() + this.radius * Math.sin(this.getCircleProgressAngle())
        );
    }
    getCircleProgressPathDirection() {
        return this.getCircleProgressAngle() < 3 / 2 * Math.PI ? 0 : 1;
    }
    getCircleProgressPathD() {
        let parts = [];
        parts.push("M" + this.getCircleProgressCenter());
        parts.push(this.getCircleProgressCenter() + this.radius);
        parts.push("A");
        parts.push(this.radius);
        parts.push(this.radius);
        parts.push(0);
        parts.push(this.getCircleProgressPathDirection());
        parts.push(1);
        parts.push(this.getCircleProgressPathX());
        parts.push(this.getCircleProgressPathY());
        return parts.join(" ");
    }
    render() {
        const { side, progressColor, knobColor, circleColor } = this.props;
        return (
            <svg
                ref={potar => (this.potar = potar)}
                width={`${side}px`}
                height={`${side}px`}
                viewBox={`0 0 ${side} ${side}`}
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
                        d={this.getCircleProgressPathD()}
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

CircularSlider.defaultProps = {
    side: 100,
    value: 0,
    angle: 2,
    circleColor: "#243648",
    progressColor: "#eb213a",
    knobColor: "#eb213a",
    circleWidthRel: 20,
    progressWidthRel: 10,
    knobRadiusRel: 7
};

CircularSlider.propTypes = {
    side: PropTypes.number,
    circleWidth: PropTypes.number,
    progressWidth: PropTypes.number,
    knobRadius: PropTypes.number,
    value: PropTypes.number,
    circleColor: PropTypes.string,
    progressColor: PropTypes.string,
    knobColor: PropTypes.string
};
