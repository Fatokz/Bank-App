const firebaseConfig = {
    apiKey: "AIzaSyAB4RSOJNQMw2con6a24L2iZNtPeXXSLHk",
    authDomain: "safecoin-bank.firebaseapp.com",
    projectId: "safecoin-bank",
    storageBucket: "safecoin-bank.appspot.com",
    messagingSenderId: "176143247407",
    appId: "1:176143247407:web:751ede9ce7fedd688bbeda",
    measurementId: "G-72DTH8MZ32"
};

// Initialize Firebase and Firestore
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Get references to DOM elements
let hide = document.getElementById("hide")
let registerAcc = document.getElementById("registerAcc")
let welcomepage = document.getElementById("welcomepage")
let forms = document.getElementById("forms")
let LoginAcc = document.getElementById("LoginAcc")
let mypin = document.getElementById("mypin");
let pin1 = document.getElementById("pin1");
let pin2 = document.getElementById("pin2");
let pin3 = document.getElementById("pin3");
let pin4 = document.getElementById("pin4");
let infos = document.getElementById("infos");
let pinset = document.getElementById("pinset");

// Hide the welcome page by default
welcomepage.style.display = "none"
setpin.style.display = "none"


// Set initial inner HTML for the hide button
hide.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'

// Function to toggle password visibility
function hidePass() {
    if (signedPassword.type == 'password' || hide.innerHTML == '<i class="fa-solid fa-eye-slash"></i>') {
        signedPassword.type = 'text'
        hide.innerHTML = '<i class="fa-solid fa-eye"></i>'
    } else {
        signedPassword.type = 'password'
        hide.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
    }
}

// Function to navigate back to the signup page
function backArrow() {
    window.location.href = "signup.html"
}

// Function to show a loading spinner in the login button
function spinners() {
    LoginAcc.innerHTML = `
    <div id="load">    
        <div class="loader"></div>
    </div>
`
}

// Function to show a loading spinner in the pinset button
function spinner() {
    pinset.innerHTML = `
    <div id="loads">    
        <div class="loader"></div>
    </div>
`
}


// Function to handle user login
function gainAccess(ev) {
    ev.preventDefault()

    if (signedEmail.value == "" || signedPassword.value == "") {
        alert("All fields are required")
        return;
    }
    else {
        spinners()

        firebase.auth().signInWithEmailAndPassword(signedEmail.value, signedPassword.value)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(user);
                // alert("Login Successful")
                info.innerHTML = `<p class = "text-success"> Login Successfull</p>`
                signedEmail.value = "";
                signedPassword.value = "";
                LoginAcc.innerHTML = "Login"
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        var uid = user.uid;
                        // ...
                        var docRef = db.collection("user").doc(uid);
                        docRef.get().then((doc) => {
                            if (doc.exists) {
                                if (doc.data().transaction_pin == null) {
                                    forms.style.display = "none"
                                    setpin.style.display = "block"
                                    return;
                                }
                            }
                            window.location.href = "dashboard.html"

                        }).catch((error) => {
                            console.log("Error getting document:", error);
                        });
                    } else {
                        // User is signed out
                        // ...
                    }
                });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                info.innerHTML = `<p class = "text-danger">${errorMessage}</p>`
                LoginAcc.innerHTML = "Login"
            });
    }
}


// Function for automatic typing effect
let autotype = document.getElementById("autotype");
let text = "SafeCoin Bank";
let index = 0;
let forward = true

setInterval(() => {
    if (index < text.length && forward) {
        autotype.innerHTML += text[index]
        index++;
    } else if (index > 0) {
        forward = false;
        // return
        index--;
        autotype.innerHTML = text.substring(0, index)
    } else {
        forward = true;
    }
}, 400);


// Function to navigate to the dashboard after showing a welcome message
function dashboard() {
    setTimeout(() => {
        setpin.style.display = "none"
        welcomepage.style.display = "block"
    }, 2000);
    setTimeout(() => {
        welcomepage.style.display = "none"
        window.location.href = "dashboard.html"
    }, 10000);
}


// // Function to move to the next input field in the PIN input sequence
// function moveToNext(current, nextFieldID) {
//     if (current.value.length === 1 && nextFieldID !== "") {
//         document.getElementById(nextFieldID).focus();
//     }
// }


// Function to move to the next input field in the PIN input sequence
function moveToNext(current, nextFieldID) {
    if (current.value.length > 1) {
        current.value = current.value.slice(0, 1);
    }
    if (current.value.length === 1) {
        // current.value = '*';
        if (nextFieldID !== "") {
            document.getElementById(nextFieldID).focus();
        }
    }
}

// Function to move to the previous input field when the backspace key is pressed
function moveToPrevious(event, current, previousFieldID) {
    if (event.key === "Backspace" && current.value.length === 0 && previousFieldID !== "") {
        document.getElementById(previousFieldID).focus();
    }
}


// Function to transform input types to password after a delay
function transformation() {
    setTimeout(() => {
        if (pin1.type == "number") {
            pin1.value.length = 1
            pin1.type = "password";
            return;
        }
    }, 2000);

    setTimeout(() => {
        if (pin2.type == "number") {
            pin2.type = "password";
            return;
        }
    }, 3000);

    setTimeout(() => {
        if (pin3.type == "number") {
            pin3.type = "password";
            return;
        }
    }, 4000);

    setTimeout(() => {
        if (pin4.type == "number") {
            pin4.type = "password";
            return;
        }
    }, 4000);
}

// Call the transformation function
transformation();


// Function to create a PIN and save it to Firestore
function create() {
    if (pin1.value == "" || pin2.value == "" || pin3.value == "" || pin4.value == "") {
        // console.log("PIN must be up to 4 digit");
        infos.innerHTML = "PIN must be up to 4 digit"
        return;
    } else {
        spinner()

        let pins = pin1.value + pin2.value + pin3.value + pin4.value;
        let pin = +pins

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;
                // console.log(user);

                var docRef = db.collection("user").doc(uid);

                docRef.get().then((doc) => {
                    if (doc.exists) {
                        // console.log("Document data:", doc.data());
                        // console.log(doc.data().transaction_pin);

                        if (doc.data().transaction_pin == null) {
                            docRef.update({
                                transaction_pin: pin
                            }).then(() => {
                                console.log("Transaction PIN successfully set!");
                                infos.innerHTML = '<p class="text-success">Transaction PIN successfully set!</p>'
                                // console.log(doc.data());
                                dashboard()
                            }).catch((error) => {
                                console.error("Error setting transaction PIN: ", error);
                                infos.innerHTML = '<p class="text-danger">Error setting transaction PIN</p>'
                            });
                        }

                        pinset.innerHTML = "Create PIN";
                    } else {
                        console.log("No such document!");
                        infos.innerHTML = '<p class="text-danger">No such document!</p>'
                        pinset.innerHTML = "Create PIN";
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                    infos.innerHTML = '<p class="text-danger">Error getting document</p>'
                    pinset.innerHTML = "Create PIN";
                });
            } else {
                console.log("User is signed out");
                pinset.innerHTML = "Create PIN";
            }
        });

    }
}