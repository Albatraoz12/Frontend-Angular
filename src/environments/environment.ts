// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  spoonUrl: 'https://api.spoonacular.com/recipes/complexSearch?apiKey=',
  spoonUrlSinge: 'https://api.spoonacular.com/recipes/',
  spoonRandom: 'https://api.spoonacular.com/recipes/random?',
  apiKey: '585a45e21e2547dfb6c6cd369e6a76e7',
  // apiKey: '050742ec9ef64a719d760c22b2903868', //apiKey 2
  heroUrl: 'https://dinorage-api.herokuapp.com/api/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
