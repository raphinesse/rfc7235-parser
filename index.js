// @ts-check

const Parser = require('./parser');

/**
 * @typedef { import(".").Challenge } Challenge
 * @typedef { import(".").Credentials } Credentials
 */

module.exports = {
	/**
	 * Parse a WWW-Authenticate or Proxy-Authenticate header field
	 *
	 * @param {string} text - the text contents of the header field
	 * @return {Challenge[]} the list of challenges present in the header
	 */
	parseAuthenticateHeader(text) {
		return new Parser('Authenticate').feed(text).result;
	},

	/**
	 * Parse a Authorization or Proxy-Authorization header field
	 *
	 * @param {string} text the text contents of the header field
	 * @return {Credentials} the credentials present in the header
	 */
	parseAuthorizationHeader(text) {
		return new Parser('Authorization').feed(text).result;
	}
};
