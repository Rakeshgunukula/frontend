    
    // Animation part for Login and Register form

const loginContainer = document.querySelector('.loginContainer');
const loginForm = document.querySelector('.loginForm');
const registerForm = document.querySelector('.registerForm');
const registerContent = document.querySelector('.registerContent');
const loginContent = document.querySelector('.loginContent');
const registerBtn = document.querySelector('.registerBtn');
const loginBtn = document.querySelector('.loginBtn');

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
            if (response.ok) {
                alert(data.message);

                registerFormElement.reset();
                loginContainer.classList.remove('toRight');
    loginContainer.classList.add('toLeft');

    loginForm.classList.remove('active');
    registerForm.classList.remove('active');

    registerContent.classList.remove('active');
    loginContent.classList.remove('active');

    registerBtn.classList.remove('active');
    loginBtn.classList.remove('active');

            } else {
                alert(data.message);
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
            if (response.ok) {
                alert(data.message);
                // Redirect to index.html after successful login
                window.location.href = '/index.html';
                loginFormElement.reset();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
