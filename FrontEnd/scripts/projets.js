/////////////////////////////// DECLARATION DES FONCTIONS //////////////////////////////////////

/////////Affichage des projets dans la gallerie
function viewGallery(works) {
	for (let i = 0; i < works.length; i++) {
		const tagFigure = document.createElement("figure");
		tagFigure.id = `figure${works[i].id}`;
		const tagImg = document.createElement("img");
		tagImg.src = works[i].imageUrl;
		tagImg.alt = works[i].title;
		tagImg.className = "Img_gallery";
		const tagFigcaption = document.createElement("figcaption");
		tagFigcaption.innerText = works[i].title;
		const gallery = document.querySelector(".gallery");
		gallery.appendChild(tagFigure);
		tagFigure.appendChild(tagImg);
		tagFigure.appendChild(tagFigcaption);
	}
}
/////////////////Création d'un menu de filtres par catégorie
function filterMenu(data) {
	////Création systématique du bouton permettant de revenir à l'affichage de tous les travaux*/
	const buttonAll = document.createElement("button");
	buttonAll.dataset.id = 0;
	buttonAll.innerText = "Tous";
	buttonAll.className = "filterAll";
	const filterBar = document.querySelector(".filter_bar");
	filterBar.appendChild(buttonAll);
	///création d'un objet set pour s'assurer d'une liste de catégorie sans bouton
	let Setcategory = new Set();
	for (let i = 0; i < data.length; i++) {
		Setcategory.add(data[i]);
	}
	///création d'un bouton associé chaque catégorie
	let categories = Array.from(Setcategory);
	for (let i = 0; i < categories.length; i++) {
		const filterButton = document.createElement("button");
		filterButton.dataset.id = categories[i].id;
		filterButton.innerText = categories[i].name;
		filterButton.className = "filterButton";
		const filterBar = document.querySelector(".filter_bar");
		filterBar.appendChild(filterButton);
	}
}
///Affichage des travaux de la catégorie sélectionnée
function filterGallery(works) {
	const selectedCategory = document.querySelectorAll(".filterButton");
	for (let i = 0; i < selectedCategory.length; i++) {
		selectedCategory[i].addEventListener("click", function() {
			if (parseInt(selectedCategory[i].dataset.id) === 0) {
				document.querySelector(".gallery").innerHTML = "";
				viewGallery(works);
			} else {
				let Works_filtres = works.filter(function(work) {
					return work.categoryId == selectedCategory[i].dataset.id;
				})
				document.querySelector(".gallery").innerHTML = "";
				viewGallery(Works_filtres);
			}
		})
	}
}
/////Création de la liste déroulante des catégories dans la 2ème modale
function categoryModal(categories) {
	const categoryList = document.getElementById("add_category");
	for (let i = 0; i < categories.length; i++) {
		const optionCat = document.createElement("option");
		optionCat.value = categories[i].id;
		optionCat.innerText = categories[i].name;
		categoryList.appendChild(optionCat);
	}
}
////////Affichage des projets dans la modale 
function viewGalleryModal(works) {
	for (let i = 0; i < works.length; i++) {
		const imgIcon = document.createElement("div");
		imgIcon.className = `cont_img${works[i].id}`;
		const tagImg = document.createElement("img");
		tagImg.src = works[i].imageUrl;
		tagImg.alt = works[i].title;
		tagImg.className = "ImageModale";
		linkIcon = document.createElement("a");
		linkIcon.href = "#";
		linkIcon.id = works[i].id;
		linkIcon.className = "lien_suppr";
		deleteIcone = document.createElement("i");
		deleteIcone.className = "fa-solid fa-trash-can";
		const Mgallery = document.querySelector(".Mgallery");
		Mgallery.appendChild(imgIcon);
		imgIcon.appendChild(tagImg);
		imgIcon.appendChild(linkIcon);
		linkIcon.appendChild(deleteIcone);
	}
	formAddValidation()
	deleteWork()
}
/////Récupération de toutes les données de l'API et chargement de la page d'accueil et des modales
function loadingData() {
	fetch("http://localhost:5678/api/categories").then(response => response.json()).then(data => {
		categories = data;
		filterMenu(categories);
		categoryModal(categories);
		return categories
	})
	fetch('http://localhost:5678/api/works').then(response => response.json()).then(works => {
		viewGallery(works);
		viewGalleryModal(works);
		filterGallery(works);
	})
}
/////Adaptation de l'affichage la page d'accueil si token valide 
function adminPage() {
	//Suppression du menu de filtre par catégorie
	document.querySelector(".filter_bar").style.display = "none";
	//remplacement du bouton login par un bouton logout
	const loginButton = document.getElementById("id_login");
	loginButton.remove();
	const logoutButton = document.createElement("a");
	logoutButton.href = "#";
	logoutButton.innerText = "logout";
	logoutButton.id = "logout_button";
	const logoutMenu = document.getElementById("menuLog");
	logoutMenu.appendChild(logoutButton);
	//Ajout du lien "modifier" vers la modale précédé d'une icone
	const editIcon = document.createElement("i");
	editIcon.className = "fa-regular fa-pen-to-square";
	const editTitle = document.createElement("a");
	editTitle.innerText = "Modifier";
	editTitle.href = "#modal1";
	editTitle.className = "js-modal";
	const editMenu = document.getElementById("title_portfolio");
	editMenu.style.marginBottom = "95px";
	editMenu.style.marginLeft = "130px";
	editMenu.appendChild(editIcon);
	editMenu.appendChild(editTitle);
	///Affichage d'une bannière en haut de page
	banner = document.getElementById("banner");
	banner.style.display = "block";
	marginIntro = document.getElementById("introduction");
	marginIntro.style.marginTop = "90px";
	//Appel de la fonction permettant l'ajout d'un Listener sur le bouton logout 
	logoutAdmin();
}
//////////////Déconnexion de la page administrateur  
function logoutAdmin() {
	const disconnectButton = document.getElementById("logout_button");
	disconnectButton.addEventListener("click", (e) => {
		e.preventDefault;
		///Suppression du token 
		window.localStorage.removeItem("token");
		///Réaffichage du menu de filtre par catégorie  
		document.querySelector(".filter_bar").style.display = "flex";
		///suppression du bouton logout
		disconnectButton.remove();
		///Supression du lien "modifier" et son icone
		editIcon = document.querySelectorAll(".fa-pen-to-square");
		editIcon[1].remove();
		editTitle = document.querySelectorAll(".js-modal");
		editTitle[1].remove();
		///Suppresion de la bannière en haut de page et réajustement des marges
		banner = document.getElementById("banner");
		banner.style.display = "none";
		marginIntro = document.getElementById("introduction");
		marginIntro.style.marginTop = "142px";
		const editMenu = document.getElementById("title_portfolio");
		editMenu.style.marginBottom = "45px";
		editMenu.style.marginLeft = "0px";
		//Re-création du bouton login avec un lien vers la page de connexion
		const reloginButton = document.createElement("a");
		reloginButton.href = "login.html";
		reloginButton.innerText = "login";
		reloginButton.id = "id_login";
		const logoutMenu = document.getElementById("menuLog");
		logoutMenu.appendChild(reloginButton);
	});
}
/////////////////Ouverture de la modale
function openModal(e) {
	e.preventDefault();
	const target = document.querySelector(e.target.getAttribute("href"));
	target.style.display = null;
	target.removeAttribute('aria-hidden');
	target.setAttribute('aria-modal', 'true');
	modal = target;
	modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
	const btnModal=modal.querySelector('.btn_modal')
	btnModal.addEventListener('click', viewModale2);
	document.getElementById("modal1").style.display = "flex";
	///Fermeture lors d'un clic en dehors de la modale
	window.addEventListener('click', (event) => {
		if (event.target.id === "modal1") {
			closeModal(event);
		}
	});
	btnModal.focus();
	return modal
}
////////////////////Suppression d'un projet sélectionné
function deleteWork() {
	let deleteSelected = document.querySelectorAll(".lien_suppr");
	for (let i = 0; i < deleteSelected.length; i++) {
		deleteSelected[i].addEventListener("click", (event) => {
			event.preventDefault();
			deleteID = deleteSelected[i].id;
			fetchDelete(deleteID);
			document.querySelector(".btn_modal").focus();
		})
	}
}

