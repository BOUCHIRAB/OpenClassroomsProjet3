///////////////// DECLARATION DES FONCTIONS PERMET LA GESTION DES PROJETS : AFFICHAGE, FILTRAGE, AJOUT, SUPPRESSION ///////////////////////////////////////

/////////Boucle permettant d'afficher les projets dans la section gallery
function AfficherGallery(works){
    for (let i = 0; i < works.length; i++) {
        const BaliseFigure = document.createElement("figure");
        BaliseFigure.id=`figure${works[i].id}`;
        const BaliseImg = document.createElement("img");
        BaliseImg.src=works[i].imageUrl;
        BaliseImg.alt=works[i].title;
        BaliseImg.className="Img_gallery"
        const BaliseFigc= document.createElement("figcaption");
        BaliseFigc.innerText=works[i].title;
        const gallery = document.querySelector(".gallery");
        gallery.appendChild(BaliseFigure);
        BaliseFigure.appendChild(BaliseImg);
        BaliseFigure.appendChild(BaliseFigc);
    }
   
}

/////////////////Fonction permettant la création d'un menu de filtre par catégorie
function MenuFiltre(data) {
   ////Création systématique du bouton permettant de revenir à l'affichage de tous les travaux*/
   const btn_filtre = document.createElement("button");
   btn_filtre.dataset.id= 0 ;
   btn_filtre.innerText= "Tous" ;
   btn_filtre.className= "btn_filtre" ;
   const BarreFiltre = document.querySelector(".barre_filtre");
   BarreFiltre.appendChild(btn_filtre);
   console.log(btn_filtre)

    ///création d'un objet set pour s'assurer d'une liste de catégorie sans bouton
    let Setcategorie = new Set();
    for (let i = 0; i < data.length; i++) {
        Setcategorie.add(data[i])
    }
    ///création d'un bouton associé chaque catégorie
    let categorie = Array.from(Setcategorie)
    for (let i = 0; i < categorie.length; i++) {
        const btn_filtre = document.createElement("button");
        btn_filtre.dataset.id=categorie[i].id;
        btn_filtre.innerText=categorie[i].name ;
        btn_filtre.className= "btn_filtre" ;
        const BarreFiltre = document.querySelector(".barre_filtre");
        BarreFiltre.appendChild(btn_filtre);
    }
}

///Boucle permettant d'afficher les travaux de la catégorie dont le bouton a été cliqué*/////AfficherGallery
function FiltrageGallery(works) {
    const ChoixCat = document.querySelectorAll(".btn_filtre");
   for (let i = 0; i < ChoixCat.length; i++) {
       ChoixCat[i].addEventListener("click",  function () {
      
            if (parseInt(ChoixCat[i].dataset.id)===0) {
               document.querySelector(".gallery").innerHTML = "";
               AfficherGallery(works)
                                    
            } else {
               let Works_filtres = works.filter(function(work) {
                    return work.categoryId == ChoixCat[i].dataset.id;
               })
               document.querySelector(".gallery").innerHTML = "";
               AfficherGallery(Works_filtres);
           }
       })
   }
}

/////Fonction permettant de créer la liste déroulante des catégories dans la 2ème modale
function Liste_catModal(categories) {
    const ListeCat = document.getElementById("Ajout_cat")
    for (let i = 0; i < categories.length; i++) {
        const optionCat= document.createElement("option")
        optionCat.value=categories[i].id;
        optionCat.innerText=categories[i].name;
        ListeCat.appendChild(optionCat);
    }
}  


 ////////Fonction permettant d'afficher les projets dans la modale avec le bouton icone de suppression
  
 function AfficherGalleryModal(works){
    for (let i = 0; i < works.length; i++) {
        const ImgIcone = document.createElement("div");
        ImgIcone.className = `cont_img${works[i].id}`;
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
     
        const Mgallery = document.querySelector(".Mgallery");
        Mgallery.appendChild(ImgIcone);
        ImgIcone.appendChild(BaliseImg);
        ImgIcone.appendChild(Icone_lien);
        Icone_lien.appendChild(Icone_suppr);
         }
          
         ValidationFormAjout()
         SuppressionWork()
      
 }               
 

