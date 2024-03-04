
function checkInputFile(name, value) {
	if (value === "") {
		throw new Error(`Veuillez préciser le champ : "${name}"`);
	}
}

function errorMessage(Msg) {
	const sectionLogin = document.querySelector(".login");
	const form = document.querySelector(".form_login");
	const MsgError = document.createElement("div");
	MsgError.innerHTML = Msg;
	MsgError.className = "error_msg";
	sectionLogin.insertBefore(MsgError, form);
}

function authentification() {
	const form = document.querySelector('.form_login');
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		let Msg = document.querySelector(".error_msg");
		if (Msg !== null) {
			document.querySelector(".error_msg").remove();
		}
		try {
			let inputPassword = document.getElementById("passwd").value;
			let inputEmail = document.getElementById("email_login").value;
			checkInputFile("E-mail", inputEmail);
			checkInputFile("Mot de passe", inputPassword);
			const user = {
				email: inputEmail,
				password: inputPassword,
			}
			const userLogin = JSON.stringify(user);
			fetchLogin(userLogin);
		} catch (error) {
			errorMessage(error)
		}
	})
}
authentification()

function fetchLogin(charge) {
	fetch("http://localhost:5678/api/users/login", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: charge,
	}).then(response => {
		response;
		if (response.ok) {
			let ResultLogin = response.json();
			let promise2 = Promise.resolve(ResultLogin);
			promise2.then(ResultLogin => {
				ResultLogin;
				localStorage.setItem("token", ResultLogin.token);
				window.location.href = "index.html";
			})
		} else {
			alert("Erreur dans l\’identifiant ou le mot de passe");
			document.querySelector('.form_login').reset();
		}
	})
}