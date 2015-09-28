let UTILS = {};

/**
 *  NoE testers
 */
UTILS.isNullOrEmpty         = function (object = null) {
	return UTILS.isNoE(object);
};
UTILS.isA                   = function (object) {
	// Simple function to denote if an object is
	// not null or empty
	return !UTILS.isNoE(object);
};
UTILS.isNoE                 = function (object) {
	// UNDEFINED
	if ( typeof object === 'undefined' ) {
		return true;
	}

	// NULL
	if ( object === null ) {
		return true;
	}

	// MULTIPLE arguments
	// use isAnyNoE(...)
	if ( arguments.length > 1 ) {
		return UTILS.isAnyNoE.apply(this, arguments);
	}

	// SINGLE argument
	else {
		// ARRAY: test for empty
		if ( UTILS.isArray(object) ) {

			// not items
			if ( object.length < 1 ) {
				return true;
			}

			// 1 item, but it is null
			if ( object.length === 1 && UTILS.isNoE(object[0]) ) {
				return true; // only element is empty
			}

			// not empty
			return false;
		}

		// (jquery special) HAS 'jquery' value
		if ( object.jquery && object.length < 1 ) {
			return true;
		}

		// STRING value test
		return UTILS.getStringValue(object) === '';
	}
};
UTILS.isAnyNoE              = function () {
	// no args
	if ( typeof arguments === 'undefined' ) {
		return true;
	}

	// SEND ANY NUMBER OF ARGS
	// each will be tested for isNoE
	// if any are (true) then we we return true
	for ( var x = 0; x < arguments.length; x++ ) {
		if ( UTILS.isNoE(arguments[x]) ) {
			return true;
		}
	}

	return false;
};

/**
 *   GET-TYPEers
 */
UTILS.getStringValue        = function (object) {

	// string
	if ( UTILS.isString(object) ) {
		return object;
	}

	// null or empty
	if ( typeof object === 'undefined' || object === null ) {
		return '';
	}

	try {
		return object.toString();
	} catch (e) {
		return '';
	}
};
UTILS.getBooleanValue       = function (object) {
	// boolean
	if ( UTILS.isBoolean(object) ) {
		return object;
	}

	var stringValue = UTILS.getStringValue(object).toLowerCase();
	switch (stringValue) {
		case 'true':
			return true;
		case 't':
			return true;
		case '1':
			return true;
		case 'yes':
			return true;
		case 'y':
			return true;
		case 'checked':
			return true;
		case 'selected':
			return true;
		case 'on':
			return true;

		default:
			return false;
	}
};
UTILS.getFloatValue         = function (value) {
	if ( UTILS.isNoE(value) ) {
		return 0.0;
	}

	else {

		var floatValue = 0.0;
		try {
			floatValue = parseFloat(value);
			if ( isNaN(floatValue) ) {
				floatValue = 0.0;
			}
		} catch (ex) {
		}

		return floatValue;
	}
};
UTILS.getIntValue           = function (value) {
	if ( UTILS.isNoE(value) ) {
		return 0;
	}

	else {

		var intValue = 0;
		try {
			intValue = parseInt(value);
			if ( isNaN(intValue) ) {
				intValue = 0;
			}
		} catch (ex) {
		}

		return Math.floor(intValue);
	}
};
UTILS.getIntValueByRounding = function (value) {
	if ( UTILS.isNoE(value) ) {
		return 0;
	}

	else {

		var intValue = 0;
		try {
			intValue = Math.round(value);

			if ( isNaN(intValue) ) {
				intValue = 0;
			}
		} catch (ex) {
		}

		return intValue;
	}
};
UTILS.getArrayValue         = function (value, delim) {
	// array
	if ( UTILS.isArray(value) ) {
		return value;
	}

	// nothing
	if ( value === null || value === '' ) {
		return null;
	}

	if ( UTILS.isString(value) && UTILS.isA(delim) ) {
		return value.split(delim);
	}

	// other
	return [value];
};

/**
 *  IS-TYPEers
 */
UTILS.isArray                 = function (obj) {
	return Object.prototype.toString.call( obj ) === '[object Array]';
};
UTILS.isString                = function (obj) {
	return Object.prototype.toString.call( obj ) === '[object String]';
};
UTILS.isDate                  = function (obj) {
	return Object.prototype.toString.call( obj ) === '[object Date]';
};
UTILS.isNumber                = function (obj) {
	return Object.prototype.toString.call( obj ) === '[object Number]';
};
UTILS.isRegExp                = function (obj) {
	return Object.prototype.toString.call( obj ) === '[object RegExp]';
};
UTILS.isBoolean               = function (obj) {
	return Object.prototype.toString.call( obj ) === '[object Boolean]';
};
UTILS.isInt                   = function (obj) {
	return UTILS.isNumber(obj) && obj % 1 === 0;
};
UTILS.isFunction              = function (obj) {
	return Object.prototype.toString.call( obj ) === '[object Function]';
};
UTILS.isObject                = function (obj) {
	// Null and Undefined are also objects in JavaScript
	// when we are asking if this is an Object
	// we mean to say
	if ( typeof obj === 'undefined' || obj === null) {
		return false;
	}
	return Object.prototype.toString.call( obj ) === '[object Object]';
};
UTILS.isJquery                = function (obj) {
	if ( UTILS.isNoE(obj) ) {
		return false;
	}
	return (obj.jquery !== undefined);
};

