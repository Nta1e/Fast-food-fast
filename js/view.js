if(location.href.match(/view_menu/)){
	fetch('https://ntale--v2.herokuapp.com/api/v2/users/menu',{
        method:'GET',
        headers: {
            'Content-type':'application/json',
            'Authorization':'Bearer '+ window.localStorage.getItem('token')
        }
    })
    .then((res) => {
    status = res.status;
    return res.json();
    })
    .then((data =>{
        if (status == 401){
            alert(data['msg'] + '. Click Ok to login');
            window.location.replace('index.html');
        }
        if (status == 403){
            alert(data['msg']);

        }
        if (status == 200){
            let output = '';
            var i = 0;
            data['menu'].forEach(meal => {
            	i++;
                output +=`
                <tr>
                        <td>${i}</td>
                        <td>${meal.menu_item}</td>
                        <td>${meal.price}</td>
                </tr>

					`
                document.getElementById('meals').innerHTML = output;
            });
       }

    })).catch((err)=>console.log(err))
}