/////Fonction permettant de récupérer toutes les données de l'API et de charger la page d'accueil et les modales
//////AfficherGallery   AfficherGalleryModal    FiltrageGallery MenuFiltre Liste_catModal
function  ChargementDonnees(){  
    
         fetch("http://localhost:5678/api/categories")
        .then (response => response.json())
        .then (data => {
            
            categories = data;
            MenuFiltre(categories)
            Liste_catModal(categories)
             return categories
             })
      
           
        fetch('http://localhost:5678/api/works')
            .then (response => response.json())
            .then (works => {       
                AfficherGallery(works)
                AfficherGalleryModal(works)
                FiltrageGallery(works)           
                })       
       
    }

 /////Fonction pour adapter l'affichage  la page d'accueil si token valide /////  Deconnexion_admin()
function Page_admin () {
    //Suppression du menu de filtre par catégorie
    document.querySelector(".barre_filtre").style.display="none";
    
    //remplacement du bouton login par un bouton logout
    const BtnLogin = document.getElementById("id_login");
    BtnLogin.remove();
    const BtnLogout= document.createElement("a");
    BtnLogout.href="#";
    BtnLogout.innerText="logout";
    BtnLogout.id="Btn_deconnexion"
    const MenuLogout = document.getElementById("menu_connexion");
    MenuLogout.appendChild(BtnLogout);
    
    //Ajout du lien modifier vers la modale précédé d'une icone
    const IconeModif=document.createElement("i");
    IconeModif.className="fa-regular fa-pen-to-square"; 
    const TitreModif=document.createElement("a");
    TitreModif.innerText="Modifier";
    TitreModif.href="#modal1";
    TitreModif.className="js-modal";
    const MenuModif=document.getElementById("Menu_modif");
    MenuModif.appendChild(IconeModif);
    MenuModif.appendChild(TitreModif);
  //Appel de la fonction permettant l'ajout d'un Listener sur le bouton logout 
    Deconnexion_admin()
}

//////////////Fonction permettant de se déconnecter de la page administrateur       
function Deconnexion_admin() {
    const Deconnexion = document.getElementById("Btn_deconnexion");
    Deconnexion.addEventListener("click", (e) => {
        e.preventDefault
        ///Suppression du token 
        window.localStorage.removeItem("token");      
        ///Réaffichage du menu de filtre par catégorie      
        document.querySelector(".barre_filtre").style.display="flex";
        ///suppression du bouton logout
        Deconnexion.remove();
        ///Supression du menu modifier et son icone
        IconeModif=document.querySelector(".fa-pen-to-square")
        IconeModif.remove();
        TitreModif=document.querySelector(".js-modal")
        TitreModif.remove();
        //Re-création du bouton login avec un lien vers la page de connexion
        const BtnReLogin= document.createElement("a");
        BtnReLogin.href="login.html";
        BtnReLogin.innerText="login";
        BtnReLogin.id="id_login";
        const MenuLogout = document.getElementById("menu_connexion");
        MenuLogout.appendChild(BtnReLogin);
    });
}          

/////////////////Fonction permettant l'ouverture de la modale /////closeModal
function openModal(e){
    e.preventDefault()  

    const target=document.querySelector(e.target.getAttribute("href"))
    target.style.display = null 
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal','true')
    modal= target
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.btn_modal').addEventListener('click', AfficherModale2);

   
    ///Fermeture lors d'un clic en dehors de la modale
    window.addEventListener('click', (event) => {
        if (event.target.id ==="modal1") {
          closeModal(event);
        }
      });

      
      console.log(document.querySelector(".Mgallery"))
    return modal  
}


////////////////////Fonction permettant de supprrimer un projet au clic sur la corbeille
function SuppressionWork () {
    
    let SelSuppr=document.querySelectorAll(".lien_suppr")
    for (let i = 0; i < SelSuppr.length; i++) { 
        ///Suppression du projet pour lequel l'icone corbeille a été cliquée
        SelSuppr[i].addEventListener("click", (event) => {
            event.preventDefault();       
             NumSuppr = SelSuppr[i].id

             console.log('Affichage du lien cliqué puis du num image correspondant:')
             console.log(SelSuppr[i])
             console.log(NumSuppr)
             fetchDelete (NumSuppr)
        })
    }
}


