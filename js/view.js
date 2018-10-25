let status = '';
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

if(location.href.match(/manage_orders/)){
	fetch('https://ntale--v2.herokuapp.com/api/v2/admin/orders',{
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
            data['orders'].forEach(each => {
            	i++;
                output +=`
                <tr>
                    <td tableHeadData="id">${i}</td>
                    <td tableHeadData="0rder:">${each.order_made}</td>
                    <td tableHeadData="Owner">${each.made_by}</td>
                    <td tableHeadData="Location:">${each.location}</td>
                    <td tableHeadData="Order Date:">${each.order_date.slice(0, 17)}</td>
                    <td tableHeadData="Delivery time:">${each.order_date.slice(17, 30)}</td>
                    <td tableHeadData="Comments">${each.comment}</td>
                    <td><button class="btn-1" onClick="acceptOrder(${each.id})">Accept</button></td>
                    <td><button class="btn-2" onClick="declineOrder(${each.id})">Decline</button></td>
                    <td tableHeadData="status" >
                    <span id="statusArea">${each.status}</span>
                    </td>
                    <td tableHeadData="Mark as complete"> <label class="checkbox-container">
                                        <input type="checkbox" id="CompOrder" onchange="finishOrder(${each.id})">
                                                                <span class="checkmark"></span>
                                                          </label>
                    </td>
                    <td><button onClick="viewOrder(${each.id})">View</button</td>
                </tr>
					`
                document.getElementById('all_orders').innerHTML = output;
            });
       }

    })).catch((err)=>console.log(err))
}

function acceptOrder(order_id){
    let statusProcess = 'Processing'
    let status = ''
    fetch(`https://ntale--v2.herokuapp.com/api/v2/admin/orders/${order_id}`,{
        method: 'PUT',
        headers: {
            'Content-type':'application/json',
            'Authorization':'Bearer '+ window.localStorage.getItem('token')
        },
        body:JSON.stringify(
            {
                status:statusProcess
        })
    }).then((res)=>{
        status = res.status;
        return res.json()
    }).then((data)=>{
        if(status==200){
            alert('status updated!');
            location.reload();
        }
    })
}

function declineOrder(order){
    let statusDecline = 'Cancelled'
    let status = ''
    fetch(`https://ntale--v2.herokuapp.com/api/v2/admin/orders/${order}`,{
        method: 'PUT',
        headers: {
            'Content-type':'application/json',
            'Authorization':'Bearer '+ window.localStorage.getItem('token')
        },
        body:JSON.stringify(
            {
                status:statusDecline
        })
    }).then((res)=>{
        status = res.status;
        return res.json()
    }).then((data)=>{
        if(status==200){
            alert('Status updated!');
            location.reload();
        }
    })
}

function viewOrder(order_ID){
    fetch(`https://ntale--v2.herokuapp.com/api/v2/admin/orders/${order_ID}`,{
        method:'GET',
        headers: {
            'Content-type':'application/json',
            'Authorization': 'Bearer '+ window.localStorage.getItem('token')
        }
    }).then((res)=>{
        status = res.status;
        return res.json();
    })
    .then((data)=>{
        if (status == 401){
            alert(data['msg'] + '. Click Ok to login');
            window.location.replace('index.html');
        }
        if(status==200){
            document.getElementById('bg-2modal').style.display = 'flex';
            window.localStorage.setItem('order_made', data.order.order_made);
            window.localStorage.setItem('order_date', data.order.order_date.slice(0, 17));
            window.localStorage.setItem('made_by', data.order.made_by);
            window.localStorage.setItem('location', data.order.location);
            window.localStorage.setItem('comment', data.order.comment);
            window.localStorage.setItem('status', data.order.status);

            let output = '';
            output +=`
            <p class="par"><span class="key">Order Made:</span> <span class="itms">${window.localStorage.getItem('order_made')}</span></p>
            <p class="par"><span class="key">Date :</span> <span class="itms">${window.localStorage.getItem('order_date')}</span></p>
            <p class="par"><span class="key">Made By :</span> <span class="itms">${window.localStorage.getItem('made_by')}</span></p>
            <p class="par"><span class="key">Location :</span> <span class="itms">${window.localStorage.getItem('location')}</span></p>
            <p class="par"><span class="key">Comment :</span> <span class="itms">${window.localStorage.getItem('comment')}</span></p>
            <p class="par"><span class="key">Status :</span> <span class="itms">${window.localStorage.getItem('status')}</span></p>

                    `
                    document.getElementById('oneOrder').innerHTML=output;
        }
    }).catch((err)=>console.log(err))
}


 function finishOrder(orderId){
    let Comp = document.getElementById('CompOrder')
    let statusComplete = 'Complete'
    let status = ''
    if(Comp.checked == true){
        fetch(`https://ntale--v2.herokuapp.com/api/v2/admin/orders/${orderId}`,{
        method: 'PUT',
        headers: {
            'Content-type':'application/json',
            'Authorization':'Bearer '+ window.localStorage.getItem('token')
        },
        body:JSON.stringify(
            {
                status:statusComplete
        })
    }).then((res)=>{
        status = res.status;
        return res.json()
    }).then((data)=>{
            location.reload();

    })
    }
}
