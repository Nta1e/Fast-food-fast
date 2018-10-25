let date = document.getElementById('date');
	date.value = new Date().toISOString().slice(0, 10)
let time = document.getElementById('tyme');
 	time.value = new Date().toISOString().slice(10, 21);
document.getElementById('formEdit').addEventListener('submit', placeOrder);
function placeOrder(event){
	event.preventDefault();
	let Order = document.getElementById('order').value;
	let Location = document.getElementById('location').value;
	let Comment = document.getElementById('comment').value;
	let error = document.getElementById('error');
	let status = '';
	fetch('https://ntale--v2.herokuapp.com/api/v2/users/orders',{
		method:'POST',
		headers:{
			'Content-type':'application/json',
			'Authorization':'Bearer '+ window.localStorage.getItem('token')
		},
		body:JSON.stringify({
			comment: Comment,
		    location: Location,
		    order: Order
		})
	}).then((res)=>{
			status = res.status;
			return res.json()
	})
	.then((data)=>{
		if(status==201){
			window.location = 'home.html'
		}
		if(status==400){
			error.style.display='none';
            error.style.display='block';
            document.getElementById('error').innerHTML = data["msg"];
		}
	}).catch((err)=>console.log(err))
}

if(location.href.match(/home/)){
	fetch('https://ntale--v2.herokuapp.com/api/v2/users/orders',{
		method:'GET',
		headers:{
			'Content-type':'application/json',
			'Authorization': 'Bearer '+ window.localStorage.getItem('token')
		}
	}).then((res)=>{
		status = res.status;
		return res.json()
	})
	.then((data)=>{
		if (status == 401){
            alert(data['msg'] + '. Click Ok to login');
            window.location.replace('index.html');
        }
        if(status == 200){
        	let output = '';
        	data["Your orders"].forEach(each=>{
        		output +=`
        		<tr>
                <td tableHeadData="id">${each.id}</td>
                <td tableHeadData="0rder:">${each.order_made}</td>
                <td tableHeadData="Made By">${each.made_by}</td>
                <td tableHeadData="Location:">${each.location}</td>
                <td tableHeadData="Order Date:">${each.order_date.slice(0, 17)}</td>
                <td tableHeadData="Time:">${each.order_date.slice(17, 30)}</td>
                <td tableHeadData="Comment">${each.comment}</td>

            </tr>

        		`
        	document.getElementById('orders-made').innerHTML = output;
        	})
        }
	}).catch((err)=>console.log(err))

}