function fetchDelete(NumSuppr) {
   ReponseSuppression =fetch(`http://localhost:5678/api/works/${NumSuppr}`, {
            method: "DELETE",
            headers: {"Authorization" : `Bearer ${ValeurToken}` }
            }) 
            .then((ReponseSuppression) => {
                ReponseSuppression
                console.log(ReponseSuppression.ok)
                if (ReponseSuppression.ok) {
                    //Suppression du projet dans la gallerie de la modale                  
                document.querySelector(`.cont_img${NumSuppr}`).remove()
                //Suppression du projet dans la gallerie de la page index
                    document.getElementById(`figure${NumSuppr}`).remove() 
                    console.log (document.querySelector(".Mgallery"))
                     alert(`Projet ${NumSuppr} supprimé`)
                    console.log("Projet supprimé")
               
                }else{
                    console.log("Echec de la suppression du projet")
                    throw new Error("Echec de suppression du projet");      
                }
             })
             .catch(alert); 
       
        }
            
 
//////////////Fonction permettant de créer la  Modale2 pour ajout d'un projet //// SelectionImage(ChargeImg) 
function AfficherModale2() {
    //Suppression des images de la galerie
    const Mgallery = document.querySelector(".Mgallery");
    Mgallery.style.display="none"
    ///Changement du titre de la modale 1 
    let TitreM1 = document.querySelector(".titre_Modal")
    TitreM1.innerText="Ajout photo";
    ///Affichage du bouton de retour vers la modale 1
    const BtnReturn = document.querySelector(".js-modal-return")
    BtnReturn.style.display="block";
    ///Affichage du formulaire permettant l'ajout d'un projet
    const FormAjout = document.querySelector(".FormAjout")
    FormAjout.style.display="flex";
    ///suppression du bouton de la modale 1
    const Btn1 = document.querySelector(".btn_modal")
    Btn1.style.display="none"
    ////supression de la barre de la modale 1
   console.log(document.querySelector(".barre_modal1")) 
   const supprHR = document.querySelector(".barre_modal1");
    supprHR.style.display="none"
    ///Ajout d'un évenement sur bouton retour permettant de revenir à la Modale 1
    BtnReturn.addEventListener('click', RetourModal1);

   ////appel de la fonction permettantd'afficher l'image sélectionnée
    const ChargeImg =document.getElementById("btn_select");
    SelectionImage(ChargeImg) 
  
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
 
/////Fonction permettant de revenir à la modale 1 après un click sur le bouton retour //// SuppressionWork()
function RetourModal1 () {
    ///Modification du titre de la modale 2 pour afficher le titre de la modale 1
    const Modal2 = document.querySelector(".modal-wrapper");
    const Titre = document.querySelector(".titre_Modal")
    Titre.innerText="Galerie photo"
    //Bouton retour rendu invisible:
    const BtnReturn2 = document.querySelector(".js-modal-return")
    BtnReturn2.style.display="none";
     //Formulaire d'ajout d'un projet rendu invisible:
    const FormAjout2 = document.querySelector(".FormAjout")
    FormAjout2.reset()
    document.getElementById("hide_insert_img").style.display="flex";
    document.getElementById("selection_img").style.display="none";
    FormAjout2.style.display="none";
    //Réaffichage du bouton de la modale 1
    const Btn1 = document.querySelector(".btn_modal")
    Btn1.style.display="block"
    ///Réaffichage de la barre de la modale1
    const barreHR = document.querySelector(".barre_modal1");
    barreHR.style.display="block"        
    ///Réaffichage de la galerie de la modale1
    const Mgallery = document.querySelector(".Mgallery");
    Mgallery.style.display="flex"
    
    console.log (document.querySelector(".Mgallery"))
}


///Vérification des champs de saisie
function VerifChampSaisi(nom, valeur) {
    if (valeur==="") {
        console.log(`Veuillez préciser le champ : ${nom}`)
        throw new Error(`Veuillez préciser le champ : ${nom}`)
    }
    }
function VerifUrl(valeur) {
        if(valeur==="") {
            console.log("Veuillez sélectionner un projet")
            throw new Error("Veuillez sélectionner un projet")
        }
}

function ValidationFormAjout() {    
     const form = document.querySelector('.FormAjout');    
    form.addEventListener("submit", (event) => {
    event.preventDefault();          
    
    //Récupération des données du formulaire d'ajout
    try{
         uploadImageInput = document.querySelector("#btn_select");
         file = uploadImageInput.files[0];
        VerifUrl(uploadImageInput.value)
        
      
         title =event.target.querySelector("[name=Ajout_titre").value;
        VerifChampSaisi("Titre", title)
     
        selectElmt = document.getElementById("Ajout_cat"); 
         category = selectElmt.options[selectElmt.selectedIndex].value;  
         VerifChampSaisi("Catégorie", category)
      
       
        ///Création d'un objet FormData pour l'envoi de la requête

         formData = new FormData();
        formData.append("title", title);
        formData.append("category", parseInt(category));
        formData.append("image", file);
        console.log(formData)

        //Envoi des données à l'API
        AjoutWork(formData)

    }catch (erreur) {
        console.log(erreur)
        alert(erreur)
    }
})
}    

/////Fonction permettant l'ajout d'un nouveau projet
function AjoutWork(formData){
     ///Envoi du nouveau projet 
    let ReponseEnvoi = fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {"Authorization" : `Bearer ${ValeurToken}`},
        body: formData 
        })
        .then((ReponseEnvoi) => {
            ReponseEnvoi
            console.log(ReponseEnvoi.ok)
            if (ReponseEnvoi.ok) {
              
                console.log("Transmission réussie")   
                return ReponseEnvoi.json()
               
            }else{
                console.log("Echec de transmission du projet")
                throw new Error("Echec de transmission du projet");
               
            }
         })
        .then (data => {
         ///Ajout du nouveau projet dans la gallery de la page index
        const BaliseImg = document.createElement("img");
        BaliseImg.src=data.imageUrl;
        BaliseImg.alt=data.title;
        
        const BaliseFigure = document.createElement("figure");
        BaliseFigure.id=`figure${data.id}`;
        const BaliseFigc= document.createElement("figcaption");
        BaliseFigc.innerText=data.title;

        const gallery = document.querySelector(".gallery");
        gallery.appendChild(BaliseFigure);
        BaliseFigure.appendChild(BaliseImg);
        BaliseFigure.appendChild(BaliseFigc);

        ///Ajout du nouveau projet dans la gallery de la modale
        const ImgIcone = document.createElement("div");
        ImgIcone.className = `cont_img${data.id}`;
        const BaliseImgM = document.createElement("img");
        BaliseImgM.src=data.imageUrl;
        BaliseImgM.alt=data.title;
        BaliseImgM.className="ImageModale";
        Icone_lien = document.createElement("a");
        Icone_lien.href="#";
        Icone_lien.id=data.id;
        Icone_lien.className="lien_suppr";
        Icone_suppr=document.createElement("i");
        Icone_suppr.className= "fa-solid fa-trash-can"
        Icone_suppr.id =data.id;
        const Mgallery = document.querySelector(".Mgallery");
        Mgallery.appendChild(ImgIcone);
        ImgIcone.appendChild(BaliseImgM);
        ImgIcone.appendChild(Icone_lien);        
        Icone_lien.appendChild(Icone_suppr);
        //Réinitialisaion du formulaire
        document.querySelector('.FormAjout').reset();
        document.getElementById("hide_insert_img").style.display="flex";
        document.getElementById("selection_img").style.display="none";

        document.getElementById(data.id).addEventListener("click", () => {
            fetchDelete(data.id)
          });
          alert("Ajout du projet réussi")

    })  
    .catch(alert);                          
    }

