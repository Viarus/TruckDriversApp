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

    if ((user.email == "") || (user.email == null)) {
         const halfOfDayInMilliseconds = 14400000;
        pathToUserPrivateInfoDoc.set({
            email: "guestAccount",
        });
        pathToUserSavedDaysCollection.doc("fileCreatedJustForCollection")
        .set({
            whyIamHere: "To make sure that the collection is created",
        });
        setTimeout(() => {
            pathToUserSavedDaysCollection.get()
                .then((res) => {
                    res.forEach((element) => {
                        element.ref.delete();
                    });
                });
            pathToUserPrivateInfoDoc.delete();
            pathToUserDoc.delete();
            admin.auth().deleteUser(user.uid);
        }, halfOfDayInMilliseconds);
    } else {
        pathToUserPrivateInfoDoc.set({
            email: user.email,
        });
    }
    return null;
});