function fetchDelete(deleteID) {
	fetch(`http://localhost:5678/api/works/${deleteID}`, {
		method: "DELETE",
		headers: {"Authorization": `Bearer ${tokenValue}`}
	}).then((response) => {
		response;
			if (response.ok) {
			//Suppression du projet dans la gallerie de la modale     
			document.querySelector(`.cont_img${deleteID}`).remove();
			//Suppression du projet dans la gallerie de la page index
			document.getElementById(`figure${deleteID}`).remove();
			alert(`Projet ${deleteID} supprimé`);
		} else {
			console.log("Echec de la suppression du projet");
			throw new Error("Echec de suppression du projet");
		}
	}).catch(alert);
}
/////////////Affichage de la Modale2 pour ajout d'un projet 
function viewModale2() {
	//Adaptation de la taille selon la maquette
	const modal2 = document.querySelector(".modal-wrapper");
	modal2.style.height = "613px";
	//Suppression des images de la galerie
	const Mgallery = document.querySelector(".Mgallery");
	Mgallery.style.display = "none";
	///Changement du titre de la modale 1 
	let titleM1 = document.querySelector(".modal_title");
	titleM1.innerText = "Ajout photo";
	///suppression du bouton de la modale 1
	const Btn1 = document.querySelector(".btn_modal");
	Btn1.style.display = "none";
	///Affichage du bouton de retour vers la modale 1
	const returnButton = document.querySelector(".js-modal-return");
	returnButton.style.display = "block";
	///Affichage du formulaire permettant l'ajout d'un projet
	const formAdd = document.querySelector(".form_addWork");
	formAdd.style.display = "flex";	
	////supression de la barre de la modale 1
	const deleteHR = document.querySelector(".bar_modal1");
	deleteHR.style.display = "none";
	///Ajout d'un évenement sur bouton retour permettant de revenir à la Modale 1
	returnButton.addEventListener('click', returnModal1);
	////appel de la fonction permettantd'afficher l'image sélectionnée
	const insertImg = document.getElementById("btn_select");
	viewSelectedImg(insertImg);
	//Changement du coumeut du bouton au remplissage du formulaire
	fillingForm();
	
}
//////////Affichage de l'image sélectionnéee pour ajout dans la modale
function viewSelectedImg(insertImg) {
	insertImg.addEventListener("change", (e) => {
		e.preventDefault();
		const selectedImg = document.getElementById("selection_img");
		selectedImg.style.display = "block";
		const [btn_select] = insertImg.files;
		if (btn_select) {
			const types = ["image/jpg", "image/png"];
			if (types.includes(btn_select.type)) {
				document.getElementById("hide_insert_img").style.display = "none";
				const reader = new FileReader();
				reader.onload = function(e) {
					selectedImg.src = e.target.result;
					colorButton = document.getElementById("submit_add");
					colorButton.style.background = "#1D6154";
					colorButton.focus();
				}
				reader.readAsDataURL(btn_select)
			}
		}
	})
}

