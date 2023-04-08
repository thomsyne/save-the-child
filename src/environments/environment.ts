// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //BASE_URL: "https://sandbox.globalaccelerex.com",
  BASE_URL: "https://rexretail.globalaccelerex.com",
  // BASE_URL_PGS: "https://sandbox.globalaccelerex.com",
  BASE_URL_PGS: "https://sandbox-v2.globalaccelerex.com",
  ACCESS_CONTROL_BTOA: btoa("peter" + ":" + "peter"),
  NONCE: "TESTME",
  ACCOUNT_LOOKUP_BASE_URL: "https://anp-api-nigeria-dev.globalaccelerex.com",
  ACCOUNT_LOOKUP_ENDPOINT: "/api/agent-network/common/v1/accountlookup",
  MSAL_TOKEN: "71b6729d-1668-481d-8a68-a26612c729bf",
  CSS_URL:
    "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/design-system/styles-responsive.alpha03.min.css",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
