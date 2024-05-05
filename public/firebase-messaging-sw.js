importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyB2sAaGg9juq2O-r5vvlnGmh35kpBq0km8",
  authDomain: "hacknconquer.firebaseapp.com",
  projectId: "hacknconquer",
  storageBucket: "hacknconquer.appspot.com",
  messagingSenderId: "255890829580",
  appId: "1:255890829580:web:439095edf5bcb7e58f5929",
  measurementId: "G-4S52WXQ87K",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
