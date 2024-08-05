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
let dashboards = document.getElementById("dashboard");
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
let tobnktf = document.getElementById("tobnktf");
let noneit = document.getElementById("noneit");
let interbanktf = document.getElementById("interbanktf");
let reciacc = document.getElementById("reciacc");
let proceed = document.getElementById("proceed");
let userfound = document.getElementById("userfound");
let innerthl = document.getElementById("innerthl");
let amountpay = document.getElementById("amountpay");
let sect4 = document.getElementById("sect4");
let amounts = document.getElementById("amounts");
let floatingContainer = document.getElementById("floatingContainer");
let paymentContainer = document.getElementById("paymentContainer");
let inifunds = document.getElementById("inifunds");
let xmark = document.getElementById("xmark");
let infos = document.getElementById("infos");
let pinset = document.getElementById("pinset");
let pinBoxes = document.querySelectorAll(".pin-box");
let imageProfile = document.getElementById("imageProfile");
let nameProfile = document.getElementById("nameProfile");
let mails = document.getElementById("mails");
let full = document.getElementById("full");
let semiNum = document.getElementById("semiNum");
let dob = document.getElementById("dob");
let editProfile = document.getElementById("editProfile");
let fileInput = document.getElementById("fileInput");
let nigeria = document.getElementById("nigeria");

// let allpins = `${pin1.value, pin2.value, pin3.value, pin4.value}`

let currentUser;
let currentUserId;
let receiver;
let receiverId;
let numericValue;

// Hide the wrapper,banktransfer,dashboard initially
wrapper.style.display = "none"
banktransfer.style.display = "none"
dashboards.style.display = "block"
interbanktf.style.display = "none"
amountpay.style.display = "none"
floatingContainer.style.display = "none"
paymentContainer.style.display = "none"
editProfile.style.display = "none"

infos.innerHTML = ""

proceed.disabled = true;

function changeProfileImage() {
    fileInput.click();
}

function loadFile(event) {
    const image = document.getElementById('imageProfile');
    image.src = URL.createObjectURL(event.target.files[0]);
    console.log(image.src);
}


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
    dashboards.innerHTML = `
        <div id="dash">
            <div class="loader"></div>
        </div>
    `;

    // Check the user's authentication state
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user);
            var uid = user.uid;
            var docRef = db.collection("user").doc(uid);


            docRef.get().then((doc) => {
                currentUserId = doc.id
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    currentUser = doc.data()

                    //Edit profile to display user details
                    imageProfile.src = currentUser.profile || './Images/avatar7.png'
                    nameProfile.innerHTML = currentUser.fullname
                    full.innerHTML = currentUser.fullname
                    mails.innerHTML = currentUser.email
                    semiNum.innerHTML = currentUser.account_num
                    dob.innerHTML = currentUser.dob || "Not Provided"
                    nigeria.innerHTML = currentUser.country


                    // Display the user's dashboard with data from Firestore
                    dashboards.innerHTML = `
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
                                <div id="tosafe" onclick="interbank()">
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
                    dashboards.innerHTML = '<p class="danger">No user data found.</p>';
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
                dashboards.innerHTML = `<p class="text-danger text-center mt-5">Error getting document:, ${error}</p>`;
                // document.body.style.backgroundColor = "black"
                // document.body.innerHTML = `<p class="text-danger">Error getting document:, ${error}</p>`;
            });
        } else {
            // User is signed out
            // If user is signed out, redirect to login page
            window.location.href = "login.html"
        }
    });
}

// Call the check function to initialize the dashboard
check()


// Function to display the profile edit message
function profile() {
    // message.innerHTML = "Edit Profile";
    // wrapper.style.display = "block";
    editProfile.style.display = "block";
    dashboards.style.display = "none";

    // Hide the wrapper after 5 seconds
    // setTimeout(() => {
    //     wrapper.style.display = "none";
    // }, 3000);
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

function backtoboard() {
    dashboards.style.display = "block"
    editProfile.style.display = "none"
}

// Function to copy the account number to clipboard
function copy() {
    let get = localStorage.getItem("Safecoin Acc")
    navigator.clipboard.writeText(get)
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
    if (banktransfer) {
        dashboards.style.display = "none";
        banktransfer.style.display = "block";
    } else {
        console.error("Element with ID 'banktransfer' not found.");
    }

    tobnktf.innerHTML = 'Transfer to Bank'
    noneit.style.display = "block"
    interbanktf.style.display = "none"

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

    numberInput.addEventListener('input', function () {
        let maxLength = 10;
        if (this.value.length > maxLength) {
            this.value = this.value.slice(0, maxLength);
        }
    });

}


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
                    <div id="banks" onclick="soons()">
                        <img src="${bank.logo}" alt="Bank Logo">
                       <div id="lineheit">
                            <p>${bank.name}</p>
                            <small>${bank.ussd}</small>
                        </div>
                    </div>
                `;
            }
        });

});


