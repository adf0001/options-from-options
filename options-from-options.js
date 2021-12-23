
// options-from-options @ npm, get a new options object from a raw options.

/*
for function like func( ..., options )

shortcut: the shortcut property name of the options;
defaultShortcut: the default shortcut name, when options is not object or is null; default is 'raw_options'.
*/
function optionsFromOptions(options, shortcut, defaultShortcut) {
	var newOptions = options;

	if (shortcut) {
		newOptions = {};
		newOptions[shortcut] = options;
	}
	else if (typeof options !== "object" || options === null) {
		newOptions = {};
		if (defaultShortcut) newOptions[defaultShortcut] = options;
		else newOptions.raw_options = options;	//save raw options to .raw_options
	}

	return newOptions;
}

/*
for function like func( ..., options, cb )

option: { cb, [cbThis], [raw_options] }, a later cb will replace the previous.
*/
function optionsFromOptionsCb(options, cb, shortcut, defaultShortcut) {
	var newOptions = optionsFromOptions(
		options,
		shortcut || (typeof options === "function" && typeof cb === "undefined" && "cb"),
		defaultShortcut
	);

	if (cb) newOptions.cb = cb;	//replace the existed

	return newOptions;
}

// module

module.exports = exports = optionsFromOptions;

exports.cb = optionsFromOptionsCb;
