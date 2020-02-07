const test = require('ava');
const {parseAuthenticateHeader} = require('..');

function authenticateTest(text, expected) {
	return test(text, t => {
		t.deepEqual(parseAuthenticateHeader(text), expected);
	});
}

authenticateTest('Empty', [
	{scheme: 'empty', params: {}}
]);

authenticateTest('Empty, Empty2', [
	{scheme: 'empty', params: {}},
	{scheme: 'empty2', params: {}}
]);

const params1 = {x: 'y'};
authenticateTest('A x=y, B x=y', [
	{scheme: 'a', params: params1},
	{scheme: 'b', params: params1}
]);

const params2 = {a: 'b', x: 'y'};
authenticateTest('A a=b, x=y, B a=b, x=y', [
	{scheme: 'a', params: params2},
	{scheme: 'b', params: params2}
]);