function soons() {
    wrapper.style.display = "block";
    message.innerHTML = "Our next update will include this feature";

    // Hide the wrapper after 5 seconds
    setTimeout(() => {
        wrapper.style.display = "none";
    }, 3000);
}

function todash() {
    recipient.style.height = "11em"
    banktransfer.style.display = "none"
    dashboards.style.display = "block"
    numberInput.value = ""
    reciacc.value = ""
    innerthl.innerHTML = ""
}

function interbank() {
    if (interbanktf) {
        dashboards.style.display = "none";
        banktransfer.style.display = "block";
    } else {
        console.error("Element with ID 'banktransfer' not found.");
    }

    tobnktf.innerHTML = 'Transfer to SafeCoin'
    noneit.style.display = "none"
    interbanktf.style.display = "block"

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

function checkMaxLength(input, maxLength) {
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
        return;
    }
    else if (input.value.length == maxLength) {
        proceed.disabled = false;
        return;
    } else {
        proceed.disabled = true;
    }

}


proceed.addEventListener("click", function () {
    innerthl.innerHTML = `<div class="loaders"></div>`
    recipient.style.height = "12em"
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            var docRef = db.collection("user").doc(uid);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    db.collection("user").where("account_num", "==", (reciacc.value))
                        .get()
                        .then((querySnapshot) => {
                            currentUser = doc.data()
                            if (reciacc.value == "") {
                                innerthl.innerHTML = `
                                <div class="shake" id="users">
                                <div id="mydot"></div>
                                <p id="userfound" class="mtt">Input field can't be empty</p>
                              </div>
                            `
                                recipient.style.height = "13.5em"
                                return;
                            } else if (reciacc.value == currentUser.account_num) {
                                innerthl.innerHTML = `
                                <div class="shake" id="users">
                                <div id="mydot"></div>
                                <p id="userfound" class="mtt">Transfer to your own accout is not allowed</p>
                              </div>
                            `
                                recipient.style.height = "13.5em"
                                return;
                            } else if (querySnapshot.empty == true) {
                                innerthl.innerHTML = `
                                <div class="shake" id="users">
                                <div></div>
                                <p id="userfound">Invalid account. Please check the recipient account information and try again.</p>
                              </div>
                            `
                                recipient.style.height = "13.5em"
                                return;
                            } else {
                                querySnapshot.forEach((doc) => {
                                    console.log(doc.id, " => ", doc.data());
                                    receiverId = doc.id;
                                    receiver = doc.data();
                                    innerthl.innerHTML = `
                                    <div id="">
                                    <p id="" class="text-light">${doc.data().fullname}</p>
                                  </div>
                                `
                                    recipient.style.height = "13.5em"
                                    setTimeout(() => {
                                        banktransfer.style.display = "none"
                                        amountpay.style.display = "block"
                                        reciacc.value = ""
                                        innerthl.innerHTML = ""

                                        sect4.innerHTML = `
                                            <div id="userdet">
                                                <div id="userimage">
                                                    <img src="${doc.data().profile || "./Images/avatar7.png"}" alt="">
                                                </div>
                                                <div id="userpro">
                                                    <p>${doc.data().fullname}</p>
                                                    <div id="accnu">
                                                        <small>${doc.data().account_num}</small>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="amtsend">
                                                <div class="d-flex align-items-center gap-2">
                                                    <div>
                                                        <p class="fs-5 mt-3 fw-semibold">₦</p>
                                                    </div>
                                                    <div id="enteramt">
                                                        <input id="amounts" name="num" oninput="inptamt()"  type="text" placeholder="Enter 10.00 - 5,000,000.00">
                                                    </div>
                                                </div>
                                                <div id="inifunds" class="text-light">
                                                    
                                                </div>
                                                <div id="balcheck" class="d-flex gap-2 align-items-center">
                                                    <div id="checker">
                                                        <input type="checkbox" checked>
                                                    </div>
                                                    <p class="mt-3">Balance: <span class="nmu">&#8358; ${currentUser.wallet.toLocaleString()} </p>
                                                </div>

                                                <div class="mt-2" id="narration">
                                                    <input type="text" placeholder="Enter note (Optional)">
                                                </div>
                                            </div>
                                            <div class="autos"><button onclick="sendFunds()" class=" btn btn-warning mt-4 w-100 text-light h-50">Next</button></div>
                                        `
                                    }, 1000);
                                    return;
                                });
                            }
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

        } else {
            // User is signed out
        }
    });
})

