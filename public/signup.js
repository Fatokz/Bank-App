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

function createAcc(event) {
    event.preventDefault()

    if (username.value == "" || firstname.value == "" || lastname.value == "" || email.value == "" || password.value == "" || conpassword.value == "") {
        alert("All fields are required")
        return;
    }

    else if (password.value !== conpassword.value) {
        alert("Password doesn't match")
        return;
    }

    else {
        spinner()

        let name = `${firstname.value.toUpperCase()} ${lastname.value.toUpperCase()}`;
        let accountnum = document.getElementById("accountnum");

        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;

                user.updateProfile({
                    displayName: username.value,
                }).then(() => {
                    accountnum.style.display = "none"
                    for (let index = 1; index <= 10; index++) {
                        account = Math.floor(Math.random() * 10)
                        acc_details = accountnum.innerHTML += account
                    }
                    db.collection("user").doc(user.uid).set({
                        username: user.displayName,
                        dob: null,
                        country: "Nigeria",
                        fullname : name,
                        profile: null,
                        account_num: acc_details,
                        transaction_pin: null,
                        email: user.email,
                        wallet: 5000,
                        transaction_history: [],
                        time: new Date()
                    })
                        .then(() => {
                            // console.log("Signup Successful");
                            message.innerHTML = `<h2 class = "text-success">Registration Successful</h2>`
                            username.value = ""
                            firstname.value = ""
                            lastname.value = ""
                            email.value = ""
                            password.value = ""
                            conpassword.value = ""
                            register.innerHTML = "Create Account"
                            window.location.href = "ads.html"
                            console.log(user);
                            // console.log(username.value);
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                            // message.innerHTML = `<h2 class = "text-danger">${error}</h2>`
                            register.innerHTML = "Create Account"
                        });
                }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log("Something went wrong", error);
                    // message.innerHTML = `<h2 class = "text-danger">${error}</h2>`
                    register.innerHTML = "Create Account"
                });

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                message.innerHTML = `<h2 class = "text-danger">${errorMessage}</h2>`
                if (message.innerHTML = `<h2 class = "text-danger">${errorMessage}</h2>`) {
                    form.style.height = "fit-content"
                }
                register.innerHTML = "Create Account"
                // ..
            });
    }

}

function login() {
    window.location.href = "login.html"
}

