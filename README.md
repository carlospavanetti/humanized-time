# humanized-time

Convert time to human readable string: `just now`, `in 2 minutes`, `2 days ago`.

## Usage

```js
const humanizedTime = require('humanized-time');

const time = new Date('2020-04-15');
humanizedTime(time);
```

## API

```js
humanizedTime(time, options);
```

**time**: required, Date object to compute timespan and convert to text.

**options**: optional

- **reference**: Time reference to compute the timespan. Default is `Date.now()`.
- **precision**: Timespan unit of `just now` threshold.
- **format**: ['default', 'descriptive', function]. It specifies the returned result format. Default value is `"default"`, wich returns strings like `just now`. The "descriptive" value returns a object like `{ moment: "past", value: 2, unit: "minutes" }`. It accepts a function receiving the same object format as argument.
