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

let hide = document.getElementById("hide")
let registerAcc = document.getElementById("registerAcc")
let welcomepage = document.getElementById("welcomepage")
let forms = document.getElementById("forms")
let LoginAcc = document.getElementById("LoginAcc")


welcomepage.style.display = "none"


// registerAcc.setAttribute('disabled', 'true');



hide.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'

function hidePass() {
    if (signedPassword.type == 'password' || hide.innerHTML == '<i class="fa-solid fa-eye-slash"></i>') {
        signedPassword.type = 'text'
        hide.innerHTML = '<i class="fa-solid fa-eye"></i>'
    } else {
        signedPassword.type = 'password'
        hide.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
    }
}


function backArrow() {
    window.location.href = "signup.html"
}


function spinners() {
    LoginAcc.innerHTML = `
    <div class="spinner-border text-light loader" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
`
}


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
                LoginAcc.innerHTML = "Login"
                forms.style.display = "none"
                dashboard()
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                info.innerHTML = `<p class = "text-danger">${errorMessage}</p>`
                LoginAcc.innerHTML = "Login"
            });
    }
    signedEmail.value = "";
    signedPassword.value = "";
}



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

function dashboard() {
    welcomepage.style.display = "block"
    setTimeout(() => {
        welcomepage.style.display = "none"
        window.location.href = "dashboard.html"
    }, 10000);
}