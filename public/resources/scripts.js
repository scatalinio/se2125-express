const postLoad = () => {
    console.log("Hello world!")

    const loginBtn = document.querySelector('#btn-login');
    loginBtn.onclick = () => {
        const usernameTxt = document.querySelector('#username').value;
        const passwordTxt = document.querySelector('#password').value;

        if (!usernameTxt) {
            alert('Please input username.');
            return;
        } else if (usernameTxt.length < 3) {
            alert('Username should have more than three (3) characters.');
            return;
        }
        
        if (!passwordTxt) {
            alert('Please input password.');
            return;
        } else if (passwordTxt.length < 3) {
            alert('Password should have more than three (3) characters.');
            return;
        }

        if (usernameTxt == "admin" && passwordTxt == "root") {
            console.log("redirect")
            location.href = "home.html";
        } else {
            alert('Access denied');

        }

        console.log("You pressed me!", usernameTxt, passwordTxt)
    }
}
window.onload = postLoad;