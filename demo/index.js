import React from "react";
import ReactDOM from "react-dom";
import { CircularSlider } from "../source/index";
import "./style.scss";

ReactDOM.render(
    <div>
        <CircularSlider
            radius={160}
            circleWidth={8}
            progressWidth={16}
            knobRadius={24}
            value={0.25}
        />
    </div>,
    document.getElementById("root")
);
