//////////////////////// DECLARATION DES FONCTIONS ///////////////////////////////////////

///////////Fonction pour afficher tous les projets dans la section gallery
function Afficher(resultat){
    for (let i = 0; i < resultat.length; i++) {
        const BaliseFigure = document.createElement("figure");
        const BaliseImg = document.createElement("img");
        BaliseImg.src=resultat[i].imageUrl;
        BaliseImg.alt=resultat[i].title;
        const BaliseFigc= document.createElement("figcaption");
        BaliseFigc.innerText=resultat[i].title;
        const gallery = document.querySelector(".gallery");
        gallery.appendChild(BaliseFigure);
        BaliseFigure.appendChild(BaliseImg);
        BaliseFigure.appendChild(BaliseFigc);
    }
}

/////Fonction permettant de créer les boutons d'une barre de menu selon la liste des catégories*/
function  Filtrer(menu,works){
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
    ///Boucle permettant d'afficher les travaux de la catégorie dont le bouton a été cliqué*/
    const ChoixCat = document.querySelectorAll(".btn_filtre");
    for (let i = 0; i < ChoixCat.length; i++) {
        ChoixCat[i].addEventListener("click", async function () {
            if (ChoixCat[i].dataset.id==0) {
                document.querySelector(".gallery").innerHTML = "";
                Afficher(works);
            } else {
                const Works_filtres = works.filter(function(work) {
                return work.categoryId == ChoixCat[i].dataset.id;
                })
                document.querySelector(".gallery").innerHTML = "";
                Afficher(Works_filtres);
            }
        })
    };
}


////Récupération des projets
const RecupWorks = async function() {
    const ResultatWorks = await fetch('http://localhost:5678/api/works');
    const projets = await ResultatWorks.json();
    return projets;
}


////Récupération des catégories
const RecupCategories = async function() {
    const ResultatCat= await fetch('http://localhost:5678/api/categories');
    const Cat = await ResultatCat.json();
    return Cat;
}


/////////////////////////////Chargement de la page
const works=RecupWorks()
const promise1 = Promise.resolve(works);
promise1.then(works => {
    works;

  /*Appel de la fonction pour afficher tous les travaux à l'ouverture de la page*/
    Afficher(works);

    const categories=RecupCategories()
    const promise2 = Promise.resolve(categories);
    promise2.then(categories => {
        categories;

        /*Appel de la fonction permettant d'afficher la catégorie sélectionnée*/
        Filtrer(categories,works)
    });
  
});


/*
const ValeurToken = window.localStorage.getItem("token");
console.log(ValeurToken)

if (ValeurToken==="") {
   
} else {
    console.log ("Afficher la modale et le  logout")


   
    const BtnLogin = document.getElementById("id_login");
    BtnLogin.remove();
    const BtnLogout= document.createElement("imput");
    BtnLogout.Type="button";
    BtnLogout.innerText="logout";
    BtnLogout.id="Btn_deconnexion"
    const MenuLogout = document.getElementById("menu_connexion");
    MenuLogout.appendChild(BtnLogout);
   
    const Deconnexion = document.getElementById("Btn_deconnexion");
    Deconnexion.addEventListener("click", () => {
            window.localStorage.removeItem("token");
       
        });
         
}
*/