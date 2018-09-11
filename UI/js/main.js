
function Declined(){
    alert('Order Declined!')
}
function Accepted(){
    alert('Order accepted!')
}
function toggle_visibility(id){
    var e = document.getElementById(id);
    if(e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
    }