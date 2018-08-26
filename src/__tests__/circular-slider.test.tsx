import * as React from "react";
import { CircularSlider } from "../circular-slider";
import { shallow, mount } from "enzyme";

describe("circular slider", () => {
    const props = {
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
        onChange: jest.fn(),
    };

    it("circular slider should render a svg", () => {
        const circularSlider = shallow(<CircularSlider {...props} />);

        expect(circularSlider.find("svg")).toHaveLength(1);
    });

    it("circular slider should render with props", () => {
        const circularSlider = mount(<CircularSlider {...props} />);

        expect(circularSlider.props().circleColor).toEqual("#EDEDED");
        expect(circularSlider.props().value).toEqual(0);
        expect(circularSlider.props().progressColor).toEqual("#ADA1FB");
        expect(circularSlider.props().knobColor).toEqual("#ADA1FB");
        expect(circularSlider.props().circleWidthInit).toEqual(9);
        expect(circularSlider.props().progressWidthInit).toEqual(7);
        expect(circularSlider.props().knobRadiusInit).toEqual(6);
        expect(circularSlider.props().stepSize).toEqual(1);
        expect(circularSlider.props().min).toEqual(0);
        expect(circularSlider.props().max).toEqual(100);
    });

    it("circular slider should call onChange", () => {
        const circularSlider = shallow(<CircularSlider {...this.props} />);
        (circularSlider.instance() as any).updateAngle();

        expect(props.onChange).toHaveBeenCalled;
    });

    it("circular slider should call onChange", () => {
        const circularSlider = shallow(<CircularSlider {...this.props} />);
        (circularSlider.instance() as any).updateAngle();

        expect(props.onChange).toHaveBeenCalled;
    });

    it("circular slider should call mouseDown", () => {
        const circularSlider = shallow(<CircularSlider {...this.props} />);
        circularSlider.simulate("mousedown", {
            preventDefault: () => {},
        });

        expect(circularSlider.state("angle")).toEqual(0);
        expect(circularSlider.state("currentStepValue")).toEqual(0);
    });

    it("circular slider current step value to be equals 5", () => {
        const circularSlider = shallow(<CircularSlider {...this.props} />);
        const instance = circularSlider.instance() as any;
        instance.updateAngle(0.3125);

        expect(circularSlider.state("currentStepValue")).toEqual(5);
    });

    it("should render a default circular slider", () => {
        const circularSlider = shallow(<CircularSlider {...this.props} />);
        expect(circularSlider).toMatchSnapshot();
    });
});
