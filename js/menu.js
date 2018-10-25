//add meal option to the menu
document.getElementById('add-item').addEventListener('submit', addMeal)
function addMeal(event){
	event.preventDefault()
	let mealOption = document.getElementById('menuItem').value
	let mealPrice = document.getElementById('addPrice').value
	let error = document.getElementById('table-error');
    let success = document.getElementById('table-message');
    let status = '';
    fetch('https://ntale--v2.herokuapp.com/api/v2/admin/menu', {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
            'Authorization':'Bearer '+ window.localStorage.getItem('token')
        },
        body:JSON.stringify(
            {
                menu_item:mealOption,
                price:parseInt(mealPrice)
        })
    }).then((res) => {
        status = res.status;
        return res.json();
    })
    .then((data) => {
        if (status == 401){
            error.style.display='block';
            document.getElementById('table-error').innerHTML = data["msg"];
        }
        if (status == 400 || status >401){
            error.style.display='block';
            document.getElementById('table-error').innerHTML = data["error"];
        }
        if (status == 201 ){
            success.style.display= 'block';
            document.getElementById('table-message').innerHTML = data['message'];
            window.location = 'admin_edit.html';
        }
    })
    .catch((err)=>console.log(err))
}

if (location.href.match(/admin_edit/)){
    fetch('https://ntale--v2.herokuapp.com/api/v2/admin/menu',{
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
        if (data['Meal'] == ''){
            table = document.getElementById('admin-table');
            table.style.display = 'none';
            alert('There are currently no meal options on the menu');

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
                        <td class="btns1"><button id='${meal.meal_id}'class="btn-5" onclick="edit()">Edit</button></td>
                        <td class="btns2"><button class ="btn-6"
                        onclick="deleteMeal(${meal.meal_id})">Delete</button></td>


                    </tr>
					`
                document.getElementById('meal_options').innerHTML = output;
                var results = document.getElementById('meal_options')
            	results.onclick = e => {
                	var id = e.target.attributes.getNamedItem("id").value;
                	localStorage.setItem('meal_id', id)
               }
            });
       }

    })).catch((err)=>console.log(err))
}

let id=localStorage.getItem('meal_id')
document.getElementById('formEdit').addEventListener('submit', editMeal)
function editMeal(event){
	event.preventDefault();
	let mealEdit = document.getElementById('mealEdit').value;
	let priceEdit = document.getElementById('priceEdit').value;
	let error = document.getElementById('error');
    let success = document.getElementById('message');
    let status = '';
	fetch(`https://ntale--v2.herokuapp.com/api/v2/admin/menu/${id}`, {
		method:'PUT',
		headers: {
			'Content-type':'application/json',
			'Authorization': 'Bearer '+window.localStorage.getItem('token')
		},
		body:JSON.stringify(
            {
                menu_item:mealEdit,
                price:parseInt(priceEdit)
        })
	}).then((res) =>{
		status = res.status;
		return res.json();
	})
	.then((data) =>{
		if(status>=400){
			error.style.display='block';
			document.getElementById('error').innerHTML=data["Error"];
		}
		if(status>=200){
			window.location = 'admin_edit.html'
		}
	})
	.catch((err)=>console.log(err))
}

function deleteMeal(meal){
	let error = document.getElementById('table-error');
    let success = document.getElementById('table-message');
    let status = '';
    alert('Are you sure you want to delete this meal?!')
	fetch(`https://ntale--v2.herokuapp.com/api/v2/admin/menu/${meal}/delete`,{
		method:'DELETE',
		headers: {
			'Content-type':'application/json',
			'Authorization': 'Bearer '+window.localStorage.getItem('token')
		}
	}).then((res)=>{
		status = res.status;
		return res.json();
	})
	.then((data)=>{
		if(status==200){
			success.style.display= 'block';
            document.getElementById('table-message').innerHTML = data['msg'];
            window.location = 'admin_edit.html';
		}

	})
}

