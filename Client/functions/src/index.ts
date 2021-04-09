import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const onUserSignup = functions.auth.user().onCreate((user) => {
    const pathToUserPrivateInfoDoc = admin.firestore()
        .collection("users")
        .doc(user.uid)
        .collection("userInfo")
        .doc("userPrivateInfo");

    return pathToUserPrivateInfoDoc.set({
        email: user.email,
    });
});
