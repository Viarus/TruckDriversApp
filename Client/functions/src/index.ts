import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const onUserSignup = functions.auth.user().onCreate((user) => {
    const pathToUserPrivateInfoDoc = admin.firestore()
        .collection("users")
        .doc(user.uid)
        .collection("userInfo")
        .doc("userPrivateInfo");

    const pathToUserSavedDaysCollection = admin.firestore()
        .collection("users")
        .doc(user.uid)
        .collection("savedDays");

    const pathToUserDoc = admin.firestore()
        .collection("users")
        .doc(user.uid);

    if (user.email == "") {
        // const dayInMilliseconds = 86400000;
        setTimeout(() => {
            pathToUserSavedDaysCollection.get()
                .then((res) => {
                    res.forEach((element) => {
                        element.ref.delete();
                    });
                });
            pathToUserPrivateInfoDoc.delete();
            pathToUserDoc.delete();
        }, 60000);
    } else {
        pathToUserPrivateInfoDoc.set({
            email: user.email,
        });
    }
    return null;
});
