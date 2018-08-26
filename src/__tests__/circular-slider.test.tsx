import * as React from "react";
import { CircularSlider } from "../circular-slider";
import { shallow } from "enzyme";

describe("circular slider", () => {
    const props = {
        onChange: () => ({}),
    };

    it("circular slider render svg", () => {
        const circularSlider = shallow(<CircularSlider {...props} />);
        expect(circularSlider.find("svg")).toHaveLength(1);
    });
});