///////Fonction permettant de fermer la modale
function closeModal(e){ 
    if (modal === null) return
    e.preventDefault()
   
    ///Remise en forme de la modale 1 avant fermeture
    const Mgallery = document.querySelector(".Mgallery");
    Mgallery.style.display="flex"
    const BtnReturn2 = document.querySelector(".js-modal-return")
    BtnReturn2.style.display="none";
    const BtnAjout = document.querySelector(".btn_modal")
    BtnAjout.style.display="block";
    const barreHR = document.querySelector(".barre_modal1")
    barreHR.style.display="block";
        ////Réinitialisation du formulaire 
        
    const FormAjout2 = document.querySelector(".FormAjout")
    FormAjout2.reset()
    document.getElementById("hide_insert_img").style.display="flex";
    document.getElementById("selection_img").style.display="none";
    FormAjout2.style.display="none";



    modal.style.display="none" 
    modal.setAttribute('aria-hidden','true');
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    
    modal=null
}

////Fonction principale  ////// ChargementDonnees() //// Page_admin() ////openModal
function LancementSite(ValeurToken) {
   
    console.log(ValeurToken)
    ChargementDonnees()
   
    if (ValeurToken!==null) {
        Page_admin()
        let modal = null
        document.querySelectorAll(".js-modal").forEach(a=>{
        a.addEventListener("click",openModal)
       
        })
    }
}



