const test = require('ava');
const Parser = require('../parser');

function paramListTest(text, expected) {
	return test(text, t => {
		t.deepEqual(new Parser('params').feed(text).result, expected);
	});
}

paramListTest('space="Wally World"', {space: 'Wally World'});

paramListTest('comma="this,that"', {comma: 'this,that'});

paramListTest(',,,', {});

paramListTest(', ,asd=qwe, ,foo=bar,,', {asd: 'qwe', foo: 'bar'});
