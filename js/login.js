document.getElementById('loginusers').addEventListener('submit', loginUser);

function loginUser(event){
    event.preventDefault();

    let userName = document.getElementById('client').value;
    let passWord = document.getElementById('loginPassword').value;

    //declaring errors,messages and status variables to be used
    let error = document.getElementById('error');
    let success = document.getElementById('message');
    let status = '';

    fetch('https://ntale--v2.herokuapp.com/api/v2/auth/login', {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(
            {
                username:userName,
                password:passWord
        })
    }).then((res) => {
        status = res.status;
        return res.json();
    })
    .then((data) => {
        if (status >= 400){
            error.style.display='none';
            error.style.display='block';
            document.getElementById('error').innerHTML = data["Error"];
        }
        if (status == 200 ){
            error.style.display='none';
            success.style.display= 'block';
            document.getElementById('message').innerHTML = data['message'];
            //storing access_token to web local storage
            window.localStorage.setItem('token', data.token);
            if(userName=='Admin'){
                window.location = 'manage_orders.html'
            }else{
                window.location = 'home.html';
            }

        }
    })
    .catch((err)=>console.log(err))
}
//redirect user to orders made if user already has an access token
if (location.href.match(/index/)){
    if (localStorage.getItem('token') != null){
        window.location.href = 'home.html';
    }
}
//logout
function logout(){
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}