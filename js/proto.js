document.addEventListener("DOMContentLoaded", webPage)
//loaded content from html file


function webPage() {
	const namee = document.getElementById('username');
	const password = document.getElementById('password');
	const form = document.getElementById('form');
	const errorElement = document.getElementById('error');

	if (form != undefined) {
		form.addEventListener('submit', (e) => {
			let messages = []
			if (namee.value === '' || namee.value == null) {
				messages.push('Username is required')
			}
			if (password.value.length <= 6) {
				messages.push('Password must be longer than 6 characters ')
			}
			if (messages.length > 0) {
				e.preventDefault();
				errorElement.innerText = messages.join(' , ')
			}
		});
	}
}

function myFunction() {
	var rule1 = document.forms[0];
	var txt = "";
	var i;
	for (i = 0; i < rule1.length; i++) {
		if (rule1[i].checked) {
			txt = txt + rule1[i].value + " ";
		}
	}
	alert("You selected " + txt);

	if (rule1.checked == false) {
		alert('Please select');
	}
}

//}
