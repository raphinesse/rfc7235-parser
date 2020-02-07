# rfc7235-parser [![Build Status](https://travis-ci.org/raphinesse/rfc7235-parser.svg?branch=master)](https://travis-ci.org/raphinesse/rfc7235-parser)

> A parser for [RFC 7235](https://tools.ietf.org/html/rfc7235) HTTP/1.1 Authentication headers

## Install

```
$ npm install rfc7235-parser
```

## Usage

```js
const {
  parseAuthenticateHeader,
  parseAuthorizationHeader
} = require('rfc7235-parser');

const challenges = parseAuthenticateHeader(
  'Basic asdQWE==, Digest realm="foo@bar"'
);
console.log(challenges);
// [
//   {scheme: 'basic', params: {Encoded: 'asdQWE=='}},
//   {scheme: 'digest', params: {realm: 'foo@bar'}}
// ]

const credentials = parseAuthorizationHeader(
  'Digest realm="foo@bar", QoP="auth,auth-int"'
);
console.log(credentials);
// {
//   scheme: 'digest',
//   params: {
//     realm: 'foo@bar',
//     qop: 'auth,auth-int'
//   }
// }
```

---

Crafted with ♡ by raphinesse using the [nearley](https://nearley.js.org/) parser toolkit.
