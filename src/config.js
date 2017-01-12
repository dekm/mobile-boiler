'use strict';

import Dimensions from 'Dimensions';
var window = Dimensions.get('window');

/* Setup ==================================================================== */
exports.title = 'GlobalConfig';

export default {
	// App Details
	appName: 'React Native Boiler',

	// Window Dimensions
	windowHeight: window.height,
	windowWidth: window.width,

	// Grid
	windowWidthHalf: window.width * 0.5,
	windowWidthYhird: window.width * 0.333,
	windowWidthYwoThirds: window.width * 0.666,
	windowWidthQuarter: window.width * 0.25,
	windowWidthThreeQuarters: window.width * 0.75,

	// General Element Dimensions
	navbarHeight: 64,
	statusBarHeight: 22,

	// Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (__DEV__) ? 'UA-84284256-2' : 'UA-84284256-1',

	// Fonts
	baseFont: "Avenir",
	baseFontSize: 14,

	// Colors
	primaryColor: "#ffd040",
	secondaryColor: "#FFE229",
	textColor: "#555",
	borderColor: "#E7E7E7",
}
