// global, for html page
options_from_options = require("../options-from-options.js");

module.exports = {

	"options_from_options()": function (done) {
		var func = function (options) {
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
	},

	"options_from_options()/raw": function (done) {
		var func = function (options) {
			options = options_from_options(options,
				(typeof options === "string" && "a") ||
				(typeof options === "number" && "b")
			);

			if (typeof options.raw_options === "function") options.raw_options = options.raw_options();

			return JSON.stringify(options);
		}

		done(!(
			func({ a: "aa", b: 2 }) === '{"a":"aa","b":2}' &&
			func("aa") === '{"a":"aa"}' &&
			func(2) === '{"b":2}' &&
			func(null) === '{"raw_options":null}' &&
			func(true) === '{"raw_options":true}' &&
			func() === '{}' &&
			func({ d: false }) === '{"d":false}' &&
			func({}) === '{}' &&
			func(function () { return "f1" }) === '{"raw_options":"f1"}' &&
			true
		));
	},

	".cb()": function (done) {
		var func = function (options, cb) {
			options = options_from_options.cb(options, cb,
				(typeof options === "string" && "a") ||
				(typeof options === "number" && "b"),
				"c"
			);

			if (typeof options.c === "function") options.c = options.c();
			if (typeof options.cb === "function") options.cb = options.cb();

			return JSON.stringify(options);
		}

		//console.log(func(function () {return "f1" },function () {return "f2" }));

		done(!(
			func({ a: "aa", b: 2 }, function () { return "f1"; }) === '{"a":"aa","b":2,"cb":"f1"}' &&
			func("aa", function () { return "f1" }) === '{"a":"aa","cb":"f1"}' &&
			func(function () { return "f1" }) === '{"cb":"f1"}' &&
			func(function () { return "f1" }, function () { return "f2" }) === '{"c":"f1","cb":"f2"}' &&
			func({ cb: function () { return "f1" } }, function () { return "f2" }) === '{"cb":"f2"}' &&
			func(null, function () { return "f1" }) === '{"c":null,"cb":"f1"}' &&
			func(null) === '{"c":null}' &&
			true
		));
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('mocha-test', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(15000); } });
