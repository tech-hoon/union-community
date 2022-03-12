module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,xml,ico,png,txt,js,css,gif,svg}'
	],
	swDest: 'build/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};