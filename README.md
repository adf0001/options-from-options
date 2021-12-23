# options-from-options
get a new options object from a raw options

# Install
```
npm install options-from-options
```

# Usage
```javascript

var options_from_options = require("options-from-options");

var func = function (options) {
	//optionsFromOptions(options, shortcut, defaultShortcut)
	options = options_from_options(options,
		(typeof options === "string" && "a") ||
		(typeof options === "number" && "b"),
		"c"
	);

	if (typeof options.c === "function") options.c = options.c();

	return JSON.stringify(options);
}

done(!(
	func({ a: "aa", b: 2 }) === '{"a":"aa","b":2}' &&
	func("aa") === '{"a":"aa"}' &&
	func(2) === '{"b":2}' &&
	func(null) === '{"c":null}' &&
	func(true) === '{"c":true}' &&
	func() === '{}' &&
	func({ d: false }) === '{"d":false}' &&
	func({}) === '{}' &&
	func(function () { return "f1"; }) === '{"c":"f1"}' &&
	true
));

```
