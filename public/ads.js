let firstads = document.getElementById("firstads")
let secondads = document.getElementById("secondads")
let thirdads = document.getElementById("thirdads")
let fourthads = document.getElementById("fourthads")
let fifthads = document.getElementById("fifthads")

secondads.style.display = "none"
thirdads.style.display = "none"
fourthads.style.display = "none"
fifthads.style.display = "none"

function next1() {
    firstads.style.display = "none"
    secondads.style.display = "block"
}

function next2() {
    secondads.style.display = "none"
    thirdads.style.display = "block"
}

function next2() {
    secondads.style.display = "none"
    thirdads.style.display = "block"
}

function next3() {
    thirdads.style.display = "none"
    fourthads.style.display = "block"
}

function next4() {
    fourthads.style.display = "none"
    fifthads.style.display = "block"
}

function proceed() {
    fifthads.style.display = "none"
    window.location.href = "login.html"
}

function settime() {
    setTimeout(() => {
        next1()
    }, 3000);
    setTimeout(() => {
        next2()
    }, 6000);
    setTimeout(() => {
        next3()
    }, 9000);
    setTimeout(() => {
        next4()
    }, 12000);
}
