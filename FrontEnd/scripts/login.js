

const RequeteLogin =  async function(charge) {
   const chargeUtile = JSON.stringify(charge);
   const RetourLogin=  fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:charge,
         })
        
        const promise1 = Promise.resolve(RetourLogin);
        promise1.then(RetourLogin => {
        RetourLogin;
        console.log(RetourLogin.ok);
        
        if (RetourLogin.ok) {
            const ResultLogin =  RetourLogin.json();
            const promise2 = Promise.resolve(ResultLogin);
            promise2.then(ResultLogin => {
                ResultLogin;
            console.log(ResultLogin);
            localStorage.setItem("token", ResultLogin.token); 
            const ValeurToken = window.localStorage.getItem("token");
            console.log(ValeurToken);
            window.location.href="index.html"
        })
            } else {            
            alert("Erreur dans l'identifiant ou le mot de passe");                        
            } 
        })
    }

         
        

 const Authentification =   function() {
            const form = document.querySelector('.Fconnexion');
             form.addEventListener("submit", (event) => {
                event.preventDefault(); 
                    
                    const MDP = document.getElementById("mdp").value;
                    const Email = document.getElementById("email").value;            
                    if ((Email=='') || (MDP=='')) {
                        alert("Veuillez saisir tous les champs");
                    } else {                     
                        const identifiant = {  
                        email:Email,
                        password:MDP,
                        }
                        const chargeUtile = JSON.stringify(identifiant);
                        RequeteLogin(chargeUtile)
                        
                     };
                    
                })
            }         
            
Authentification () 
