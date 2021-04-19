import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SecretConstants {
    static readonly webApiKey:string = "AIzaSyC9fDU4_cM0QL4e5oS_2qBBDDeglrYIxuA";

    static readonly firebaseConfig = {
        apiKey: "AIzaSyC9fDU4_cM0QL4e5oS_2qBBDDeglrYIxuA",
        authDomain: "truckapp-6433b.firebaseapp.com",
        databaseURL: "https://truckapp-6433b-default-rtdb.firebaseio.com",
        projectId: "truckapp-6433b",
        storageBucket: "truckapp-6433b.appspot.com",
        messagingSenderId: "797184390532",
        appId: "1:797184390532:web:22cdaffe0f38c27154d9d1",
        measurementId: "G-2P4J278DQ2"
      };

      readonly pathToDaysApi: string = 'https://localhost:44396/api/days';
}