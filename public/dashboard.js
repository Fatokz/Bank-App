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
var storageRef = firebase.storage().ref();
// var storage = firebase.storage();

// Get HTML elements by ID
let nav = document.getElementById("nav");
let avatar = document.getElementById("avatar");
let dashboards = document.getElementById("dashboard");
let tradeCoin = document.getElementById("tradeCoin");
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
let processMoney = document.getElementById("processMoney");
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
let payamt = document.getElementById("payamt");
let userWallet = document.getElementById("userWallet");
let coinInfo = document.getElementById('coinInfo');
let TransMonie = document.getElementById('TransMonie');
let displayHistory = document.getElementById('displayHistory');
let inBal = document.getElementById('inBal');
let outBal = document.getElementById('outBal');
let transacSuccess = document.getElementById('transacSuccess');
let amountSent = document.getElementById('amountSent');
let errorFailed = document.getElementById('errorFailed');
let moneyReceipt = document.getElementById('moneyReceipt');
// let note ;

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
tradeCoin.style.display = "none"
displayHistory.style.display = "none"
transacSuccess.style.display = "none"
successImg.style.display = "block"
errorFailed.style.display = "none"
moneyReceipt.style.display = "none"

infos.innerHTML = ""
TransMonie.innerText = "Confirm"

proceed.disabled = true;

function changeProfileImage() {
    fileInput.click();
}

function loadFile(event) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;

            file = event.target.files[0];
            const image = document.getElementById('imageProfile');
            const storageRef = firebase.storage().ref();

            // Validate the file type (e.g., only allow images)
            const validFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validFileTypes.includes(file.type)) {
                alert("Invalid file type. Please select an image file.")
                // console.error("Invalid file type. Please select an image file.");
                return;
            }

            // Validate the file size (e.g., limit to 2MB)
            const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSizeInBytes) {
                alert("File is too large. Please select a file smaller than 2MB.")
                // console.error("File is too large. Please select a file smaller than 2MB.");
                return;
            }

            // Display the selected image locally
            image.src = URL.createObjectURL(file);
            // console.log("Selected image preview:", image.src);

            // Create a unique path for the image in Firebase Storage
            const filePath = `profilePictures/${uid}/${file.name}`;
            const fileRef = storageRef.child(filePath);

            // Create the file metadata
            const metadata = {
                contentType: file.type
            };

            // Upload the file and metadata to Firebase Storage
            const uploadTask = fileRef.put(file, metadata);

            // Monitor the upload progress
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    // Get task progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            // console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            // console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle upload errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // console.error('User doesn\'t have permission to access the object');
                            break;
                        case 'storage/canceled':
                            // console.error('User canceled the upload');
                            break;
                        case 'storage/unknown':
                            // console.error('Unknown error occurred:', error.serverResponse);
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, get the download URL
                    // Real-time listener
                    const userDoc = db.collection("user").doc(uid);
                    userDoc.onSnapshot((doc) => {
                        if (doc.exists) {
                            const data = doc.data();
                            if (data.profile) {
                                const image = document.getElementById('imageProfile');
                                image.src = data.profile;
                            }
                        }
                    });

                    // After the image is uploaded
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        // console.log('File available at', downloadURL);

                        // Update the user's photoURL in Firebase Authentication
                        return user.updateProfile({
                            photoURL: downloadURL,
                        }).then(() => {
                            // Update the profile picture URL in Firestore
                            return userDoc.update({
                                profile: downloadURL,
                            });
                        }).then(() => {
                            // console.log("Profile updated successfully");
                            alert("Profile updated successfully");

                            // Update the image on the page without reloading
                            const image = document.getElementById('imageProfile');
                            image.src = downloadURL;
                            const img = document.getElementById('img');
                            img.src = downloadURL;
                        }).catch((error) => {
                            console.error("Error:", error);
                        });
                    });

                }
            );
        } else {
            // User is signed out
        }
    });
}


