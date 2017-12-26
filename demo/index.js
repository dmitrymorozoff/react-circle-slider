import React from "react";
import ReactDOM from "react-dom";
import { CircularSlider } from "../source/index";
import "./style.scss";

ReactDOM.render(
    <div>
        <CircularSlider
            value={0.25}
        />
    </div>,
    document.getElementById("root")
);
