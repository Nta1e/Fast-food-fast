document.getElementById('order-btn').addEventListener('click',
	function(){
		document.querySelector('.bg-modal').style.display = 'flex';
	});
function edit(){
	document.querySelector('.bg-modal').style.display = 'flex';
	document.querySelector('.add_btn').style.display = 'none';
	};
document.querySelector('.close').addEventListener('click',
	function(){
		document.querySelector('.bg2-modal').style.display = 'none';
	});
document.querySelector('.viewbtn').addEventListener('click',
	function(){
		document.querySelector('.bg2-modal').style.display = 'flex'
	});
document.getElementById('close-x').addEventListener('click',
	function(){
		document.getElementById('bg-2modal').style.display = 'none';
	})
function close(){
	document.getElementById('bg-2modal').style.display = 'none';
}
