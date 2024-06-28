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

let signUps = document.getElementById("signUps")
let signIn = document.getElementById("signIn")
let account = document.getElementById("account")
let arrowback = document.getElementById("arrowback")
let message = document.getElementById("message")
let info = document.getElementById("info")
let eye = document.getElementById("eye")
let show = document.getElementById("show")
let username = document.getElementById("username")


// registerAcc.setAttribute('disabled', 'true');

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
    registerAcc.innerHTML = `
    <div class="spinner-border text-light loader" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
`
}


function createAcc(event) {
    event.preventDefault()
    // let username = document.getElementById("username")

    if (username.value == "" || firstname.value == "" || lastname.value == "" || email.value == "" || password.value == "" || conpassword.value == "") {
        alert("All fields are required")
        return;
    }
    else if (password.value !== conpassword.value) {
        alert("Password doesn't match")
        return;
    }
    else {
        // button.removeAttribute('disabled', true); 
        spinner()
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;

                
                user.updateProfile({
                    displayName: username.value,
                }).then(() => {
                    // Update successful
                    // ...
                    message.innerHTML = `<h2 class = "text-success"> Registration Successfull</h2>`
                    registerAcc.innerHTML = "Create Account"
                    // window.location.href = "login.html"
                    console.log(user);
                }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log("Something went wrong", error);
                });
                // alert("Registration Successful")

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                message.innerHTML = `<h2 class = "text-danger">${errorMessage}</h2>`
                registerAcc.innerHTML = "Create Account"
                // ..
            });
    }
    name.value = "";
    firstname.value = "";
    lastname.value = "";
    email.value = "";
    password.value = "";
    conpassword.value = "";
    message.innerHTML = "";
}


function login() {
    window.location.href = "login.html"
}