// Firebase configuration
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

// Get HTML elements by ID
let nav = document.getElementById("nav");
let avatar = document.getElementById("avatar");
let dashboard = document.getElementById("dashboard");
let amount = document.getElementById("amount");
let eye = document.getElementById("eye");
let number = document.getElementById("number");
let coke = document.getElementById("coke");
let wrapper = document.getElementById("wrapper");
let message = document.getElementById("message");
let banktransfer = document.getElementById("banktransfer");
let namefull = document.getElementById("namefull");
let accnum1 = document.getElementById("accnum1");
let capital = document.getElementById("capital");
let numberInput = document.getElementById("numberInput");
let currentUser;

// Hide the wrapper,banktransfer,dashboard initially
wrapper.style.display = "none"
banktransfer.style.display = "block"
dashboard.style.display = "none"



// Array of image sources for the ad banner
let gif = ['./Images/bank.gif', './Images/cocacola.gif', './Images/cocacola2.gif', './Images/fanta.gif', './Images/jumia.gif'];
let index = 0;

// Check if the 'coke' element exists and set its source
if (coke) {
    coke.src = gif[index];
} else {
    console.error("Element with id 'coke' not found.");
}

// Function to check the authentication state and fetch user data
function check() {
    // Display a loader while fetching data
    dashboard.innerHTML = `
        <div id="dash">
            <div class="loader"></div>
        </div>
    `;

    // Check the user's authentication state
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user);
            var uid = user.uid;
            currentUser = user

            // Get the user's document from Firestore
            var docRef = db.collection("user").doc(uid);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());

                    // Display the user's dashboard with data from Firestore
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
                                    <p>Current Balance <span id="eye" onclick="hide()"><i class="fa-solid fa-eye"></i></span></p>
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
                            <p>Make Payment</p>
                            <div class="d-flex justify-content-between">
                                <div id="tobank" onclick="banktf()">
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
                                <div id="tradecoin">
                                    <i class="fa-solid fa-money-bill-trend-up"></i>
                                    <p>Trade coin</p>
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

                    // Store the user's account number in local storage
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
                    dashboard.innerHTML = '<p class="danger">No user data found.</p>';
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
                dashboard.innerHTML = `<p class="text-danger">Error getting document:, ${error}</p>`;
            });
        } else {
            // User is signed out
            // If user is signed out, redirect to login page
            alert("Please login")
            window.location.href = "login.html"
        }
    });
}

// Call the check function to initialize the dashboard
check()


// Function to display the profile edit message
function profile() {
    message.innerHTML = "Edit Profile";
    wrapper.style.display = "block";

    // Hide the wrapper after 5 seconds
    setTimeout(() => {
        wrapper.style.display = "none";
    }, 3000);
}

// Function to display the notifications message
function note() {
    message.innerHTML = "Notifications";
    wrapper.style.display = "block";

    setTimeout(() => {
        wrapper.style.display = "none";
    }, 3000);
}

// Function to display a "coming soon" message
function pgs() {
    wrapper.style.display = "block"
    message.innerHTML = "Coming Soon"

    setTimeout(() => {
        wrapper.style.display = "none"
    }, 3000);
}

// Function to hide or show the amount field
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

// Function to copy the account number to clipboard
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

// Function to change the ad banner image every 5 seconds
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

// Call the next function to start the ad banner rotation
next()

function banktf() {
    // var banktransfer = document.getElementById("banktransfer");
    if (banktransfer) {
        // nav.style.zIndex = "30"
        dashboard.style.display = "none";
        banktransfer.style.display = "block";
        banktransfer.style.zIndex = "20";
        // console.log("Working");
    } else {
        console.error("Element with ID 'banktransfer' not found.");
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            var docRef = db.collection("user").doc(uid);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    namefull.innerHTML = doc.data().fullname
                    accnum1.innerHTML = doc.data().account_num
                    capital.innerHTML = `&#8358; ${doc.data().wallet.toLocaleString()}`
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        } else {
            // User is signed out
            // ...
        }
    });
}

numberInput.addEventListener('input', function () {
    let maxLength = 10;
    if (this.value.length > maxLength) {
        this.value = this.value.slice(0, maxLength);
    }
});


document.addEventListener('DOMContentLoaded', function () {
    let obj = [];
    fetch("https://nigerianbanks.xyz/")
        .then(result => result.json())
        .then(data => {
            // console.log(data);
            obj.push(data);
            let allbanks = obj[0];
            // console.log(allbanks);
    
            // Clear the container before adding new elements
            fetchbank.innerHTML = '';
    
            for (let index = 0; index < allbanks.length; index++) {
                let bank = allbanks[index];
                // console.log(bank);
                fetchbank.innerHTML += `
                    <div id="bank" onclick="soon(event)">
                        <img src="${bank.logo}" alt="Bank Logo">
                        <p>${bank.name}</p>
                    </div>
                `;
            }
        });
    
});

function soon(e) {
    // alert("Our next update will include this feature")
    message.innerHTML = "Our next update will include this feature";
    wrapper.style.display = "block";

    // Hide the wrapper after 5 seconds
    setTimeout(() => {
        wrapper.style.display = "none";
    }, 3000);
}


function todash() {
    dashboard.style.display = "block"
}