function fillingForm() {
	document.getElementById("add_title").addEventListener("change", (e) => {
		e.preventDefault();
		colorButton = document.getElementById("submit_add");
		colorButton.style.background = "#1D6154";
		colorButton.focus();
	})
	document.getElementById("add_category").addEventListener("change", (e) => {
		e.preventDefault();
		colorButton = document.getElementById("submit_add");
		colorButton.style.background = "#1D6154";
		colorButton.focus();
	})
}

/////Retour à la modale 1 à partir du bouton retour
function returnModal1() {
	///Modification du titre de la modale 
	const modal2 = document.querySelector(".modal-wrapper");
	modal2.style.height = "633px";
	const title = document.querySelector(".modal_title");
	title.innerText = "Galerie photo";
	//Bouton retour rendu invisible:
	const BtnReturn2 = document.querySelector(".js-modal-return");
	BtnReturn2.style.display = "none";
	//Formulaire d'ajout d'un projet rendu invisible:
	const addForm = document.querySelector(".form_addWork");
	addForm.reset();
	colorButton = document.getElementById("submit_add");
	colorButton.style.background = "#6f717099";
	document.getElementById("hide_insert_img").style.display = "flex";
	document.getElementById("selection_img").style.display = "none";
	addForm.style.display = "none";
	//Réaffichage du bouton de la modale 1
	const Btn1 = document.querySelector(".btn_modal");
	Btn1.style.display = "block";
	Btn1.focus();
	///Réaffichage de la barre de la modale1
	const barHR = document.querySelector(".bar_modal1");
	barHR.style.display = "block";
	///Réaffichage de la galerie de la modale1
	const Mgallery = document.querySelector(".Mgallery");
	Mgallery.style.display = "flex";
}
///Vérification des champs de saisie
function checkInputFile(name, value) {
	if (value === "") {
		console.log(`Veuillez préciser le champ : ${name}`);
		throw new Error(`Veuillez préciser le champ : ${name}`);
	}
}

