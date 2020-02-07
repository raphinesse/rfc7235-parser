const test = require('ava');
const {parseAuthorizationHeader} = require('..');

function authorizationTest(text, expected) {
	return test(text, t => {
		t.deepEqual(parseAuthorizationHeader(text), expected);
	});
}

authorizationTest('Empty', {
	scheme: 'empty',
	params: {}
});

authorizationTest('Single foo=bar', {
	scheme: 'single',
	params: {foo: 'bar'}
});

authorizationTest('Double foo=bar, baz="x@y"', {
	scheme: 'double',
	params: {foo: 'bar', baz: 'x@y'}
});

authorizationTest('Base64 asdqweq==', {
	scheme: 'base64',
	params: {Encoded: 'asdqweq=='}
});

authorizationTest('CASE IS=vOiD', {
	scheme: 'case',
	params: {is: 'vOiD'}
});
