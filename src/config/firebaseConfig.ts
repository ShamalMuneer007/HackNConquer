// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app";
import "firebase/messaging";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2sAaGg9juq2O-r5vvlnGmh35kpBq0km8",
  authDomain: "hacknconquer.firebaseapp.com",
  projectId: "hacknconquer",
  storageBucket: "hacknconquer.appspot.com",
  messagingSenderId: "255890829580",
  appId: "1:255890829580:web:439095edf5bcb7e58f5929",
  measurementId: "G-4S52WXQ87K",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestPermission = () => {
  console.log("Requesting for User Permission....");
  return Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted");
      return getToken(messaging, {
        vapidKey:
          "BOuRkUsA8e8mhn5cLmO_NBV-YXU4EgaOCQfz5JGp5HwndObNArK-tRjobBj0mh5LhnGxCGes2qTHkQckvSjYI-I",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log(currentToken, "client FMC Token");
            return currentToken;
          } else {
            console.log("Failed to generate the app registration token");
            return null;
          }
        })
        .catch((err) => {
          console.log(
            "An error occurred when requesting to receive the token",
            err
          );
          return null;
        });
    } else {
      console.log("User Permission Denied");
      return null;
    }
  });
};

export const onMessageListener = () => {
  return new Promise<{ notification: { title: string; body: string } }>(
    (resolve) => {
      onMessage(messaging, (payload: any) => {
        resolve(payload || {});
      });
    }
  );
};
