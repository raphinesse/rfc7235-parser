const {Grammar, Parser} = require('nearley');
const addAutoUnwrap = require('nearley-auto-unwrap');
const grammar = require('./grammar');

module.exports = class extends Parser {
	constructor(start = grammar.ParserStart) {
		const autoUnwrapGrammar = addAutoUnwrap(grammar);
		super(Object.assign(Grammar.fromCompiled(autoUnwrapGrammar), {start}));
	}

	get result() {
		if (this.results.length !== 1) {
			throw new Error('Expected grammar to be unambigous');
		}

		return this.results[0];
	}
};