function inptamt() {
    let amounts = document.getElementById("amounts").value;
    console.log(amounts);
    if (amounts == "") {
        let inifunds = document.getElementById("inifunds");
        inifunds.innerHTML = ""
        amtsend.style.height = "10.5em"
    }
    let inputField = document.getElementById("amounts");
    let value = inputField.value;

    // Save cursor position
    let cursorPosition = inputField.selectionStart;

    // Remove all non-numeric characters except for the decimal point
    let cleanedValue = value.replace(/[^0-9.]/g, '');

    // Split the value into integer and decimal parts
    let parts = cleanedValue.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1].substring(0, 2) : '';

    // Add commas to the integer part
    let formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the integer and decimal parts
    let formattedValue = formattedIntegerPart + decimalPart;

    // Update the input field value
    inputField.value = formattedValue;

    // Restore cursor position
    let newCursorPosition = cursorPosition + (formattedValue.length - value.length);
    inputField.setSelectionRange(newCursorPosition, newCursorPosition);
}

function validateInput(event) {
    let key = event.key;
    if (!/[\d.]/.test(key) && key !== 'Backspace') {
        event.preventDefault();
    }
}

// Attach the validateInput function to the keydown event
amounts.addEventListener('keydown', validateInput);


function sendFunds() {
    let amounts = document.getElementById("amounts").value;
    let inifunds = document.getElementById("inifunds");
    let displayAmount = document.getElementById("displayAmount")
    let paymont = document.getElementById("paymont");
    let accNum3 = document.getElementById("accNum3");
    let reciName = document.getElementById("reciName");
    let currBal = document.getElementById("currBal");

    displayAmount.innerHTML = amounts
    paymont.innerHTML = amounts
    accNum3.innerHTML = receiver.account_num
    reciName.innerHTML = receiver.fullname
    currBal.innerHTML = currentUser.wallet.toLocaleString()

    // Remove commas for conversion
    numericValue = +(amounts.replace(/,/g, ''));
    console.log("Numeric value:", numericValue);
    if (amounts == "") {
        inifunds.innerHTML = `
        <div class="shake" id="users">
            <div id="mydot"></div>
            <p id="userfound" class="mtt">Input field can't be empty</p>
        </div>
    `;
        amtsend.style.height = "12.5em"
        return;
    } else if (amounts < 100) {
        inifunds.innerHTML = `
        <div class="shake" id="users">
            <div mt-1 id="mydot"></div>
            <p id="userfound" class="mtt ">You can't send below 100.00</p>
        </div>
    `;
        amtsend.style.height = "12.5em"
        return;
    } else if (numericValue > currentUser.wallet) {
        console.log("Insufficient funds");
        let inifunds = document.getElementById("inifunds");
        if (inifunds) {
            inifunds.innerHTML = `
                <div class="shake" id="users">
                    <div id="mydot"></div>
                    <p id="userfound" class="mtt">Insufficient funds</p>
                </div>
            `;
            amtsend.style.height = "12.5em"
            return;
        }
    } else {
        let inifunds = document.getElementById("inifunds");
        inifunds.innerHTML = ""
        amtsend.style.height = "10.5em"

        let floatingContainer = document.getElementById("floatingContainer");
        floatingContainer.classList.remove("float-down");
        void floatingContainer.offsetWidth;
        floatingContainer.style.display = 'block'; // Make sure the container is visible
        floatingContainer.classList.add("float-up");
    }

}

