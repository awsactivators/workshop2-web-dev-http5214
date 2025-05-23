// Documentation
// https://firebase.google.com/docs/database/web/read-and-write

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
  set,
  push,
} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase();

// Fetch messages
const messages = ref(database, "/messages");

// On data event
onValue(
  messages,
  (snapshot) => {
    // Create a reference to the ul element
    const ul = document.getElementById("messages");

    // Empty the ul emelemt
    ul.replaceChildren();

    // Loop through messages
    snapshot.forEach((childSnapshot) => {
      // Get key and children
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();

      console.log(childKey);
      console.log(childData);

      // Add message to list
      const text = document.createTextNode(
        childData.message + " ~ " + childData.name
      );
      const li = document.createElement("li");
      li.appendChild(text);
      ul.appendChild(li);
    });
  },
  {
    onlyOnce: false,
  }
);

// Add event to button
const submit = document.getElementById("submit");
const name = document.getElementById("name");
const message = document.getElementById("message");

submit.addEventListener("click", function () {
  const messages = ref(database, "messages");
  push(messages, {
    message: message.value,
    name: name.value,
    createdAt: new Date().getTime(),
  });
});
