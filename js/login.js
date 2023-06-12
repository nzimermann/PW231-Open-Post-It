let objPeople = []

function validateUser() {
    username.addEventListener("input", function (e) {
        let pattern = /^[\w\d-]{4,32}$/;
        let currentValue = e.target.value;
        let validUser = pattern.test(currentValue)
        let erroUser = document.getElementById("erroUser")
        if (validUser) {
            erroUser.style.display = "none"
        } else {
            erroUser.style.display = "block"
        }
        return validUser;
    })
}

function validatePassword() {
    password.addEventListener("input", function (e) {
        let pattern = /^[\w\d-]{8,255}$/;
        let currentValue = e.target.value;
        let validPassword = pattern.test(currentValue)
        let erroPassword = document.getElementById("erroPassword")
        if (validPassword) {
            erroPassword.style.display = "none"
        } else {
            erroPassword.style.display = "block"
        }
        return validPassword;
    })
}

function verifyUsername() {
    let verifyUser = document.getElementById("verifyUser")

    verifyUser.addEventListener("input", function (e) {
        let pattern = /^[\w\d-]{4,32}$/;
        let currentValue = e.target.value;
        let valiVdUser = pattern.test(currentValue)
        let erroVUser = document.getElementById("erroVUser")
        if (valiVdUser) {
            erroVUser.style.display = "none"
        } else {
            erroVUser.style.display = "block"
        }
        return valiVdUser;
    })
}

function validateNewPassword() {
    let newPassword = document.getElementById("newPassword")

    newPassword.addEventListener("input", function (e) {
        let pattern = /^[\w\d-]{8,255}$/;
        let currentValue = e.target.value;
        let validNewPassword = pattern.test(currentValue)
        let erroNewPassword = document.getElementById("erroNewPassword")
        if (validNewPassword) {
            erroNewPassword.style.display = "none"
        } else {
            erroNewPassword.style.display = "block"
        }
        return validNewPassword;
    })
}

function validateConfNewPassword() {
    let confNewPassword = document.getElementById("confNewPassword")

    confNewPassword.addEventListener("input", function (e) {
        let pattern = /^[\w\d-]{8,255}$/;
        let currentValue = e.target.value;
        let validConfNewPassword = pattern.test(currentValue)
        let erroConfNewPassword = document.getElementById("erroConfNewPassword")
        if (validConfNewPassword) {
            erroConfNewPassword.style.display = "none"
        } else {
            erroConfNewPassword.style.display = "block"
        }
        return validConfNewPassword;
    })
}

function forgotPassword() {
    let registerLogin = document.getElementById("registerLogin")
    let createNewPassword = document.getElementById("createNewPassword")

    if (registerLogin.style.display == "none" && createNewPassword.style.display == "inline-block") {
        registerLogin.style.display = "inline-block"
        createNewPassword.style.display = "none"
        clearInput()
        return false
    }
    else {
        registerLogin.style.display = "none"
        createNewPassword.style.display = "inline-block"
        clearInput()
        return false
    }
}

function changePassword() {
    let changePsw = document.getElementById("changePsw")
    let newPsw = {
        username: verifyUser.value,
        password: confNewPassword.value
    }
    if (newPassword.value == "" && confNewPassword.value == "") {
        clearInput()
        alert("As senhas não pode estar vazia");
    }
    else if (newPassword.value != confNewPassword.value) {
        clearInput()
        alert("As senhas estão diferentes");
    }
    else if (newPassword.value == confNewPassword.value) {
        for (i = 0; i < objPeople.length; i++) {
            if (verifyUser.value == objPeople[i].username) {
                delete objPeople[i]
                objPeople[i] = newPsw
            }
        }
        forgotPassword()
        alert("A senha foi alterada com sucesso");
    }
}

function registerUser() {
    let registerUsername = document.getElementById("username").value
    let registerPassword = document.getElementById("password").value
    let checkBox = document.getElementById("myCheckBox")
    let newUser = {
        username: registerUsername,
        password: registerPassword
    }
    if (registerUsername.length < 4) {
        alert("Não foi possivel efetuar o cadastro")
        clearInput()
        return
    }
    if (registerPassword.length < 8) {
        alert("Não foi possivel efetuar o cadastro")
        clearInput()
        return
    }
    for (i = 0; i < objPeople.length; i++) {
        if (registerUsername == objPeople[i].username) {
            alert("Esse usuário já esta sendo utilizado")
            clearInput()
            return
        }
        else if (registerPassword.length < 8) {
            alert("Não foi possivel efetuar o cadastro")
            clearInput()
            return
        }
    }
    if (checkBox.checked) {
        alert("Cadastro efetuado com sucesso")
        objPeople.push(newUser)
    } else {
        alert("Cadastro efetuado com sucesso")
        objPeople.push(newUser)
        clearInput()
    }
}

function login() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    for (i = 0; i < objPeople.length; i++) {
        if (username == objPeople[i].username && password == objPeople[i].password) {
            alert("Login efetuado com sucesso")
            window.open("main.html")
        } else {
            alert("Não foi possivel efetuar o login")
        }
    }
}

function clearInput() {
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    document.getElementById("verifyUser").value = ""
    document.getElementById("newPassword").value = ""
    document.getElementById("confNewPassword").value = ""
    document.getElementById("erroUser").style.display = "none"
    document.getElementById("erroPassword").style.display = "none"
    document.getElementById("erroVUser").style.display = "none"
    document.getElementById("erroNewPassword").style.display = "none"
    document.getElementById("erroConfNewPassword").style.display = "none"
}