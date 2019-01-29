# 🕹️ react-circle-slider

Circle Slider Component for React.js

![Imgur](https://i.imgur.com/4RdYfaL.gif)

## ⚡ Functionality

-   Simple to use
-   No extra dependencies
-   Highly customizable
-   Defining min and max values
-   Defining step size
-   Defining gradient color
-   Touch support
-   Tooltip support
-   Style based: no images / SVGs

## Examples

-   To check out live examples visit https://dmitrymorozoff.github.io/react-circle-slider/

## 🚀 Getting started

Install `react-circle-slider` using npm.

### `npm install --save react-circle-slider`


You can also test the components locally by cloning this repo and doing the following steps:

## 🔲 NPM-scripts

Install dependencies from package.json:

### `npm install`

Runs the app in the development mode.<br>
Open [http://localhost:1234](http://localhost:1234) to view it in the browser.

### `npm run dev`

Run linter

### `npm run lint`

Start tests followed by jest

### `npm run test`

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
            <CircleSlider value={value} onChange={this.handleChange} />
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## 📃 Props

| Props             | Type     | Default   | Description                                                    |
| ----------------- | :------- | --------- | -------------------------------------------------------------- |
| size              | Number   | 180       | size of the slider in px                                       |
| stepSize          | Number   | 1         | value to be added or subtracted on each step the slider makes. |
| knobRadius        | Number   | null      | knob radius in px                                              |
| circleWidth       | Number   | null      | width of circle in px                                          |
| progressWidth     | Number   | null      | progress curve width in px                                     |
| min               | Number   | 0         | the minimum value of the slider                                |
| max               | Number   | 100       | the maximum value of the slider                                |
| value             | Number   | 0         | value                                                          |
| circleColor       | String   | `#e9eaee` | color of slider                                                |
| progressColor     | String   | `#007aff` | color of progress curve                                        |
| gradientColorFrom | String   | NOOP      | start gradient color of progress curve                         |
| gradientColorTo   | String   | NOOP      | end gradient color progress curve                              |
| knobColor         | String   | `#fff`    | color of knob                                                  |
| disabled          | Boolean  | false     | disabled status                                                |
| shadow            | Boolean  | true      | shadow on knob                                                 |
| showTooltip       | Boolean  | false     | tooltip                                                        |
| showPercentage    | Boolean  | false     | percentage on tooltip                                          |
| tooltipSize       | Number   | 32        | size of tooltip                                                |
| tooltipColor      | String   | `#333`    | color of tooltip                                               |
| onChange          | Function | NOOP      | when slider is moved, `onChange` is triggered.                 |

## 💡 Todo

- [ ] Keyboard support
- [ ] Mouse scroll support
- [ ] Accessibility 

## 💻 Contributing

- For bugs and feature requests, please create an issue
- Lint and test your code
- Pull requests and ⭐ stars are always welcome

## License

MIT