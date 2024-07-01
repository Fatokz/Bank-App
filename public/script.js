const firebaseConfig = {
  apiKey: "AIzaSyAB4RSOJNQMw2con6a24L2iZNtPeXXSLHk",
  authDomain: "safecoin-bank.firebaseapp.com",
  projectId: "safecoin-bank",
  storageBucket: "safecoin-bank.appspot.com",
  messagingSenderId: "176143247407",
  appId: "1:176143247407:web:751ede9ce7fedd688bbeda",
  measurementId: "G-72DTH8MZ32"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


function signn() {
  window.location.href = 'signup.html'
}

function logg() {
  window.location.href = 'login.html'
}

function getsignup() {
  window.location.href = 'signup.html'
}

function download(event) {
    alert("Coming Soon")
}



