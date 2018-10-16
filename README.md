# react-circle-slider

Circle Slider Component for React

![Imgur](https://i.imgur.com/4RdYfaL.gif)

## Functionality

-   Simple to use
-   No extra dependencies
-   Highly customizable
-   Defining min and max values
-   Defining step size
-   Style based: no images / SVGs

## Examples

-   To check out live examples visit https://dmitrymorozoff.github.io/react-circle-slider/

## Installation

```bash
$ npm install --save react-circle-slider
```

You can also test the components locally by cloning this repo and doing the following steps:

## NPM-scripts

Install dependencies from package.json:

```bash
$ npm install
```

Start local development server `localhost:8080`:

```bash
$ npm run dev
```

Run linter

```bash
$ npm run lint
```

Start tests followed by jest

```bash
$ npm run test
```

## Usage

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { CircleSlider } from "react-circle-slider";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
    }

    handleChange = value => {
        console.log(`Changed value ${value}`);
        this.setState({ value });
    };

    handleChangeRange = event => {
        this.setState({
            value: event.target.valueAsNumber,
        });
    };

    render() {
        const { value } = this.state;
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircleSlider value={value} onChange={this.handleChange} />
                <div
                    style={{
                        textAlign: "center",
                        fontFamily: "sans-serif",
                        marginTop: "0.5rem",
                    }}
                >
                    {value}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "0.5rem",
                    }}
                >
                    <input
                        id="control"
                        type="range"
                        value={value}
                        onChange={this.handleChangeRange}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## Props

| Props         | Type     | Default   | Description                                                    |
| ------------- | :------- | --------- | -------------------------------------------------------------- |
| size          | Number   | 180       | size of the slider in px                                       |
| stepSize      | Number   | 1         | value to be added or subtracted on each step the slider makes. |
| knobRadius    | Number   | null      | knob radius in px                                              |
| circleWidth   | Number   | null      | width of circle in px                                          |
| progressWidth | Number   | null      | progress curve width in px                                     |
| min           | Number   | 0         | the minimum value of the slider                                |
| max           | Number   | 100       | the maximum value of the slider                                |
| value         | Number   | 0         | value                                                          |
| circleColor   | String   | `#e9eaee` | color of slider                                                |
| progressColor | String   | `#007aff` | color of progress curve                                        |
| knobColor     | String   | `#fff`    | color of knob                                                  |
| disabled      | Boolean  | false     | disabled status                                                |
| shadow        | Boolean  | true      | shadow on knob                                                 |
| onChange      | Function | NOOP      | when slider is moved, `onChange` is triggered.                 |

## License

MIT