// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyABWrl1iE755ntHAHofewb86cmi5bK8CwM",
    authDomain: "my-fitness-90dfe.firebaseapp.com",
    databaseURL: "https://my-fitness-90dfe.firebaseio.com",
    projectId: "my-fitness-90dfe",
    storageBucket: "my-fitness-90dfe.appspot.com",
    messagingSenderId: "641923244713"
  }
};