function checkUrl(value) {
	if (value === "") {
		console.log("Veuillez sélectionner un projet");
		throw new Error("Veuillez sélectionner un projet");
	}
}
/////Ajout d'un nouveau projet
function formAddValidation() {
	const form = document.querySelector('.form_addWork');
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		try {
			uploadImageInput = document.querySelector("#btn_select");
			file = uploadImageInput.files[0];
			checkUrl(uploadImageInput.value);
			title = event.target.querySelector("[name=add_title]").value;
			checkInputFile("Titre", title);
			selectElmt = document.getElementById("add_category");
			category = selectElmt.options[selectElmt.selectedIndex].value;
			checkInputFile("Catégorie", category);
			///Création d'un objet FormData pour l'envoi de la requête
			formData = new FormData();
			formData.append("title", title);
			formData.append("category", parseInt(category));
			formData.append("image", file);
			//Envoi des données à l'API
			addWork(formData);
			closeModal(event);
		} catch (erreur) {
			console.log(erreur)
			alert(erreur)
		}
	})
}

function addWork(formData) {
	///Envoi du nouveau projet 
	fetch("http://localhost:5678/api/works", {
		method: "POST",
		headers: {"Authorization": `Bearer ${tokenValue}`	},
		body: formData
	}).then((response) => {
		response;
		if (response.ok) {
			console.log("Transmission réussie");
			return response.json();
		} else {
			console.log("Echec de transmission du projet");
			throw new Error("Echec de transmission du projet");
		}
	}).then(data => {
		///Ajout du nouveau projet dans la gallery de la page index
		const tagImg = document.createElement("img");
		tagImg.src = data.imageUrl;
		tagImg.alt = data.title;
		tagImg.className = "Img_gallery"
		const tagFigure = document.createElement("figure");
		tagFigure.id = `figure${data.id}`;
		const tagFigcaption = document.createElement("figcaption");
		tagFigcaption.innerText = data.title;
		const gallery = document.querySelector(".gallery");
		gallery.appendChild(tagFigure);
		tagFigure.appendChild(tagImg);
		tagFigure.appendChild(tagFigcaption);
		///Ajout du nouveau projet dans la gallery de la modale
		const imgIcon = document.createElement("div");
		imgIcon.className = `cont_img${data.id}`;
		const tagImgM = document.createElement("img");
		tagImgM.src = data.imageUrl;
		tagImgM.alt = data.title;
		tagImgM.className = "ImageModale";
		linkIcon = document.createElement("a");
		linkIcon.href = "#";
		linkIcon.id = data.id;
		linkIcon.className = "lien_suppr";
		deleteIcone = document.createElement("i");
		deleteIcone.className = "fa-solid fa-trash-can";
		deleteIcone.id = data.id;
		const Mgallery = document.querySelector(".Mgallery");
		Mgallery.appendChild(imgIcon);
		imgIcon.appendChild(tagImgM);
		imgIcon.appendChild(linkIcon);
		linkIcon.appendChild(deleteIcone);
		//Réinitialisaion du formulaire
		document.querySelector('.form_addWork').reset();
		colorButton = document.getElementById("submit_add")
		colorButton.style.background = "#6f717099";
		document.getElementById("hide_insert_img").style.display = "flex";
		document.getElementById("selection_img").style.display = "none";
		///Ajout de la fontion permettant la suppression du nouveau projet
		document.getElementById(data.id).addEventListener("click", () => {
		fetchDelete(data.id);
		});
		alert("Projet ajouté");
		
	}).catch(alert);
}
///////Fermeture de la modale
function closeModal(e) {
	if (modal === null) return
	e.preventDefault();
	const Modal = document.querySelector(".modal-wrapper");
	Modal.style.height = "633px";
	///Remise en forme de la modale 1 avant fermeture
	const Mgallery = document.querySelector(".Mgallery");
	Mgallery.style.display = "flex";
	const returnButton = document.querySelector(".js-modal-return");
	returnButton.style.display = "none";
	const addButton = document.querySelector(".btn_modal");
	addButton.style.display = "block";
	const barHR = document.querySelector(".bar_modal1");
	barHR.style.display = "block";
	////Réinitialisation du formulaire 
	const addForm = document.querySelector(".form_addWork");
	addForm.reset();
	colorButton = document.getElementById("submit_add");
	colorButton.style.background = "#6f717099";
	document.getElementById("hide_insert_img").style.display = "flex";
	document.getElementById("selection_img").style.display = "none";
	addForm.style.display = "none";
	modal.style.display = "none";
	modal.setAttribute('aria-hidden', 'true');
	modal.removeAttribute('aria-modal');
	modal.removeEventListener('click', closeModal);
	modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
	modal = null;
}
////Fonction principale 
function websiteLaunch(tokenValue) {
	loadingData()
	if (tokenValue !== null) {
		adminPage();
		let modal = null;
		document.querySelectorAll(".js-modal").forEach(a => {
			a.addEventListener("click", openModal);
		})
	}
}