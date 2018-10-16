import * as React from "react";
import { CircleSlider } from "../circle-slider";
import { shallow, mount } from "enzyme";

describe("circle slider", () => {
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

    it("circle slider should render a svg", () => {
        const circleSlider = shallow(<CircleSlider {...props} />);

        expect(circleSlider.find("svg")).toHaveLength(1);
    });

    it("circle slider should render with props", () => {
        const circleSlider = mount(<CircleSlider {...props} />);

        expect(circleSlider.props().circleColor).toEqual("#EDEDED");
        expect(circleSlider.props().value).toEqual(0);
        expect(circleSlider.props().progressColor).toEqual("#ADA1FB");
        expect(circleSlider.props().knobColor).toEqual("#ADA1FB");
        expect(circleSlider.props().circleWidthInit).toEqual(9);
        expect(circleSlider.props().progressWidthInit).toEqual(7);
        expect(circleSlider.props().knobRadiusInit).toEqual(6);
        expect(circleSlider.props().stepSize).toEqual(1);
        expect(circleSlider.props().min).toEqual(0);
        expect(circleSlider.props().max).toEqual(100);
    });

    it("circle slider should call onChange", () => {
        const circleSlider = shallow(<CircleSlider {...this.props} />);
        (circleSlider.instance() as any).updateAngle();

        expect(props.onChange).toHaveBeenCalled;
    });

    it("circle slider should call onChange", () => {
        const circleSlider = shallow(<CircleSlider {...this.props} />);
        (circleSlider.instance() as any).updateAngle();

        expect(props.onChange).toHaveBeenCalled;
    });

    it("circle slider should call mouseDown", () => {
        const circleSlider = shallow(<CircleSlider {...this.props} />);
        const accuracy = 0.00001;
        circleSlider.simulate("mousedown", {
            preventDefault: () => {},
        });

        expect(circleSlider.state("angle")).toEqual(0 - accuracy);
        expect(circleSlider.state("currentStepValue")).toEqual(0);
    });

    it("circle slider current step value to be equals 5", () => {
        const circleSlider = shallow(<CircleSlider {...this.props} />);
        const instance = circleSlider.instance() as any;
        instance.updateAngle(0.3125);

        expect(circleSlider.state("currentStepValue")).toEqual(5);
    });

    it("should render a default circle slider", () => {
        const circleSlider = shallow(<CircleSlider {...this.props} />);
        expect(circleSlider).toMatchSnapshot();
    });
});
