@include "./postprocessors.ne"
@include "./rfc7230.ne"

# RFC 7235

# Section 2.1: Challenge and Response
# see https://tools.ietf.org/html/rfc7235#section-2.1
# and https://tools.ietf.org/html/rfc7235#appendix-C

# WWW-Authenticate or Proxy-Authenticate header
Authenticate	-> list_1+[scheme+params]

# Authorization or Proxy-Authorization header
Authorization	-> scheme+params

# credentials or challenge
# challenge = credentials = auth-scheme [ 1*SP ( token68 / #auth-param ) ]
scheme+params	-> token_i params?				{% $({scheme: 0, params: 1}) %}
params?			-> null							{% () => ({}) %}
				 | " ":+ params					{% nth(1) %}
params			-> token68						{% t => ({Encoded: t}) %}
				 | list[auth_param]				{% l => Object.fromEntries(l) %}

# auth-param = token BWS "=" BWS ( token / quoted-string )
auth_param		-> token_i param_eq param_val	{% ([k, , v]) => [k, v] %}
param_eq		-> OWS "=" OWS					{% discard %}
param_val		-> token | quoted_string

# token68 = 1*( ALPHA / DIGIT / "-" / "." / "_" / "~" / "+" / "/" ) *"="
token68			-> [A-Za-z0-9._~+/-]:+ "=":*	{% pipe(concat, join) %}

# case-insensitive token, normalized to lowercase
token_i			-> token						{% t => t.toLowerCase() %}
