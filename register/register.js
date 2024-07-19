const tokenCheck = localStorage.getItem('x-token')
        if(tokenCheck){
            window.location.href = window.location.href = 'http://127.0.0.1:5500/home.html'
        }
        // form containers
        const registerPage = document.getElementById('registerForm')
        const loginPage = document.getElementById('loginForm')
        // register form
        const togglePassBtnRg = document.getElementById('rgPassBtn')
        const regUsername = document.getElementById('username-rg')
        const regEmail = document.getElementById('email-rg')
        const regPassInput = document.getElementById('password-rg')
        // login form
        const lgPassInput = document.getElementById('password-lg')
        const passBtnLg = document.getElementById('lgPassBtn')
        const loginEmail = document.getElementById('email-lg')
        const loginButton = document.getElementById('login-btn')
        let loginPass = true
        let registerPass = true
        let registerApiUrl = 'https://notes-backend-kc3f.onrender.com/register'
        let loginApiUrl = 'https://notes-backend-kc3f.onrender.com/login'

        const registerSubmit = async () => {
            if(regUsername.value !== '' && regEmail.value !== '' && regPassInput.value !== ''){
                const registerObj = {username:regUsername.value,email:regEmail.value,password:regPassInput.value}
                const payload = {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(registerObj)
                }
                const req = await fetch(registerApiUrl,payload)
                const res = await req.json()
                    if(req.ok){
                        console.log(res)
                        localStorage.setItem('x-token',JSON.stringify(res.token))
                        window.location.href = 'http://127.0.0.1:5500/home.html'
                        regUsername.value = ''
                        regEmail.value = ''
                        regPassInput.value = ''
                    }else{
                        alert(res.msg)
                    }
            }
        }

        const loginSubmit =async () =>{
            if(lgPassInput.value !== '' && loginEmail.value !== '' ){
                const loginObj = {email:loginEmail.value,password:lgPassInput.value}

                const payload = {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(loginObj)
                }
                const req = await fetch(loginApiUrl,payload)
                const res = await req.json()
                if(req.ok){
                    localStorage.setItem('x-token',JSON.stringify(res.token))
                    window.location.href = 'http://127.0.0.1:5500/home.html'
                    lgPassInput.value = ''
                    loginEmail.value = ''
                }else{
                    alert(res.msg)
                }
            }
        }

        const moveToRegister = () =>{
            registerPage.style.display = 'block'
            loginPage.style.display = 'none'
        }

        const moveToLogin = () =>{
            registerPage.style.display = 'none'
            loginPage.style.display = 'block'
        }
        const registerPassShowHide = ()=>{
            if(registerPass){
                regPassInput.type = 'text'
                togglePassBtnRg.textContent = 'visibility_off'
                registerPass = false
            }else {
                regPassInput.type = 'password'
                togglePassBtnRg.textContent = 'visibility'
                registerPass = true
            }
        }
        passBtnLg.addEventListener('click',()=>{
            if(loginPass){
                lgPassInput.type = 'text'
                passBtnLg.textContent = 'visibility_off'
                loginPass = false
            }else {
                lgPassInput.type = 'password'
                passBtnLg.textContent = 'visibility'
                loginPass = true
            }
        })