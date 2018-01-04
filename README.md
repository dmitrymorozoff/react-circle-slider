## Использование

```js
import React from "react";
import ReactDOM from "react-dom";
import { CircularSlider } from "../source/index";

ReactDOM.render(<CircularSlider />, container);
```

## Props

| Свойства          | Тип          | Стандартные | Описание                                                      |
| ----------------- | :----------- | ----------- | ------------------------------------------------------------- |
| size              | Number       | 100         | размер SVG элемента в пикселях                                |
| stepSize          | Number       | 1           | размер шага                                                   |
| knobRadius        | Number       | null        | радиус ручки в пикселях                                       |
| knobRadiusInit    | Number       | 7           | относительный радиус ручки слайдера                           |
| circleWidth       | Number       | null        | точная ширина окружности слайдера                             |
| circleWidthInit   | Number       | 20          | относительный радиус окружности слайдера                      |
| progressWidth     | Number       | null        | точная ширина кривой прогресса в пикселях                     |
| progressWidthInit | Number       | 10          | относительный радиус кривой прогресса                         |
| min               | Number       | 0           | минимальное значение                                          |
| max               | Number       | 100         | максимальное значение                                         |
| value             | Number       | 0           | значение                                                      |
| circleColor       | String       | `#243648`   | цвет окружности слайдера                                      |
| progressColor     | String       | `#eb213a`   | цвет кривой прогресса                                         |
| knobColor         | String       | `#eb213a`   | цвет ручки                                                    |
| onChange          | Function     | NOOP        | `onChange` будет срабатывать при изменении значения слайдера. |

## NPM-скрипты

Установка зависимостей:

```bash
$ npm install
```

Запуск локального сервера для разработки по адресу `localhost:8080`:

```bash
$ npm run dev
```

Сборка библиотеки :

```bash
$ npm run build
```
