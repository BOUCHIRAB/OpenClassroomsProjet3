//////////////////////// DECLARATION DES FONCTIONS ///////////////////////////////////////

/////////Boucle de création des projets dans la section gallery
function gallery(works){
    for (let i = 0; i < works.length; i++) {
        const BaliseFigure = document.createElement("figure");
        const BaliseImg = document.createElement("img");
        BaliseImg.src=works[i].imageUrl;
        BaliseImg.alt=works[i].title;
        const BaliseFigc= document.createElement("figcaption");
        BaliseFigc.innerText=works[i].title;
        const gallery = document.querySelector(".gallery");
        gallery.appendChild(BaliseFigure);
        BaliseFigure.appendChild(BaliseImg);
        BaliseFigure.appendChild(BaliseFigc);
    }
}

/////Fonction permettant de créer les boutons d'une barre de menu selon la liste des catégories*/
function  AfficherWorks(){  
    fetch("http://localhost:5678/api/categories")
        .then (response => response.json())
        .then (data => {
            menu = data;
            ////Création systématique du bouton permettant de revenir à l'affichage de tous les travaux*/
            const btn_filtre = document.createElement("button");
            btn_filtre.dataset.id= 0 ;
            btn_filtre.innerText= "Tous" ;
            btn_filtre.className= "btn_filtre" ;
            const BarreFiltre = document.querySelector(".barre_filtre");
            BarreFiltre.appendChild(btn_filtre);
            ///Création d'un bouton pour chaque catégorie présente dans la liste*/
            for (let i = 0; i < menu.length; i++) {
                const btn_filtre = document.createElement("button");
                btn_filtre.dataset.id=menu[i].id;
                btn_filtre.innerText=menu[i].name ;
                btn_filtre.className= "btn_filtre" ;
                const BarreFiltre = document.querySelector(".barre_filtre");
                BarreFiltre.appendChild(btn_filtre);
            }
        
            fetch('http://localhost:5678/api/works')
                .then (response => response.json())
                .then (works => {
                    ///Boucle permettant d'afficher les travaux de la catégorie dont le bouton a été cliqué*/
                    gallery(works)
                    const ChoixCat = document.querySelectorAll(".btn_filtre");
                    for (let i = 0; i < ChoixCat.length; i++) {
                        ChoixCat[i].addEventListener("click",  function () {
                            if (ChoixCat[i].dataset.id==0) {
                                document.querySelector(".gallery").innerHTML = "";
                                gallery(works)
                            } else {
                                const Works_filtres = works.filter(function(work) {
                                     return work.categoryId == ChoixCat[i].dataset.id;
                                })
                                document.querySelector(".gallery").innerHTML = "";
                                gallery(Works_filtres);
                            }
                        })
                    }
                })
        })
}

 /////Fonction pour adapter l'affichage  la page d'accueil si token valide
function Page_admin () {
    document.querySelector(".barre_filtre").style.display="none";
    const BtnLogin = document.getElementById("id_login");
    BtnLogin.remove();
    const BtnLogout= document.createElement("a");
    BtnLogout.href="#";
    BtnLogout.innerText="logout";
    BtnLogout.id="Btn_deconnexion"
    const MenuLogout = document.getElementById("menu_connexion");
    MenuLogout.appendChild(BtnLogout);
        
    const IconeModif=document.createElement("i");
    IconeModif.className="fa-regular fa-pen-to-square";
       
    const TitreModif=document.createElement("a");
    TitreModif.innerText="Modifier";
    TitreModif.href="#modal1";
    TitreModif.className="js-modal";

    const MenuModif=document.getElementById("Menu_modif");
    MenuModif.appendChild(IconeModif);
    MenuModif.appendChild(TitreModif);
  
    Deconnexion_admin()
}