// To edit profile
function editProfile1() {
    let editName = document.getElementById("editName")
    let editDob = document.getElementById("editDob")
    let invalid = document.getElementById("invalid")
    let greenbtn = document.getElementById("greenbtn")

    if (editName.value == "" || editDob.value == "") {
        invalid.innerHTML = `<p class="text-danger"">Provide the necessary details.</p>`
        setTimeout(() => {
            invalid.innerHTML = ""
        }, 2000);
        return;
    } else {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                greenbtn.innerText = 'Updating...'
                var uid = user.uid;
                var docRef = db.collection("user").doc(uid);

                // Create a new Date object from the input string
                const date = new Date(editDob.value);
                const options = {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                };
                formattedCal = date.toLocaleDateString('en-US', options);
                // console.log(formattedCal);

                docRef.get().then((doc) => {
                    if (doc.exists) {
                        docRef.update({
                            username: editName.value,
                            dob: formattedCal,
                        }).then(() => {
                            // Update the UI with the new values
                            let displayName = document.getElementById("displayName");
                            let dob = document.getElementById("dob");

                            if (displayName) {
                                displayName.innerHTML = editName.value;
                            }

                            if (dob) {
                                dob.innerHTML = formattedCal;
                            }

                            // Feedback to the user
                            greenbtn.style.backgroundColor = "green"
                            greenbtn.innerText = `Profile Updated`

                            setTimeout(() => {
                                greenbtn.style = "intial"
                                greenbtn.innerHTML = "Update changes"

                            }, 2500);

                            editName.value = ""
                            editDob.value = ""
                            // console.log(doc.data());
                        }).catch((error) => {
                            console.error("Error updating Profile: ", error);
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
                // ...
            }
        });
    }
}



// Array of image sources for the ad banner
let gif = ['./Images/bloomberg.gif', './Images/bank.gif', './Images/cocacola2.gif', './Images/fanta.gif', './Images/jumia.gif'];
let index = 0;

// Check if the 'coke' element exists and set its source
if (coke) {
    coke.src = gif[index];
} else {
    // console.error("Element with id 'coke' not found.");
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
            updatedWallet()

            docRef.get().then((doc) => {
                currentUserId = doc.id
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    currentUser = doc.data()

                    //Edit profile to display user details
                    let recpname = document.getElementById("recpname")
                    let recpacc = document.getElementById("recpacc")
                    imageProfile.src = currentUser.profile || './Images/avatar7.png'
                    nameProfile.innerHTML = currentUser.fullname
                    full.innerHTML = currentUser.fullname
                    mails.innerHTML = currentUser.email
                    semiNum.innerHTML = currentUser.account_num
                    dob.innerHTML = currentUser.dob || "Not Provided"
                    nigeria.innerHTML = currentUser.country
                    userWallet.innerHTML = currentUser.username
                    recpname.innerHTML = currentUser.fullname
                    recpacc.innerHTML = currentUser.account_num


                    // Display the user's dashboard with data from Firestore
                    dashboards.innerHTML = `
                    <div id="nav">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class= "d-flex align-items-center gap-2">
                                <div id="avatar">
                                    <img id="img" onclick="profile(event)" src="${doc.data().profile || './Images/avatar7.png'}" alt="">
                                </div>
                                <div id="welcome">
                                    <strong>Hi, <span id="displayName"> ${doc.data().username} </span></strong>
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
                                    <p>Current Balance <span id="eye"><i class="fa-solid fa-eye"></i></span></p>
                                    <p id="amount"></p>
                                </div>
                                <div id="line"></div>
                                <div id="monie">
                                    <p onclick="showHistory()">Transaction History <i class="fa-solid fa-chevron-right"></i></p>
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
                                    <i onclick="tradeWallet()" class="fa-solid fa-money-bill-trend-up"></i>
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
                                    <i onclick="pgs(event)" class="fa-solid fa-bolt"></i>
                                    <p>Electricity</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-wifi"></i>
                                    <p>Data Bundle</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-basketball"></i>
                                    <p>Betting Fund</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-tv"></i>
                                    <p>TV</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-money-bills"></i>
                                    <p>Pay Bill</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-user-plus"></i>
                                    <p>Refer and earn</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-wallet"></i>
                                    <p>Wallet</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-sack-dollar"></i>
                                    <p>CashBox</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-brands fa-bitcoin"></i>
                                    <p>Trade your coin</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-piggy-bank"></i>
                                    <p>Savings</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-code"></i>
                                    <p>Learn to code</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-user-tie"></i>
                                    <p>Avatar</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-gifts"></i>
                                    <p>Giveaway Gifts</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-store"></i>
                                    <p>Pay Shop</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-cart-shopping"></i>
                                    <p>Shop Online</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-taxi"></i>
                                    <p>Uber</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-jet-fighter"></i>
                                    <p>Travels and Tour</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-trophy"></i>
                                    <p>Win Big</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-money-bill-transfer"></i>
                                    <p>Transfer Bill</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-fire-flame-curved"></i>
                                    <p>Insurance</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-ticket"></i>
                                    <p>Ticket</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-gift"></i>
                                    <p>Reward</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-language"></i>
                                    <p>Language</p>
                                </div>
                                <div class="offer">
                                    <i onclick="pgs(event)" class="fa-solid fa-school"></i>
                                    <p>School</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="footer">
                        <div id="navigate">
                            <i class="fa-solid fa-house"></i>
                            <p>Home</p>
                        </div>
                        <div id="navigate">
                            <i class="fa-solid fa-credit-card"></i>
                            <p>Cards</p>
                        </div>
                        <div id="navigates" onclick="profile(event)">
                            <i class="fa-solid fa-user-tie"></i>
                        </div>
                        <div id="navigate">
                            <i class="fa-solid fa-sliders"></i>
                            <p>Settings</p>
                        </div>
                        <div id="navigate">
                            <i class="fa-solid fa-circle-dollar-to-slot"></i>
                            <p>Save</p>
                        </div>
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
                        // console.error("Element with id 'coke' not found after setting dashboard content.");
                    }
                } else {
                    console.log("No such document!");
                    dashboards.innerHTML = '<p class="danger">No user data found.</p>';
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
                dashboards.innerHTML = `<p class="text-danger text-center mt-5">Error getting document:, ${errorCode}</p>`;
                return;
            });
        } else {
            // If user is signed out, redirect to login page
            window.location.href = "login.html"
        }
    });
}

// Call the check function to initialize the dashboard
check()


function updatedWallet() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            db.collection("user").doc(uid)
                .onSnapshot((doc) => {
                    // console.log("Current data Wallet: ", doc.data().wallet);
                    let amount = document.getElementById("amount")
                    amount.innerHTML = `&#8358; ${doc.data().wallet.toLocaleString()}`
                });

        } else {
            // User is signed out
        }
    });
}

