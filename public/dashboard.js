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
const db = firebase.firestore();

let avatar = document.getElementById("avatar");
let dashboard = document.getElementById("dashboard");
let amount = document.getElementById("amount");
let eye = document.getElementById("eye");
let number = document.getElementById("number");
let coke = document.getElementById("coke");
let wrapper = document.getElementById("wrapper");
let message = document.getElementById("message");
let currentUser;

wrapper.style.display = "none"

let gif = ['./Images/smithmedia.png', './Images/bank.gif', './Images/cocacola.gif', './Images/cocacola2.gif', './Images/fanta.gif', './Images/jumia.gif'];
let index = 0;

// Check if the element with id 'coke' exists
if (coke) {
    coke.src = gif[index];
} else {
    console.error("Element with id 'coke' not found.");
}

function check() {
    dashboard.innerHTML = `
        <div id="dash">
            <div class="loader"></div>
        </div>
`;

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user);
            var uid = user.uid;
            currentUser = user

            var docRef = db.collection("user").doc(uid);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    dashboard.innerHTML = `
                    <div id="nav">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class= "d-flex align-items-center gap-2">
                                <div id="avatar">
                                    <img id="img" onclick="profile()" src="${doc.data().profile || './Images/avatar7.png'}" alt="">
                                </div>
                                <div id="welcome">
                                    <strong>Hi, <span> ${doc.data().username} </span></strong>
                                    <p>Welcome let's make payments!</p>
                                </div>
                            </div>
                            <div class="text-warning fs-4" id="ii">
                                <i class="fa-solid fa-headset"></i>
                                <span onclick="note()" id="rela"><i class="fa-solid fa-bell"></i><span id="notify"><p>1</p></span></span>
                            </div>
                        </div>
                    </div>

                    <div id="section">
                        <div id="balance">
                            <div class="d-flex justify-content-between align-items-center high">
                                <div id="avail">
                                    <p>Available Balance <span id="eye" onclick="hide()"><i class="fa-solid fa-eye"></i></span></p>
                                    <input id="amount" value="&#8358; ${doc.data().wallet.toLocaleString()}" type="text" disabled>
                                </div>
                                <div id="line"></div>
                                <div id="monie">
                                    <p>Transaction History <i class="fa-solid fa-caret-right"></i></p>
                                    <button>Add Money <i class="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                            <div id="earn">
                                <p>Start having account, earn up to 20% p.a. daily </p>
                            </div>
                        </div>
                        <div id="accnum">
                            <div id="num"><p>${doc.data().fullname}</p></div>
                            <div id="copy">
                                <div><p id="number">${doc.data().account_num}</p></div>
                                <button value="copy" id="copied" onclick="copy()">copy <i class="fa-solid fa-copy"></i></button>
                            </div>
                        </div>
                        <div id="transfer">
                            <p>Money Transfer</p>
                            <div class="d-flex justify-content-between">
                                <div id="tobank">
                                    <i class="fa-solid fa-building-columns"></i>
                                    <p>To Bank</p>
                                </div>
                                <div id="tosafe">
                                    <i class="fa-solid fa-piggy-bank"></i>
                                    <p>To SafeCoin</p>
                                </div>
                                <div id="withdraw">
                                    <i class="fa-solid fa-square-phone"></i>
                                    <p>Airtime</p>
                                </div>
                            </div>
                        </div>
                        <div id="Ads">
                            <p>Sponsored Ads</p>
                        </div>
                        <div id="advert">
                            <img id="coke" alt="">
                        </div>
                        <div class="serve">
                            <p>Services</p>
                        </div>
                        <div id="services">
                            <div class="offers">
                                <div class="offer">
                                    <i onclick="pgs()" class="fa-solid fa-bolt"></i>
                                    <p>Electricity</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-wifi"></i>
                                    <p>Data Bundle</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-basketball"></i>
                                    <p>Betting Fund</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-tv"></i>
                                    <p>TV</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-money-bills"></i>
                                    <p>Pay Bill</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-user-plus"></i>
                                    <p>Refer and earn</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-wallet"></i>
                                    <p>Wallet</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-sack-dollar"></i>
                                    <p>CashBox</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-brands fa-bitcoin"></i>
                                    <p>Trade your coin</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-piggy-bank"></i>
                                    <p>Savings</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-code"></i>
                                    <p>Learn to code</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-user-tie"></i>
                                    <p>Avatar</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-gifts"></i>
                                    <p>Giveaway Gifts</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-store"></i>
                                    <p>Pay Shop</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    <p>Shop Online</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-taxi"></i>
                                    <p>Uber</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-jet-fighter"></i>
                                    <p>Travels and Tour</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-trophy"></i>
                                    <p>Win Big</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-money-bill-transfer"></i>
                                    <p>Transfer Bill</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-fire-flame-curved"></i>
                                    <p>Insurance</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-ticket"></i>
                                    <p>Ticket</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-gift"></i>
                                    <p>Reward</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-language"></i>
                                    <p>Language</p>
                                </div>
                                <div class="offer">
                                    <i class="fa-solid fa-school"></i>
                                    <p>School</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="footer">

                    </div>
                    `
                    let num = `${doc.data().account_num}`
                    let store = localStorage.setItem("Safecoin Acc", num)

                    // Re-select coke element and set src again
                    coke = document.getElementById("coke");
                    if (coke) {
                        coke.src = gif[index];
                    } else {
                        console.error("Element with id 'coke' not found after setting dashboard content.");
                    }
                } else {
                    console.log("No such document!");
                    dashboard.innerHTML = "No user data found.";
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
                dashboard.innerHTML = `Error getting document:, ${error}`;
            });
        } else {
            // User is signed out
            alert("Please login")
            window.location.href = "login.html"
        }
    });
}

check()

function profile() {
    message.innerHTML = "Edit Profile";
    wrapper.style.display = "block";

    setTimeout(() => {
        wrapper.style.display = "none";
    }, 3000);
}

function note() {
    message.innerHTML = "Notifications";
    wrapper.style.display = "block";

    setTimeout(() => {
        wrapper.style.display = "none";
    }, 3000);
}

function pgs() {
    wrapper.style.display = "block"
    message.innerHTML = "Coming Soon"

    setTimeout(() => {
        wrapper.style.display = "none"
    }, 3000);
}

function hide() {
    if (!amount || !eye) {
        console.error("Elements with id 'amount' or 'eye' not found.");
        return;
    }

    if (amount.type == 'password') {
        amount.type = 'text';
        eye.innerHTML = '<i class="fa-solid fa-eye"></i>';
    } else {
        amount.type = 'password';
        eye.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
}


function copy() {
    let get = localStorage.getItem("Safecoin Acc")
    navigator.clipboard.writeText(get)
        .then(() => console.log('Text copied to clipboard'))
        .catch(err => console.error('Failed to copy text: ', err));
    copied.innerHTML = "copied"
    setTimeout(() => {
        copied.innerHTML = 'copy <i class="fa-solid fa-copy"></i>'
    }, 1000);
}


function next() {
    setInterval(() => {
        if (index == gif.length - 1) {
            index = 0;
        } else {
            index++;
        }
        if (coke) {
            coke.src = gif[index];
        } else {
            console.error("Element with id 'coke' not found.");
        }
    }, 5000);
}


next()