function prev() {
    floatingContainer.style.display = "none"
    paymentContainer.style.display = "none"
    proceed.disabled = true;
    recipient.style.height = "11em"
    amountpay.style.display = "none"
    banktransfer.style.display = "block"
}

function closeFloatingContainer() {
    let floatingContainer = document.getElementById("floatingContainer");
    floatingContainer.classList.remove("float-up");
    void floatingContainer.offsetWidth;
    floatingContainer.classList.add("float-down");
    floatingContainer.addEventListener('animationend', function () {
        floatingContainer.style.display = 'none';
    }, { once: true });
}

function confirm() {
    let paymentContainer = document.getElementById("paymentContainer");
    paymentContainer.classList.remove("float-down");
    void paymentContainer.offsetWidth;
    paymentContainer.style.display = 'block'; // Make sure the container is visible
    paymentContainer.classList.add("float-up");
    setTimeout(() => {
        floatingContainer.style.display = "none"
    }, 2000);
}

function closepaymentContainer() {
    let paymentContainer = document.getElementById("paymentContainer");
    paymentContainer.classList.remove("float-up");
    void paymentContainer.offsetWidth;
    paymentContainer.classList.add("float-down");
    paymentContainer.addEventListener('animationend', function () {
        paymentContainer.style.display = 'none';
    }, { once: true });

    pinBoxes.forEach(input => {
        input.value = ''; // Clear the value of each input field
    });
    pinBoxes[0].focus(); // Optionally focus the first input field after clearing
    infos.innerHTML = ""
}

//
pinBoxes.forEach((input) => {
    input.addEventListener("input", handleInput);
});

function handleInput(event) {
    const input = event.target;
    if (input.value.length === 1) {
        const nextInput = input.nextElementSibling;
        if (nextInput && nextInput.classList.contains("pin-box")) {
            nextInput.focus();
        }
    }
}

function sendFund() {
    let pinValue = "";
    pinBoxes.forEach(input => {
        pinValue += input.value;
    });
    if (pinValue == "") {
        infos.innerHTML = "Input field can't be empty"
        return;
    } else if (+pinValue === currentUser.transaction_pin) {
        infos.innerHTML = "<p class='text-success'>Processing ...</p>"
        console.log(+pinValue);
        console.log("Amount to send", numericValue);

        var currentUserRef = db.collection("user").doc(currentUserId);
        var receiverRef = db.collection("user").doc(receiverId);

        // Set the "capital" field of the city 'DC'
        return currentUserRef.update({
            wallet: currentUser.wallet - numericValue
        })
            .then(() => {
                return receiverRef.update({
                    wallet: receiver.wallet + numericValue
                }).then(() => {
                    currentUserRef.update({
                        transaction_history: firebase.firestore.FieldValue.arrayUnion({
                            amount: numericValue,
                            message: `You transferred ${(numericValue)} to ${receiver.fullname}`,
                            transaction_type: "Debit"
                        })
                    });
                    receiverRef.update({
                        transaction_history: firebase.firestore.FieldValue.arrayUnion({
                            amount: numericValue,
                            message: `You received ${(numericValue)} from ${currentUser.fullname}`,
                            transaction_type: "Credit"
                        })
                    });

                    alert("Transaction successfull")
                    infos.innerHTML = "<p class='text-success'>Transaction successfull</p>"
                    pinBoxes.forEach(input => {
                        input.value = ''; // Clear the value of each input field
                    });
                    pinBoxes[0].focus(); // Optionally focus the first input field after clearing
                    infos.innerHTML = ""

                    // Update wallet balances in the DOM
                    check()
                    window.location.reload()
                    
                })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            }).catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    } else {
        infos.innerHTML = "Invalid pin, Try again"
    }
}


function logOut (){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "login.html"
    }).catch((error) => {
        // An error happened.
        alert("Couldn't log out")
        console.log(error);
    });
}