//////////////Fonction permettant de se déconnecter de la page administrateur       
function Deconnexion_admin() {
    const Deconnexion = document.getElementById("Btn_deconnexion");
    Deconnexion.addEventListener("click", (e) => {
        e.preventDefault
        window.localStorage.removeItem("token");      
              
        document.querySelector(".barre_filtre").style.display="flex";
         Deconnexion.remove();
        IconeModif=document.querySelector(".fa-pen-to-square")
        IconeModif.remove();
        TitreModif=document.querySelector(".js-modal")
        TitreModif.remove();
        
        const BtnReLogin= document.createElement("a");
        BtnReLogin.href="login.html";
        BtnReLogin.innerText="login";
        BtnReLogin.id="id_login";

        const MenuLogout = document.getElementById("menu_connexion");
        MenuLogout.appendChild(BtnReLogin);
    });
}          



/////////////////Fonction permettant l'ouverture de la modale
const openModal = function(e){
    e.preventDefault()
    const target=document.querySelector(e.target.getAttribute("href"))
    target.style.display = null 
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal','true')
    modal= target
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    Afficher_WorksModal()
    modal.querySelector('.btn_modal').addEventListener('click', AfficherModale2);
    return modal  
}
  
////////////////////Fonction permettant de créer la page Modale2
function AfficherModale2() {
    //Suppression des images de la galerie
    const Mgallery = document.querySelector(".Mgallery");
    Mgallery.style.display="none"
    ///Changement du titre de la modale 1 
    const TitreM1 = document.querySelector(".titre_Modal")
    TitreM1.innerText="Ajout photo";
    ///Affichage du bouton de retour vers la modale 1
    const BtnReturn = document.querySelector(".js-modal-return")
    BtnReturn.style.display="block";
    ///Affichage du formulaire permettant l'ajout d'un projet
    const FormAjout = document.querySelector(".FormAjout")
    FormAjout.style.display="block";
    ///suppression du bouton de la modale 1
    const Btn1 = document.querySelector(".btn_modal")
    Btn1.style.display="none"
    ////supression de la barre de la modale 1
    const supprHR = document.querySelector(".barre_modal");
    supprHR.style.display="none"
    ///Ajout d'un évenement sur bouton retour permettant de revenir à la Modale 1
    BtnReturn.addEventListener('click', RetourModal1);

    ////récupération des catégories et intégration dans la liste de sélection du formulaire d'ajout
    fetch("http://localhost:5678/api/categories")
        .then (response => response.json())
        .then (data => {
            categories = data;
            const ListeCat = document.getElementById("Ajout_cat")
            for (let i = 0; i < categories.length; i++) {
                const optionCat= document.createElement("option")
                optionCat.value=categories[i].id;
                optionCat.innerText=categories[i].name;
                ListeCat.appendChild(optionCat);
            }
        })  
        const ChargeImg =document.getElementById("btn_select");
        SelectionImage(ChargeImg) 
    AjoutWork()
 }
 
 /////////////////////////Fonction permettant d'afficher les projets avec le bouton de suppression
 function Afficher_WorksModal(){
    fetch('http://localhost:5678/api/works')
        .then (response => response.json())
        .then (works => {
            for (let i = 0; i < works.length; i++) {
                const ImgIcone = document.createElement("div");
                ImgIcone.className = "cont_img";
                const BaliseImg = document.createElement("img");
                BaliseImg.src=works[i].imageUrl;
                BaliseImg.alt=works[i].title;
                BaliseImg.className="ImageModale";
                Icone_lien = document.createElement("a");
                Icone_lien.href="#";
                Icone_lien.id=works[i].id;
                Icone_lien.className="lien_suppr";
                Icone_suppr=document.createElement("i");
                Icone_suppr.className= "fa-solid fa-trash-can"
                Icone_suppr.id =works[i].id;
                const Mgallery = document.querySelector(".Mgallery");
                Mgallery.appendChild(ImgIcone);
                ImgIcone.appendChild(BaliseImg);
                ImgIcone.appendChild(Icone_lien);
                Icone_lien.appendChild(Icone_suppr);
            }
            SupprWork ()            
        })
}

