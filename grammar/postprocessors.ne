@builtin "postprocessors.ne"

@{%
const discard = () => null;
const join = d => d.join('');
const concat = d => [].concat(...d);
const pipe = (...fns) => d => fns.reduce((acc, fn) => fn(acc), d);
%}
