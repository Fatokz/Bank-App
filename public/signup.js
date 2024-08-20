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
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

let signUps = document.getElementById("signUps")
let signIn = document.getElementById("signIn")
let account = document.getElementById("account")
let arrowback = document.getElementById("arrowback")
let message = document.getElementById("message")
let info = document.getElementById("info")
let eye = document.getElementById("eye")
let show = document.getElementById("show")
let username = document.getElementById("username")
let register = document.getElementById("register")
let form = document.getElementById("form")
let acc_details;
let currentUser;


eye.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'

function showPass() {
    if (password.type == 'password' || eye.innerHTML == '<i class="fa-solid fa-eye-slash"></i>') {
        password.type = 'text'
        eye.innerHTML = '<i class="fa-solid fa-eye"></i>'
    } else {
        password.type = 'password'
        eye.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
    }
}

show.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'

function showPassword() {
    if (conpassword.type == 'password' || show.innerHTML == '<i class="fa-solid fa-eye-slash"></i>') {
        conpassword.type = 'text'
        show.innerHTML = '<i class="fa-solid fa-eye"></i>'
    } else {
        conpassword.type = 'password'
        show.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
    }
}


function spinner() {
    register.innerHTML = `
    <div id="load">    
        <div class="loader"></div>
    </div>
`
}


register.disabled = !register.disabled;

function enable(event) {
    if (conpassword.value == "") {
        return
    }
    else if (password.value == conpassword.value) {
        register.disabled = !register.disabled
        return
    }
    else {
        register.disabled = register
    }
}

// function createAcc(event) {
//     event.preventDefault()

//     if (username.value == "" || firstname.value == "" || lastname.value == "" || email.value == "" || password.value == "" || conpassword.value == "") {
//         alert("All fields are required")
//         return;
//     }

//     else if (password.value !== conpassword.value) {
//         alert("Password doesn't match")
//         return;
//     }

//     else {
//         spinner()

//         let name = `${firstname.value.toUpperCase()} ${lastname.value.toUpperCase()}`;
//         let accountnum = document.getElementById("accountnum");

//         firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
//             .then((userCredential) => {
//                 // Signed in 
//                 const currentDate = new Date();
//                 const options = { year: 'numeric', month: 'short', day: 'numeric' };
//                 const formattedDate = currentDate.toLocaleDateString('en-US', options);

//                 var user = userCredential.user;

//                 user.updateProfile({
//                     displayName: username.value,
//                 }).then(() => {
//                     accountnum.style.display = "none"
//                     for (let index = 1; index <= 10; index++) {
//                         account = Math.floor(Math.random() * 10)
//                         acc_details = accountnum.innerHTML += account
//                     }
//                     db.collection("user").doc(user.uid).set({
//                         username: user.displayName,
//                         dob: null,
//                         country: "Nigeria",
//                         fullname: name,
//                         profile: null,
//                         account_num: acc_details,
//                         transaction_pin: null,
//                         email: user.email,
//                         wallet: 5000,
//                         transaction_history: [],
//                         time: formattedDate // Store the current date and time
//                     })
//                         .then(() => {
//                             firebase.auth().currentUser.sendEmailVerification()
//                                 .then(() => {
//                                     // Email verification sent!
//                                     // console.log('Verification email sent.');
//                                     alert('A verification email has been sent to your email address. Please check your inbox.');
//                                 })
//                                 .catch((error) => {
//                                     // Handle errors
//                                     // console.error('Error sending verification email:', error);
//                                     alert('Failed to send verification email. Please try again later.');
//                                 });

