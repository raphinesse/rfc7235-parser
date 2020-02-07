@include "./postprocessors.ne"

@{%
const cons = ([head, tail]) => [head].concat(tail);
const dropNull = xs => xs.filter(x => x !== null);
%}

# RFC 7230

# Section 7: ABNF List Extension: #rule
# see https://tools.ietf.org/html/rfc7230#section-7

# Comma separated list
# #el = [ ( "," / el ) *( OWS "," [ OWS el ] ) ]
list[el]		-> list_impl[list_head[.]]:?			{% l => l || [] %}
list_head[_]	-> "," {% discard %} | $el

# Comma separated list with at least one element
# 1#el = *( "," OWS ) el *( OWS "," [ OWS el ] )
list_1+[el]		-> list_impl[list_1+_head[.]]
list_1+_head[_]	-> ( "," OWS ):* $el					{% nth(1) %}

# Helpers for above list macros
list_impl[head]	-> $head list_segm[.]:*					{% pipe(cons, dropNull) %}
list_segm[_]	-> OWS "," ( OWS $el {% nth(1) %} ):?	{% nth(2) %}

# Section 3.2.3: Whitespace
# see https://tools.ietf.org/html/rfc7230#section-3.2.3

# Optional whitespace: OWS = *( SP / HTAB )
OWS				-> [\t ]:*								{% discard %}

# Section 3.2.6: Field Value Components
# see https://tools.ietf.org/html/rfc7230#section-3.2.6

# String of US-ASCII visual characters except delimiters ("(),/:;<=>?@[\]{})
token			-> [A-Za-z0-9!#$%&'*+.^_`|~-]:+			{% join %}

# Double quoted string (RFC rule names are quoted-string, quoted-pair and qdtext)
quoted_string	-> "\"" ( qchar | esc_char ):* "\""		{% pipe(nth(1), join) %}
esc_char		-> "\\" ( qchar | ["\\] )				{% nth(1) %}
qchar			-> [\t !\x23-\x5B\x5D-\x7E\x80-\xFF]
