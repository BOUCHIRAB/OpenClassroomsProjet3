function VerifChampSaisi(nom, valeur) {
    if (valeur==="") {
        console.log(`Veuillez préciser le champ : " ${nom}"`)
        throw new Error(`Veuillez préciser le champ : "${nom}"`)
        }
    }
    
///Vérification du format de mail saisie
function ValiderEmail(chaine) {
    let regexMail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (regexMail.test(chaine)===false) {
        ;
        throw new Error("Format de l'adresse mail invalide")
    }
   }

function MessageErreur (Msg) {
    const saisie =document.querySelector(".saisie")
    const Label=document.querySelector("label");

    const MsgError=document.createElement("div");
    MsgError.innerHTML=Msg
    MsgError.className="Msg_erreur"
    saisie.insertBefore(MsgError, Label)
}

function Authentification () {
    const form = document.querySelector('.Fconnexion');
    form.addEventListener("submit", (event) => {
    event.preventDefault();        
    let Msg =document.querySelector(".Msg_erreur")
    if (Msg!==null) {
    document.querySelector(".Msg_erreur").remove()    
    }   
    try {
        let MDP = document.getElementById("mdp").value;
        let Email = document.getElementById("email_login").value;       
        
        VerifChampSaisi("E-mail", Email) 
        VerifChampSaisi("Mot de passe", MDP)
        ValiderEmail(Email)
        
        const identifiant = {  
                email:Email,
                password:MDP,
            }
        const LoginMDP = JSON.stringify(identifiant);
        console.log(LoginMDP)
        
        /*Identifiants = new FormData();
        Identifiants.append("email", Email);
        Identifiants.append("password", MDP);*/
        
        RequeteLogin(LoginMDP)
    }catch (erreur) {       
            console.log(erreur)
           /* alert(erreur)*/
            MessageErreur(erreur)
           
    }
    })
}
 
Authentification () 

function RequeteLogin(charge) {
    
    const RetourLogin=  fetch("http://localhost:5678/api/users/login", {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body:charge,
          })
         
        .then(response => {
            response;
         console.log(response);
         console.log(response.ok);
         if (response.ok) {
           
             let ResultLogin =  response.json();
                let promise2 = Promise.resolve(ResultLogin);
                promise2.then(ResultLogin => {
                ResultLogin;
                console.log(ResultLogin);
                 localStorage.setItem("token", ResultLogin.token);          
            
                 window.location.href="index.html"
                })
        } else {            
           
            console.log("Echec de l'authentification")
            alert("Echec de l'authentification");        
            document.querySelector('.Fconnexion').reset()   
           
             } 
         })
     }
 