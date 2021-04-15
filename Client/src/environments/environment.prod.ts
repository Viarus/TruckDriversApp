import { SecretConstants } from "src/app/shared/secret.constants";

let firebaseConfig = SecretConstants.firebaseConfig;
export const environment = {
  production: true,
  firebaseConfig
};
