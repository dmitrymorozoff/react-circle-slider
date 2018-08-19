import * as React from "react";
import { CircularSliderHelper } from "./helpers/circular-slider-helper";
import { MouseHelper } from "./helpers/mouse-helper";

interface IProps {
    size?: number;
    circleWidth?: number;
    progressWidth?: number;
    knobRadius?: number;
    value?: number;
    stepSize?: number;
    min?: number;
    max?: number;
    circleColor?: string;
    progressColor?: string;
    knobColor?: string;
    onChange: ((value?: number) => void);
    circleWidthInit?: number;
    knobRadiusInit?: number;
    progressWidthInit?: number;
}

interface IState {
    angle: number;
    currentStepValue: number;
}

export class CircularSlider extends React.Component<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        circleColor: "#EDEDED",
        size: 100,
        value: 0,
        progressColor: "#ADA1FB",
        knobColor: "#ADA1FB",
        circleWidthInit: 9,
        progressWidthInit: 7,
        knobRadiusInit: 6,
        stepSize: 1,
        min: 0,
        max: 100,
        onChange: () => ({}),
    };
    private maxLineWidth: number;
    private radius: number;
    private stepsCount: number;
    private stepsArray: number[];
    private circularSliderHelper: CircularSliderHelper;
    private mouseHelper!: MouseHelper;
    private svg: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            angle: 0,
            currentStepValue: 0,
        };

        this.maxLineWidth = Math.max(
            this.getMainCircleStrokeWidth(),
            this.getMainProgressStrokeWidth(),
        );

        this.radius =
            this.getCenter() -
            Math.max(this.maxLineWidth, this.getKnobRadius() * 2) / 2;

        const { min, max, stepSize, value } = this.props;

        this.stepsCount = 1 + (max! - min!) / stepSize!;
        this.stepsArray = Array.from(
            {
                length: this.stepsCount,
            },
            (v, i) => min! + i * stepSize!,
        );
        this.circularSliderHelper = new CircularSliderHelper(
            this.stepsArray,
            value,
        );
    }

    public componentDidMount() {
        this.mouseHelper = new MouseHelper(this.svg);
        this.setState({
            angle: this.circularSliderHelper.getAngle(),
            currentStepValue: this.circularSliderHelper.getCurrentStep(),
        });
    }

    public updateAngle = (angle: number) => {
        this.circularSliderHelper.updateCurrentStepFromAngle(angle);
        const currentStep = this.circularSliderHelper.getCurrentStep();
        this.setState({
            angle,
            currentStepValue: currentStep,
        });
        this.props.onChange(currentStep);
    };

    public updateSlider = () => {
        const angle = this.mouseHelper.getNewSliderAngle();
        if (Math.abs(angle - this.state.angle) < Math.PI) {
            this.updateAngle(angle);
        }
    };

    public getMainCircleStrokeWidth = () => {
        const { circleWidth, circleWidthInit, size } = this.props;
        return circleWidth === undefined
            ? size! / 2 / circleWidthInit!
            : circleWidth;
    };

    public getMainProgressStrokeWidth = () => {
        const { progressWidth, progressWidthInit, size } = this.props;
        return progressWidth === undefined
            ? size! / 2 / progressWidthInit!
            : progressWidth;
    };

    public getCenter = () => {
        return this.props.size! / 2;
    };

    public getAngle = () => {
        return this.state.angle + Math.PI / 2;
    };

    public getKnobRadius = () => {
        const { knobRadius, knobRadiusInit, size } = this.props;
        return knobRadius || size! / 2 / knobRadiusInit!;
    };

    public getPathX = () => {
        return this.getCenter() + this.radius * Math.cos(this.getAngle());
    };

    public getPathY = () => {
        return this.getCenter() + this.radius * Math.sin(this.getAngle());
    };

    public getPathDirection = () => {
        return this.getAngle() < (3 / 2) * Math.PI ? 0 : 1;
    };

    public getCurve = () => {
        const points = [];
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

    public handleMouseMove = (event: Event) => {
        event.preventDefault();
        this.mouseHelper.setNewPosition(event);
        this.updateSlider();
    };

    public handleMouseUp = (event: Event) => {
        event.preventDefault();
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.handleMouseUp);
    };

    public handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
        event.preventDefault();
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseup", this.handleMouseUp);
    };

    public render() {
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
                            fill: "none",
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
                            fill: "none",
                        }}
                        d={this.getCurve()}
                    />
                    <circle
                        style={{
                            fill: knobColor,
                            cursor: "pointer",
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