/**
 *  UTILITY FUNCTIONS 
 */
UTILS.fLeft                 = function (string, delim) {
	if ( UTILS.isNoE(string) || UTILS.isNoE(delim) ) {
		return '';
	}

	string = UTILS.getStringValue(string);
	delim  = UTILS.getStringValue(delim);

	var theSpot = string.indexOf(delim);
	if ( theSpot > -1 ) {
		return string.substring(0, theSpot);
	}
	return '';
};
UTILS.fLeftBack             = function (string, delim) {
	if ( UTILS.isNoE(string) || UTILS.isNoE(delim) ) {
		return '';
	}

	string = UTILS.getStringValue(string);
	delim  = UTILS.getStringValue(delim);

	var theSpot = string.lastIndexOf(delim);
	if ( theSpot > -1 ) {
		return string.substring(0, theSpot);
	}
	return '';
};
UTILS.fRight                = function (string, delim) {
	if ( UTILS.isNoE(string) || UTILS.isNoE(delim) ) {
		return '';
	}

	string = UTILS.getStringValue(string);
	delim  = UTILS.getStringValue(delim);

	var theSpot = string.indexOf(delim);
	if ( theSpot > -1 ) {
		return string.substring(theSpot + delim.length, string.length);
	}

	return '';
};
UTILS.fRightBack            = function (string, delim) {

	if ( UTILS.isNoE(string) || UTILS.isNoE(delim) ) {
		return '';
	}

	string = UTILS.getStringValue(string);
	delim  = UTILS.getStringValue(delim);

	var theSpot = string.lastIndexOf(delim);
	if ( theSpot > -1 ) {
		return string.substring(theSpot + delim.length, string.length);
	}

	return '';
};
UTILS.fBetween              = function (string, delimLeft, delimRight) {
	return UTILS.fLeft(UTILS.fRight(string, delimLeft), delimRight);
};
UTILS.fBetweenOuter         = function (string, delimLeft, delimRight) {
	return UTILS.fLeftBack(UTILS.fRight(string, delimLeft), delimRight);
};
UTILS.replaceFor            = function (string, lookFor, replaceWith) {
	if ( typeof string === 'undefined' ) {
		return null;
	}
	if ( string == null ) {
		return null;
	}
	if ( string === '' ) {
		return '';
	}
	if ( typeof string !== 'string' ) {
		return null;
	}

	// bad lookfor
	if ( UTILS.isNoE(lookFor) ) {
		return string;
	}

	// bad replaceWith
	if ( UTILS.isNoE(replaceWith) ) {
		replaceWith = '';
	}


	if ( lookFor === replaceWith ) {
		return string;
	}

	var inText     = string,
	    outText    = '',
	    holdText   = '',
	    foundCount = 0,
	    theSpot    = -1;
	while (inText.indexOf(lookFor) > -1) {
		foundCount++;
		theSpot = inText.indexOf(lookFor);

		if ( outText.length > 0 || foundCount > 1 ) {
			outText += replaceWith + inText.substring(0, theSpot);
		}
		else {
			outText = inText.substring(0, theSpot);
		}

		holdText = inText.substring(theSpot + lookFor.length, inText.length);
		inText   = holdText;
	}
	if ( foundCount > 0 ) {
		outText += replaceWith + inText;
	}

	else {
		outText = inText;
	}
	return outText;
};
UTILS.contains              = function (string, substr, caseInsensitive) {
	if ( UTILS.isNoE(substr) ) {
		return false;
	}

	if ( typeof string === 'string' ) {
		if ( caseInsensitive ) {
			return string.toLowerCase().indexOf(substr.toLowerCase()) > -1;
		}

		else {
			return string.indexOf(substr) > -1;
		}

	}

	return false;
};
UTILS.endsWith              = function (string, lookFor, caseInsensitive) {
	if ( UTILS.isNoE(string) || UTILS.isNoE(lookFor) || !UTILS.isString(string) ) {
		return false;
	}

	if ( caseInsensitive ) {
		return string.toLowerCase().slice(-lookFor.length) === lookFor.toLowerCase();
	}


	return string.slice(-lookFor.length) === lookFor;
};
UTILS.startsWith            = function (string, lookFor, caseInsensitive) {
	if ( UTILS.isNoE(string) || UTILS.isNoE(lookFor) ) {
		return false;
	}

	if ( caseInsensitive ) {
		return string.toLowerCase().slice(0, lookFor.length) === lookFor.toLowerCase();
	}

	return string.slice(0, lookFor.length) === lookFor;
};

/**
 *  RANDOMS AND ROLLS
 */
UTILS.random                = function (max = 10, min = 0) {
	max = parseInt(max);
	min = parseInt(min);

	if ( isNaN(max) ) {
		max = 10;
	}
	if ( isNaN(min) ) {
		min = 0;
	}

	if ( min > max ) {
		var t = min;
		min   = max;
		max   = t;
	}

	return Math.floor(Math.random() * ((max + 1) - min)) + min;
};
UTILS.flipIsHeads           = function () {
	return !!UTILS.random(1);
};
UTILS.roll                  = function (sided = 6) {
	// minimum die has 1 side (in some strange world)
	if ( sided < 1 ) {
		return 1;
	}
	return UTILS.random(Math.max(1, sided), 1);
};

export default UTILS;