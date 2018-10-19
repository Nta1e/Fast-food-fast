document.getElementById('order-btn').addEventListener('click',
	function(){
		document.querySelector('.bg-modal').style.display = 'flex';
	});
function edit(){
	document.querySelector('.bg-modal').style.display = 'flex';
	document.querySelector('.add_btn').style.display = 'none';
	};

function menu(){
	document.querySelector('.bg1-modal').style.display = 'flex';
}
document.querySelector('.close').addEventListener('click',
	function(){
		document.querySelector('.bg1-modal').style.display = 'none';
	})
