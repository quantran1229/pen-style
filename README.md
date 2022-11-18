
# pen-style

![image](images/images.png)

## A minimal color and formatting for console
Simple color and formatting for console log.

* 8 colors (`black`,`white`,`red`,`blue`,`green`,`yellow`,`cyan`,`orange`).
* Hex colors (`#f5f5e8`).
* RGB.
* Background colors.
* Style with **Bold**, _Italic_, Underline and ~~Strikethrough~~.

## Usage

Usage:

```javascript
var Pen = require("pen-style");
```

Output colored text:

```javascript
console.log(Pen("This text is red","red"));
```

Styles can be mixed:

```javascript
console.log(Pen("This text is cyan with underline and italic",{c:"cyan",o:"ui"}));
```


## API
**Pen(text, color)**

color can be default colors(`black`,`white`,`red`,`blue`,`green`,`yellow`,`cyan`,`orange`), Hex or RGB

Example
```javascript
console.log(Pen("This using rgb",{r:120,g:50,b:12}));
```

**Pen(text, options)**

`options` has fields

| Field | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `c`      | `string` or `rgb`| Text color |
| `b`      | `string` or `rgb`| Background color |
| `o`      | `string` or `rgb`| Other style options ex: `bi` = `Bold` + `italic` |

**Style**

**Bold**: `b`

_Italic_: `i`

Underline: `u`

~~Strikethrough~~. `s`

Style can be combine: `bi` = `Bold` + `italic`

## Contributing

All contributions are accepted as a PR.

* You can file issues by submitting a PR.
* Implement new feature by submitting a PR.
* Improve documentation by submitting PR.
You are welcome to improve this project! It would help me so much!
## Support

For support, email downy1229@gmail.com!