//                             setTimeout(() => {
//                                 message.innerHTML = `<h2 class = "text-success fs-5">Registration Successful</h2>`
//                                 username.value = ""
//                                 firstname.value = ""
//                                 lastname.value = ""
//                                 email.value = ""
//                                 password.value = ""
//                                 conpassword.value = ""
//                                 register.innerHTML = "Create Account"
//                                 window.location.href = "ads.html"
//                                 console.log(user);
//                             }, 2000);
//                         })
//                         .catch((error) => {
//                             console.error("Error writing document: ", error);
//                             register.innerHTML = "Create Account"
//                         });
//                 }).catch((error) => {
//                     // console.log("Something went wrong", error);
//                     // message.innerHTML = `<h2 class = "text-danger">${error}</h2>`
//                     register.innerHTML = "Create Account"
//                 });

//             })
//             .catch((error) => {
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 console.log(errorMessage);
//                 message.innerHTML = `<h2 class = "text-danger">${errorMessage}</h2>`
//                 if (message.innerHTML = `<h2 class = "text-danger">${errorMessage}</h2>`) {
//                     form.style.height = "fit-content"
//                 }
//                 register.innerHTML = "Create Account"
//                 // ..
//             });
//     }

// }



// Function to get the number of users in Firebase Authentication


async function getUserCount() {
    // Get the user count from Firestore
    const doc = await db.collection('metadata').doc('userCount').get();
    if (doc.exists) {
        return doc.data().count;
    } else {
        // If the document doesn't exist, initialize the count to 0
        return 0;
    }
}

async function updateUserCount(newCount) {
    // Update the user count in Firestore
    await db.collection('metadata').doc('userCount').set({ count: newCount });
}

async function createAcc(event) {
    event.preventDefault();

    try {
        if (username.value === "" || firstname.value === "" || lastname.value === "" || email.value === "" || password.value === "" || conpassword.value === "") {
            alert("All fields are required");
            return;
        }

        if (password.value !== conpassword.value) {
            alert("Passwords don't match");
            return;
        }

        spinner(); // Show spinner or loading indicator

        // Get the current user count
        const userCount = await getUserCount();

        if (userCount >= 20) { // Check if the user limit is reached
            // alert('User limit reached. Cannot sign up more users.');
            message.innerHTML = `<h2 class="text-danger fs-6">User limit reached. Cannot sign up more users.</h2>`;
            register.innerHTML = "Create Account";
            return;
        }

        // Create user with email and password
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
        const user = userCredential.user;

        // Update user's display name
        await user.updateProfile({
            displayName: username.value,
        });

        // Generate a random 10-digit account number
        let acc_details = "";
        for (let index = 1; index <= 10; index++) {
            const account = Math.floor(Math.random() * 10);
            acc_details += account;
        }

        // Get the current date in the desired format
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);

        // Store user details in Firestore
        await db.collection("user").doc(user.uid).set({
            username: user.displayName,
            dob: null,
            country: "Nigeria",
            fullname: `${firstname.value.toUpperCase()} ${lastname.value.toUpperCase()}`,
            profile: null,
            account_num: acc_details,
            transaction_pin: null,
            email: user.email,
            wallet: 5000,
            transaction_history: [],
            time: formattedDate
        });

        // Update the user count in Firestore
        await updateUserCount(userCount + 1);
        
        // Send email verification
        await user.sendEmailVerification()
            .then(() => {
                // Email verification sent!
                // console.log('Verification email sent.');
                alert('A verification email has been sent to your email address. Please check your inbox.');
            })
            .catch((error) => {
                // Handle errors
                // console.error('Error sending verification email:', error);
                alert('Failed to send verification email. Please try again later.');
            });

        // Registration success actions
        setTimeout(() => {
            message.innerHTML = `<h2 class="text-success fs-5">Registration Successful</h2>`;
            username.value = "";
            firstname.value = "";
            lastname.value = "";
            email.value = "";
            password.value = "";
            conpassword.value = "";
            register.innerHTML = "Create Account";
            window.location.href = "ads.html";
        }, 2000);

    } catch (error) {
        var errorCode = error.code;
        message.innerHTML = `<h2 class="text-danger fs-6">${errorCode}</h2>`;
        form.style.height = "fit-content";
        register.innerHTML = "Create Account";
    }
}


function login() {
    window.location.href = "login.html"
}

