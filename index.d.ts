export function parseAuthenticateHeader(text: string): Challenge[];
export function parseAuthorizationHeader(text: string): Credentials;

type Credentials = Challenge

interface Challenge {
  /** normalized to lowercase */
  scheme: string,

  params: NormalizedParameters | EncodedParameters
}

/** Used if parameter list is provided in input */
interface NormalizedParameters {
  /** paramName is normalized to lowercase */
  [paramName: string]: string;
}

/**
 * Used if encoded parameters are provided in input
 * e.g. in the Authorization response header for the Basic scheme
 */
interface EncodedParameters {
  Encoded: string;
}
