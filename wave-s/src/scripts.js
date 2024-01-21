// ! DARK MODE CODES

function toggleDarkLight() {
    var body = document.getElementById("body");
    var currentClass = body.className;
    body.className = currentClass == "light-mode" ? "dark-mode" : "light-mode";
}

// ! LOADING WINDOW CODES

const load = setTimeout(() => {
    const loader = document.querySelector(".loader");
    loader.style.opacity = 0;
    loader.style.visibility = "hidden";
}, 2000);

// ! SHOW DIALOG CODES

let showDialog = document.getElementById("show__dialog");
let fullName = document.getElementById("fname");
let telNum = document.getElementById("tel");
let comment = document.getElementById("comment");

function openDialog() {
    showDialog.style.zIndex = 1;
    showDialog.style.opacity = 1;

    let commentObject = {
        FullName: fullName.value,
        TelNum: telNum.value,
        Comment: comment.value,
    };

    console.log(commentObject);

    fullName.value = "";
    telNum.value = "";
    comment.value = "";
}

function exitDialog() {
    showDialog.style.zIndex = -1;
    showDialog.style.opacity = 0;
}
