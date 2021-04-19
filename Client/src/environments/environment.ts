// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {SecretConstants} from "../app/shared/constants/secret.constants"

let firebaseConfig = SecretConstants.firebaseConfig;

export const environment = {
  production: false,
  firebaseConfig
};