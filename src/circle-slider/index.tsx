import * as React from "react";
import { CircleSliderHelper } from "./helpers/circle-slider-helper";
import { generatePath } from "./helpers/generate-path";
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
    disabled?: boolean;
    shadow?: boolean;
}

interface IState {
    angle: number;
    currentStepValue: number;
    isMouseMove: boolean;
}

export class CircleSlider extends React.Component<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        circleColor: "#e9eaee",
        size: 180,
        value: 0,
        progressColor: "#007aff",
        knobColor: "#fff",
        circleWidthInit: 20,
        progressWidthInit: 5,
        knobRadiusInit: 5,
        stepSize: 1,
        min: 0,
        max: 100,
        disabled: false,
        shadow: true,
        onChange: () => ({}),
    };
    private maxLineWidth: number;
    private radius: number;
    private countSteps: number;
    private stepsArray: number[];
    private circleSliderHelper: CircleSliderHelper;
    private mouseHelper!: MouseHelper;
    private svg: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            angle: 0,
            currentStepValue: 0,
            isMouseMove: false,
        };

        this.maxLineWidth = Math.max(
            this.getMainCircleStrokeWidth(),
            this.getMainProgressStrokeWidth(),
        );

        this.radius =
            this.getCenter() -
            Math.max(this.maxLineWidth, this.getKnobRadius() * 2) / 2;

        const { min, max, stepSize, value } = this.props;

        this.countSteps = 1 + (max! - min!) / stepSize!;
        this.stepsArray = this.getStepsArray(min!, stepSize!);

        this.circleSliderHelper = new CircleSliderHelper(
            this.stepsArray,
            value,
        );
    }

    public componentDidMount() {
        this.mouseHelper = new MouseHelper(this.svg);
        this.setState({
            angle: this.circleSliderHelper.getAngle(),
            currentStepValue: this.circleSliderHelper.getCurrentStep(),
        });
    }

    public componentWillReceiveProps(nextProps: any) {
        if (this.props.value !== nextProps.value && !this.state.isMouseMove) {
            this.updateSliderFromProps(nextProps.value);
        }
    }

    public updateAngle = (angle: number): void => {
        this.circleSliderHelper.updateStepIndexFromAngle(angle);
        const currentStep = this.circleSliderHelper.getCurrentStep();
        this.setState({
            angle,
            currentStepValue: currentStep,
        });
        this.props.onChange(currentStep);
    };

    public updateSlider = (): void => {
        const angle = this.mouseHelper.getNewSliderAngle();
        if (Math.abs(angle - this.state.angle) < Math.PI) {
            this.updateAngle(angle);
        }
    };

    public updateSliderFromProps = (valueFromProps: number): void => {
        const { stepSize } = this.props;
        const newValue = Math.round(valueFromProps / stepSize!) * stepSize!;
        this.circleSliderHelper.updateStepIndexFromValue(newValue);
        this.setState({
            angle: this.circleSliderHelper.getAngle(),
            currentStepValue: newValue,
        });
    };

    public getMainCircleStrokeWidth = (): number => {
        const { circleWidth, circleWidthInit, size } = this.props;
        return circleWidth === undefined
            ? size! / 2 / circleWidthInit!
            : circleWidth;
    };

    public getMainProgressStrokeWidth = (): number => {
        const { progressWidth, progressWidthInit, size } = this.props;
        return progressWidth === undefined
            ? size! / 2 / progressWidthInit!
            : progressWidth;
    };

    public getCenter = (): number => {
        return this.props.size! / 2;
    };

    public getAngle = (): number => {
        return this.state.angle + Math.PI / 2;
    };

    public getKnobRadius = (): number => {
        const { knobRadius, knobRadiusInit, size } = this.props;
        return knobRadius || size! / 2 / knobRadiusInit!;
    };

    public getPathX = (): number => {
        return this.getCenter() + this.radius * Math.cos(this.getAngle());
    };

    public getPathY = (): number => {
        return this.getCenter() + this.radius * Math.sin(this.getAngle());
    };

    public getPathDirection = (): number => {
        return this.getAngle() < (3 / 2) * Math.PI ? 0 : 1;
    };

    public getStepsArray = (min: number, stepSize: number): number[] => {
        const stepArray = [];
        for (let i = 0; i < this.countSteps; i++) {
            stepArray.push(min + i * stepSize);
        }
        return stepArray;
    };

    public getPath = (): string => {
        const center = this.getCenter();
        const direction = this.getPathDirection();
        const pathX = this.getPathX();
        const pathY = this.getPathY();
        const path = generatePath(center, this.radius, direction, pathX, pathY);
        return path;
    };

    public handleMouseMove = (event: Event): void => {
        event.preventDefault();
        this.setState({
            isMouseMove: true,
        });
        this.mouseHelper.setPosition(event);
        this.updateSlider();
    };

    public handleMouseUp = (event: Event): void => {
        event.preventDefault();
        this.setState({
            isMouseMove: false,
        });
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.handleMouseUp);
    };

    public handleMouseDown = (event: React.MouseEvent<SVGSVGElement>): void => {
        if (!this.props.disabled) {
            event.preventDefault();
            window.addEventListener("mousemove", this.handleMouseMove);
            window.addEventListener("mouseup", this.handleMouseUp);
        }
    };

    public render() {
        const {
            size,
            progressColor,
            knobColor,
            circleColor,
            disabled,
            shadow,
        } = this.props;
        const offset = shadow ? "5px" : "0px";

        return (
            <svg
                ref={svg => (this.svg = svg)}
                width={`${size}px`}
                height={`${size}px`}
                viewBox={`0 0 ${size} ${size}`}
                onMouseDown={this.handleMouseDown}
                style={{
                    padding: offset,
                    boxSizing: "border-box",
                }}
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
                        d={this.getPath()}
                    />
                    {shadow && (
                        <filter id="dropShadow" filterUnits="userSpaceOnUse">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                            <feOffset dx="2" dy="2" />
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.3" />
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    )}
                    <circle
                        style={{
                            fill: knobColor,
                            cursor: disabled ? "not-allowed" : "pointer",
                        }}
                        filter={shadow ? "url(#dropShadow)" : "none"}
                        r={this.getKnobRadius()}
                        cx={this.getPathX()}
                        cy={this.getPathY()}
                    />
                </g>
            </svg>
        );
    }
}
