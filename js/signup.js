//Signup functionality
document.getElementById('signup').addEventListener('submit', userSignup)

function userSignup(event){
	event.preventDefault();
	let username = document.getElementById('username').value;
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	let confirmPassword = document.getElementById('confirmPassword').value;
	//declaring errors,messages and status variables to be used
	let error = document.getElementById('error');
	let success = document.getElementById('message');
	let status = '';
	fetch('https://ntale--v2.herokuapp.com/api/v2/auth/signup', {
		method:'POST',
		headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(
            {
                username:username,
                email:email,
                password:password,
                confirm_password:confirmPassword
        })
	}).then((res) => {
        status = res.status;
        return res.json();
    })
    .then((data) => {
        if (status >= 400){
            error.style.display='none';
            error.style.display='block';
            document.getElementById('error').innerHTML = data["error"];
        }
        if (status == 201 ){
            window.location = 'index.html';
            error.style.display='none';
            success.style.display= 'block';
            document.getElementById('message').innerHTML = data['message'];
        }
    })
}

