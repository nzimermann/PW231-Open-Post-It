let objPeople = []

function validate(inputID, errorID) {
    let input = document.getElementById(inputID)
    let error = document.getElementById(errorID)
    let pattern
    input.addEventListener("input", function (e) {
        if (input.type == "password" || inputID == "password" || inputID == "newPassword" || inputID == "confNewPassword") {
            pattern = /^[a-zA-Z0-9_]{8,255}$/
        } else {
            pattern = /^[a-zA-Zà-úÀ-Ú0-9_]{4,32}$/
        }
        let currentValue = e.target.value;
        let valid = pattern.test(currentValue)
        if (valid) {
            error.style.display = "none"
        } else {
            error.style.display = "block"
        }
    })
}

function showPassword(targetID, inputID) {
    let id = document.getElementById(targetID)
    let input = document.getElementById(inputID)
    if (input.type == "password") {
        input.type = "text";
        id.classList.toggle("fa-eye-slash")
    } else {
        input.type = "password";
        id.classList.toggle("fa-eye-slash")
    }
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
    let verifyUser = document.getElementById("verifyUser").value
    let newPassword = document.getElementById("newPassword").value
    let confNewPassword = document.getElementById("confNewPassword").value
    let existe = false
    let newPsw = {
        username: verifyUser,
        password: confNewPassword
    }
    for (i = 0; i < objPeople.length; i++) {
        if (!objPeople[i].username.includes(verifyUser)) {
            existe = false
        } else {
            existe = true
            break
        }
    }
    if (verifyUser == "") {
        alert("O usuário não deve estar vazio")
        clearInput()
    }
    else if (existe == false) {
        alert("Esse usuário não está cadastrado")
        clearInput()
        return
    }
    else if (newPassword == "" && confNewPassword == "") {
        clearInput()
        alert("As senhas não podem estar vazia");
    }
    else if (newPassword != confNewPassword) {
        clearInput()
        alert("As senhas estão diferentes");
    }
    else if (newPassword == confNewPassword && /^[a-zA-Z0-9_]{8,255}$/.test(newPassword) && /^[a-zA-Z0-9_]{8,255}$/.test(confNewPassword)) {
        for (i = 0; i < objPeople.length; i++) {
            if (verifyUser == objPeople[i].username) {
                delete objPeople[i]
                objPeople[i] = newPsw
            }
        }
        forgotPassword()
        alert("A senha foi alterada com sucesso");
    }
    console.log(objPeople)
}

function registerUser() {
    let registerUsername = document.getElementById("username").value
    let registerPassword = document.getElementById("password").value
    let checkBox = document.getElementById("myCheckBox")
    let newUser = {
        username: registerUsername,
        password: registerPassword
    }
    if (JSON.parse(sessionStorage.getItem("user")) != null && JSON.parse(sessionStorage.getItem("user")).username == registerUsername) {
        alert("Não foi possivel efetuar o cadastro")
        clearInput()
        return
    }
    if (registerUsername.length < 4 || !/^[a-zA-Zà-úÀ-Ú0-9_]{4,32}$/.test(registerUsername)) {
        alert("Não foi possivel efetuar o cadastro")
        clearInput()
        return
    }
    if (registerPassword.length < 8 || !/^[a-zA-Z0-9_]{8,255}$/.test(registerPassword)) {
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
        else if (registerPassword.length < 8 || !/^[a-zA-Z0-9_]{8,255}$/.test(registerPassword)) {
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
    console.log(objPeople)
}

function login() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let isLogin = false

    for (i = 0; i < objPeople.length; i++) {
        if (username == objPeople[i].username && password == objPeople[i].password) {
            isLogin = true
            break
        }
    }
    if (JSON.parse(sessionStorage.getItem("user")) != null && JSON.parse(sessionStorage.getItem("user")).username == username && JSON.parse(sessionStorage.getItem("user")).password == password) {
        isLogin = true
    }
    if (isLogin) {
        for (i = 0; i < objPeople.length; i++) {
            if (username == objPeople[i].username && password == objPeople[i].password) {
                sessionStorage.setItem("user", JSON.stringify({
                    "username": objPeople[i].username,
                    "password": objPeople[i].password
                }))
            }
        }
        console.log(sessionStorage.getItem("user"))
        alert("Login efetuado com sucesso")
        clearInput()
        window.open("main.html","_self")
    } else {
        alert("Não foi possivel efetuar o login")
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