updatedWallet()

// Function to display the profile edit message
function profile(event) {
    event.preventDefault()
    editProfile.style.display = "block";
    dashboards.style.display = "none";
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
function pgs(event) {
    wrapper.style.display = "block"
    message.innerHTML = "Coming Soon"

    setTimeout(() => {
        wrapper.style.display = "none"
    }, 3000);
    return event;
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
    let coke = document.getElementById("coke")
    setInterval(() => {
        if (index == gif.length - 1) {
            index = 0;
        } else {
            index++;
        }
        if (coke) {
            coke.src = gif[index];
        } else {
            // console.error("Element with id 'coke' not found.");
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
        // console.error("Element with ID 'banktransfer' not found.");
    }

    tobnktf.innerHTML = 'Transfer to Bank'
    noneit.style.display = "block"
    interbanktf.style.display = "none"

    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //         var uid = user.uid;
    //         var docRef = db.collection("user").doc(uid);

    //         docRef.get().then((doc) => {
    //             if (doc.exists) {
    //                 namefull.innerHTML = doc.data().fullname
    //                 accnum1.innerHTML = doc.data().account_num
    //                 capital.innerHTML = `&#8358; ${doc.data().wallet.toLocaleString()}`
    //             } else {
    //                 // doc.data() will be undefined in this case
    //                 console.log("No such document!");
    //             }
    //         }).catch((error) => {
    //             // console.log("Error getting document:", error);
    //         });
    //     } else {
    //         // User is signed out
    //         // ...
    //     }
    // });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            db.collection("user").doc(uid)
                .onSnapshot((doc) => {
                    namefull.innerHTML = doc.data().fullname
                    accnum1.innerHTML = doc.data().account_num
                    capital.innerHTML = `&#8358; ${doc.data().wallet.toLocaleString()}`
                });

        } else {
            // User is signed out
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
                    <div id="banks" onclick="soons(event)">
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


function soons(event) {
    event.preventDefault()
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
        // console.error("Element with ID 'banktransfer' not found.");
    }

    tobnktf.innerHTML = 'Transfer to SafeCoin'
    noneit.style.display = "none"
    interbanktf.style.display = "block"

    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //         var uid = user.uid;
    //         var docRef = db.collection("user").doc(uid);

    //         docRef.get().then((doc) => {
    //             if (doc.exists) {
    //                 namefull.innerHTML = doc.data().fullname
    //                 accnum1.innerHTML = doc.data().account_num
    //                 capital.innerHTML = `${document.getElementById("amount").innerHTML}`
    //                 return;
    //             } else {
    //                 // console.log("No such document!");
    //                 return;
    //             }
    //         }).catch((error) => {
    //             // console.log("Error getting document:", error);
    //         });
    //     } else {
    //         // User is signed out

    //         // ...
    //     }
    // });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            db.collection("user").doc(uid)
                .onSnapshot((doc) => {
                    namefull.innerHTML = doc.data().fullname
                    accnum1.innerHTML = doc.data().account_num
                    capital.innerHTML = `${document.getElementById("amount").innerHTML}`
                });
        } else {
            // User is signed out
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
                                                    <input type="text" id="notes" placeholder="Enter note (Optional)">
                                                </div>
                                            </div>
                                            <div class="autos"><button onclick="sendFunds()" class=" btn btn-warning mt-4 w-100 text-light h-50">Proceed</button></div>
                                        `
                                    }, 1000);
                                    return;
                                });
                            }
                        })
                        .catch((error) => {
                            // console.log("Error getting documents: ", error);
                        });
                } else {
                    // doc.data() will be undefined in this case
                    // console.log("No such document!");
                }
            }).catch((error) => {
                // console.log("Error getting document:", error);
            });

        } else {
            // User is signed out
        }
    });
})

function inptamt() {
    let amounts = document.getElementById("amounts").value;
    // console.log(amounts);
    if (amounts == "") {
        let inifunds = document.getElementById("inifunds");
        inifunds.innerHTML = ""
        amtsend.style.height = "10.5em"
    }
    let inputField = document.getElementById("amounts");
    let value = inputField.value;

    let cursorPosition = inputField.selectionStart;
    let cleanedValue = value.replace(/[^0-9.]/g, '');
    let parts = cleanedValue.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1].substring(0, 2) : '';
    let formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let formattedValue = formattedIntegerPart + decimalPart;
    inputField.value = formattedValue;
    let newCursorPosition = cursorPosition + (formattedValue.length - value.length);
    inputField.setSelectionRange(newCursorPosition, newCursorPosition);
}

function validateInput(event) {
    let key = event.key;
    if (!/[\d.]/.test(key) && key !== 'Backspace') {
        event.preventDefault();
    }
    amounts.addEventListener('keydown', validateInput);
}

function sendFunds() {
    let amounts = document.getElementById("amounts").value;
    let inifunds = document.getElementById("inifunds");
    let displayAmount = document.getElementById("displayAmount")
    let paymont = document.getElementById("paymont");
    let accNum3 = document.getElementById("accNum3");
    let reciName = document.getElementById("reciName");
    let currBal = document.getElementById("currBal");
    let payamt = document.getElementById("payamt");
    let receiptFund = document.getElementById("receiptFund");

    displayAmount.innerHTML = amounts
    paymont.innerHTML = amounts
    accNum3.innerHTML = receiver.account_num
    reciName.innerHTML = receiver.fullname
    currBal.innerHTML = currentUser.wallet.toLocaleString()
    payamt.innerHTML = amounts
    amountSent.innerHTML = amounts
    receiptFund.innerHTML = amounts

    // Remove commas for conversion
    numericValue = +(amounts.replace(/,/g, ''));
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
        // console.log("Insufficient funds");
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
        sect4.classList.toggle("disabled")
        let inifunds = document.getElementById("inifunds");
        amounts = ""
        inifunds.innerHTML = ""
        amtsend.style.height = "10.5em"

        let floatingContainer = document.getElementById("floatingContainer");
        floatingContainer.classList.remove("float-down");
        void floatingContainer.offsetWidth;
        floatingContainer.style.display = 'block';
        floatingContainer.classList.add("float-up");

    }

}

function prev() {
    sect4.classList.remove("disabled")
    floatingContainer.style.display = "none"
    paymentContainer.style.display = "none"
    proceed.disabled = true;
    recipient.style.height = "11em"
    amountpay.style.display = "none"
    banktransfer.style.display = "block"
}

function tradeWallet() {
    tradeCoin.style.display = "block"
    dashboards.style.display = "none"
}

function fromWallet() {
    tradeCoin.style.display = "none"
    dashboards.style.display = "block"
}

function closeFloatingContainer() {
    sect4.classList.remove("disabled")
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
    paymentContainer.style.display = 'block';
    paymentContainer.classList.add("float-up");
    setTimeout(() => {
        floatingContainer.style.display = "none"
    }, 2000);
}

function closepaymentContainer() {
    sect4.classList.remove("disabled")
    let paymentContainer = document.getElementById("paymentContainer");
    paymentContainer.classList.remove("float-up");
    void paymentContainer.offsetWidth;
    paymentContainer.classList.add("float-down");
    paymentContainer.addEventListener('animationend', function () {
        paymentContainer.style.display = 'none';
    }, { once: true });

    pinBoxes.forEach(input => {
        input.value = '';
    });
    pinBoxes[0].focus();
    infos.innerHTML = ""
}


pinBoxes.forEach((input) => {
    input.addEventListener("input", handleInput);
    input.addEventListener("keydown", handleBackspace);
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

function handleBackspace(event) {
    const input = event.target;
    if (event.key === "Backspace" && input.value === '') {
        const previousInput = input.previousElementSibling;
        if (previousInput && previousInput.classList.contains("pin-box")) {
            previousInput.focus();
        }
    }
}


async function sendFund() {
    let pinValue = "";
    pinBoxes.forEach(input => {
        pinValue += input.value;
    });

    if (pinValue === "") {
        infos.innerHTML = "Input field can't be empty";
        return;
    }

    if (+pinValue !== currentUser.transaction_pin) {
        infos.innerHTML = "Invalid pin, Try again";
        return;
    }
    infos.innerHTML = "";
    TransMonie.innerText = "Processing ..."
    try {
        // Get the current date and current time
        let notes = document.getElementById("notes")
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = currentDate.toLocaleTimeString('en-US', timeOptions);


        // Update current user's wallet
        await db.collection("user").doc(currentUserId).update({
            wallet: currentUser.wallet - numericValue
        });

        // Update receiver's wallet
        await db.collection("user").doc(receiverId).update({
            wallet: receiver.wallet + numericValue
        })

        // Update current user's transaction history
        await db.collection("user").doc(currentUserId).update({
            transaction_history: firebase.firestore.FieldValue.arrayUnion({
                amount: numericValue,
                message: `Transfer to ${receiver.fullname}`,
                transaction_type: "Debit",
                date: formattedDate,
                time: formattedTime,
                // narration: notes.value
            })
        });
        // Update receiver's transaction history
        await db.collection("user").doc(receiverId).update({
            transaction_history: firebase.firestore.FieldValue.arrayUnion({
                amount: numericValue,
                message: `Transfer from ${currentUser.fullname}`,
                transaction_type: "Credit",
                date: formattedDate,
                time: formattedTime,
                // narration: 
            })
        });

        // alert("Transaction successful");
        let receiptdates = document.getElementsByClassName("receiptdates")
        receiptdates.innerHTML = `${formattedDate}, ${formattedTime}`
        // console.log(receiptdates.innerHTML);
        infos.innerHTML = "<p class='text-success'>Transaction successful</p>";
        TransMonie.innerText = "Confirm"
        amountpay.style.display = "none"
        errorFailed.style.display = "none"
        successImg.style.display = "block"
        transacSuccess.style.display = "block"

        // Clear PIN input fields
        pinBoxes.forEach(input => {
            input.value = '';
        });
        pinBoxes[0].focus();
        return;

    } catch (error) {
        // console.error("Error updating document: ", error);
        infos.innerHTML = "<p class='text-danger'>Transaction failed. Please try again later.</p>";
        TransMonie.innerText = "Confirm"
        amountpay.style.display = "none"
        successImg.style.display = "none"
        errorFailed.style.display = "block"
        transacSuccess.style.display = "block"
        return;
    }
}


function BTCoin() {
    firebase.auth().onAuthStateChanged((user) => {
        let coinPrice = document.getElementById("coinPrice");
        if (user) {
            var uid = user.uid;
            db.collection("user").doc(uid)
                .onSnapshot((doc) => {
                    const nairaAmount = doc.data().wallet;
                    const exchangeRate = 1600;
                    const dollarAmount = nairaAmount / exchangeRate;
                    coinPrice.innerHTML = dollarAmount.toFixed(2); // Format to 2 decimal places

                    // console.log(dollarAmount);
                    // console.log(+coinPrice.innerHTML);

                    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";

                    // Fetch data from the API
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            const coinFlex = document.getElementById("coinflex"); // Make sure this element exists
                            coinFlex.innerHTML = ""; // Clear any existing content
                            data.forEach(coin => {
                                coinFlex.innerHTML += `
                                    <div id="borderline" class="d-flex justify-content-between">
                                        <div id="coinInfo">
                                            <img src="${coin.image}" alt="${coin.name}">
                                            <div id="eachCoin">
                                                <strong>${coin.name} (${coin.symbol.toUpperCase()})</strong>
                                                <p class="text-secondary">$${coin.current_price.toFixed(2)}  <span class="text-success">+${coin.high_24h.toFixed(2)}%</span></p>
                                            </div>
                                        </div>
                                        <div id="nthCoin" class="mt-2">
                                            <strong class="text-light">$ ${(coin.current_price * parseFloat(coinPrice.innerHTML)).toFixed(2)}</strong>
                                        </div>
                                    </div>
                                `;
                            });
                        })
                        .catch(error => {
                            console.error("Error fetching data:", error);
                        });
                });
        } else {
            // Handle the case when the user is signed out
            console.log("User is signed out.");
        }
    });
}

// Call the function to fetch and display the data
BTCoin();

function showHistory() {
    displayHistory.style.display = "block"
    dashboards.style.display = "none"
}

function transBack() {
    dashboards.style.display = "block"
    displayHistory.style.display = "none"
}

function inOut() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            db.collection("user").doc(uid)
                .onSnapshot((doc) => {
                    let inBal = document.getElementById("inBal");
                    let outBal = document.getElementById("outBal");
                    let historyFetch = document.getElementById("historyFetch");
                    // console.log("Current data: ", doc.data().transaction_history);
                    let uidWallet = doc.data().transaction_history;
                    let totalCredit = 0;
                    let totalDebit = 0;


                    if (uidWallet == "") {
                        historyFetch.innerHTML = `
                            <div id="nodata">
                                <img src="./Images/No-history.png" alt="">
                                <p class = "emptyHis mt-3">No History Yet</p>
                            </div>
                        `;
                        return;
                    } else {
                        historyFetch.innerHTML = ""
                        db.collection("uder").doc(uid)
                            .onSnapshot((doc) => {
                                // console.log("Current data: ", doc.data().transaction_history.Date);
                                // Reverse the array to show the latest transactions first
                                uidWallet.reverse()

                                uidWallet.forEach((eachHistory, index) => {
                                    let transactionIcon = eachHistory.transaction_type === "Credit" ? '<i class="fa-solid fa-arrow-down"></i>' : '<i class="fa-solid fa-arrow-up"></i>';
                                    let transactionSign = eachHistory.transaction_type === "Credit" ? '+' : '-';
                                    let color = eachHistory.transaction_type === "Credit" ? 'green' : 'red';

                                    historyFetch.innerHTML += `
                                        <div class="eachTrans">
                                            <div id="historyIcon">
                                                <p>${transactionIcon}</p>
                                            </div>
                                            <div class="d-flex w-100 justify-content-between">
                                            <div id="tfto">
                                                <p class="fss">${eachHistory.message}</p>
                                                <p id="tfti" class="text-black-50">${eachHistory.date}, ${eachHistory.time}</p>
                                            </div>
                                            <div id="tftos">
                                                <p class="fw-semibold" id="credeb-${index}" style="color: ${color};">
                                                    ${transactionSign}₦${parseFloat(eachHistory.amount).toLocaleString()}
                                                </p>
                                                <div id="seccessTf">
                                                    <p>Successful</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;

                                    if (eachHistory.transaction_type === "Credit") {
                                        totalCredit += parseFloat(eachHistory.amount);
                                    } else if (eachHistory.transaction_type === "Debit") {
                                        totalDebit += parseFloat(eachHistory.amount);
                                    }
                                });

                                // Update the UI with the calculated totals
                                inBal.innerHTML = totalCredit.toLocaleString();
                                outBal.innerHTML = totalDebit.toLocaleString();
                            });
                    }
                });
        } else {
            // User is signed out
        }
    });
}


inOut()


function viewReceipt() {
    closeFloatingContainer()
    closepaymentContainer()
    transacSuccess.style.display = "none"
    moneyReceipt.style.display = "block"
    let transnum = document.getElementById("transnum")
    for (let index = 1; index <= 15; index++) {
        const randoms = Math.floor(Math.random() * 10);
        transnum.innerHTML += randoms;
    }
}

function closereceipt() {
    closeFloatingContainer()
    closepaymentContainer()
    moneyReceipt.style.display = "none"
    dashboards.style.display = "block"
}


function printReceipt() {
    window.print()
}

function done() {
    closeFloatingContainer()
    closepaymentContainer()
    transacSuccess.style.display = "none"
    amountpay.style.display = "none"
    dashboards.style.display = "block"
}

function failederr() {
    closeFloatingContainer()
    closepaymentContainer()
    transacSuccess.style.display = "none"
    amountpay.style.display = "none"
    dashboards.style.display = "block"
}

function logOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "login.html"
    }).catch((error) => {
        // An error happened.
        alert("Couldn't log out")
        // console.log(error);
    });
}