////////////////////Fonction permettant de supprrimer un projet au clic sur la corbeille
function SupprWork () {
    const SelSuppr=document.querySelectorAll(".lien_suppr")
    for (let i = 0; i < SelSuppr.length; i++) { 
        SelSuppr[i].addEventListener("click", (event) => {
            event.preventDefault();  
            let NumSuppr = SelSuppr[i].id
            const Token=window.localStorage.getItem("token");
            fetch(`http://localhost:5678/api/works/${NumSuppr}`, {
                method: "DELETE",
                headers: {"Authorization" : `Bearer ${Token}` }
            }) 
        })  
    }
}

/////////////////////////Fonction permettant de revenir à la modale 1 après un click sur le bouton retour
function RetourModal1 () {
    const Modal2 = document.querySelector(".modal-wrapper");
    const Titre = document.querySelector(".titre_Modal")
    Titre.innerText="Galerie photo"

    const BtnReturn2 = document.querySelector(".js-modal-return")
    BtnReturn2.style.display="none";

    const FormAjout2 = document.querySelector(".FormAjout")
    FormAjout2.style.display="none";

    const Btn1 = document.querySelector(".btn_modal")
    Btn1.style.display="block"
    const supprHR = document.querySelector(".barre_modal");
    supprHR.style.display="block"        
    
    const Mgallery = document.querySelector(".Mgallery");
    Mgallery.style.display="flex"
}

///////Fonction permettant de fermer la modale
const closeModal = function(e){ 
    if (modal === null) return
    e.preventDefault()
    modal.style.display="none" 
    modal.setAttribute('aria-hidden','true');
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal=null
    const Mgallery = document.querySelector(".Mgallery");
    document.querySelectorAll(".cont_img").forEach(a=>{
        Mgallery.removeChild(a)
     })

    const BtnReturn2 = document.querySelector(".js-modal-return")
    BtnReturn2.style.display="none";
    const FormAjout2 = document.querySelector(".FormAjout")
    FormAjout2.style.display="none";
  
}


//////////Fonction permettant d'afficher l'image sélectionné pour ajout dans la modale
function SelectionImage(ChargeImg)  {
    ChargeImg.addEventListener("change", (e) => {
    e.preventDefault();   
    const SelImage = document.getElementById("selection_img");
    SelImage.style.display="block"
    const [btn_select]= ChargeImg.files 
    if (btn_select) { 
        const types = ["image/jpg","image/png"];
        if (types.includes(btn_select.type)) {
            document.getElementById("hide_insert_img").style.display="none";      
            const reader = new FileReader();
            reader.onload = function (e) {
            SelImage.src = e.target.result        
            }
        reader.readAsDataURL(btn_select)   
         
        }
    }
    })
}

function AjoutWork(){
    const form = document.querySelector('.FormAjout');    
    form.addEventListener("submit", (event) => {
       event.preventDefault();          
       let selectElmt = document.getElementById("Ajout_cat");
       let category = parseInt(selectElmt.options[selectElmt.selectedIndex].value);     
       let title =event.target.querySelector("[name=Ajout_titre").value;
     /*  let SelectImg=event.target.querySelector("[name=btn_select").value;*/
       let image = document.getElementById("btn_select").value
       const uploadImageInput = document.querySelector("#btn_select");
       const file = uploadImageInput.files[0];

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("image", file);
            
        const Token=window.localStorage.getItem("token");  
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {"Authorization" : `Bearer ${Token}`},
            body: formData 
        })
        
   
            document.getElementById("hide_insert_img").style.display="flex";
            event.target.querySelector("[name=btn_select]").value="";
            event.target.querySelector("[name=Ajout_titre").value="";
            document.getElementById("selection_img").src="";
            document.getElementById("selection_img").style.display="none";
            document.getElementById("Ajout_cat").options[selectElmt.selectedIndex].value="";
            document.getElementById("Ajout_cat").options[selectElmt.selectedIndex].innerText="";
            
              });
                     
    }

function LancementSite() {
    AfficherWorks()
    const ValeurToken = window.localStorage.getItem("token");
    if (ValeurToken!==null) {
        Page_admin()
        let modal = null
        document.querySelectorAll(".js-modal").forEach(a=>{
        a.addEventListener("click",openModal)
        })
    }
}

LancementSite()

