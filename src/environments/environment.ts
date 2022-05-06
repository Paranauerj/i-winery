// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCwE2jxHHuBxYPJSkYg5gm9HQSPDJy3COU",
    authDomain: "iwinery-74cdc.firebaseapp.com",
    projectId: "iwinery-74cdc",
    storageBucket: "iwinery-74cdc.appspot.com",
    messagingSenderId: "183181791719",
    appId: "1:183181791719:web:6eed29cf6fe6dfbf31ad42"
  },
  blockchain: {
    address: "http://192.168.1.232:8001",
    apiKey: "507e1a93c3cb189293914bf4e06e1d94"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
