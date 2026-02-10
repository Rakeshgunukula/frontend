    
    // Animation part for Login and Register form

const loginContainer = document.querySelector('.loginContainer');
const loginForm = document.querySelector('.loginForm');
const registerForm = document.querySelector('.registerForm');
const registerContent = document.querySelector('.registerContent');
const loginContent = document.querySelector('.loginContent');
const registerBtn = document.querySelector('.registerBtn');
const loginBtn = document.querySelector('.loginBtn');
const showMsg = document.querySelector('.showmsg');
const container = document.querySelector('.container');

registerBtn.onclick = e =>{
    e.preventDefault();
    loginContainer.classList.remove('toLeft');
    loginContainer.classList.add('toRight');

    loginForm.classList.add('active');
    registerForm.classList.add('active');

    registerContent.classList.add('active');
    loginContent.classList.add('active');

    registerBtn.classList.add('active');
    loginBtn.classList.add('active');
};

loginBtn.onclick = e =>{
    e.preventDefault();
    loginContainer.classList.remove('toRight');
    loginContainer.classList.add('toLeft');

    loginForm.classList.remove('active');
    registerForm.classList.remove('active');

    registerContent.classList.remove('active');
    loginContent.classList.remove('active');

    registerBtn.classList.remove('active');
    loginBtn.classList.remove('active');
};


    //=========**** Fetching A P I  from the backend*****========

    // register form

    // api uri

    const API_URI = 'https://shopping-app-backend-o6w8.onrender.com';
 
    const registerFormElement = document.getElementById('register');
    registerFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = registerFormElement.name.value;
        const email = registerFormElement.email.value;
        const password = registerFormElement.password.value;

        try {
            const response = await fetch(`${API_URI}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (data.status === 200 || data.status === 201 ) {
                registerFormElement.reset();
                container.classList.add('show');
                showMsg.querySelector('p').textContent = data.message;
                showMsg.classList.add('show');

                setTimeout(() =>{
                    showMsg.classList.remove('show');
                    container.classList.remove('show');
                    loginContainer.classList.remove('toRight');
                    loginContainer.classList.add('toLeft');
    
                    loginForm.classList.remove('active');
                    registerForm.classList.remove('active');
    
                    registerContent.classList.remove('active');
                    loginContent.classList.remove('active');
                
                    registerBtn.classList.remove('active');
                    loginBtn.classList.remove('active');
                },2000);
               
            } else if(response.status === 409){
                showMsg.querySelector('p').textContent = data.message;
                showMsg.querySelector('div').innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
                showMsg.querySelector('div i').background = 'red';
                showMsg.classList.add('show');
                container.classList.add('show');
                setTimeout(() =>{
                showMsg.classList.remove('show');
                container.classList.remove('show');
                },2000);
            }
        } catch (error) {
            console.error('Error:', error);
            // alert('An error occurred while registering. Please try again later.');
        }
    });


    // login form

    const loginFormElement = document.getElementById('login');
    loginFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginFormElement.email.value;
        const password = loginFormElement.password.value;

        try {
            const response = await fetch(`${API_URI}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.status === 200) {
                loginFormElement.reset();
                showMsg.querySelector('p').textContent = data.message;
                showMsg.querySelector('div').innerHTML = '<i class="fa-regular fa-circle-check"></i>';
                showMsg.querySelector('div i').style.background = 'green';
                showMsg.classList.add('show');
                container.classList.add('show');
                setTimeout(() =>{
                    showMsg.classList.remove('show');
                    container.classList.remove('show');
                },2000);
                setTimeout(() =>{

                    window.location.href = '/index.html';
                },3000);
            } else if(response.status === 400 || response.status === 404){
                showMsg.querySelector('p').textContent = data.message;
                
                showMsg.querySelector('div').innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';

                showMsg.querySelector('div i').style.background = 'red';

                showMsg.classList.add('show');

                container.classList.add('show');
                setTimeout(() =>{
                showMsg.classList.remove('show');
                container.classList.remove('show');
                // loginFormElement.reset();
                },2000);

            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
