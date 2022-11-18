// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);
// eslint-disable-next-line no-undef
//importScripts("https://www.gstatic.com/firebase/init.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyB5PTUFKw7Rrdzw0jVEfnvEgf33BFlsk4I",
  authDomain: "magnetfx-5a6ac.firebaseapp.com",
  projectId: "magnetfx-5a6ac",
  storageBucket: "magnetfx-5a6ac.appspot.com",
  messagingSenderId: "321695921297",
  appId: "1:321695921297:web:f11615c0eedffd62f57b30",
  measurementId: "G-FQZ86N2RR7",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/logo192.png",
//   };

//   // eslint-disable-next-line no-restricted-globals
//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });

console.log('FCM from root cms');
// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();
console.log('FCM from root cms2');

messaging.onMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message root cms", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});