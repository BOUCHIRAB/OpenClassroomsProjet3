//////////////FONCTION PRINCIPALE, POINT D'ENTREE PERMETTANT DE LANCER LE CHARGEMENT DES DONNEES ET LA GESTION DES PROJETS//////////////


///Récupération du la valeur du token 
let tokenValue = window.localStorage.getItem("token"); 

////Chargement des donnée et adaptation des fonctionnalité en fonction de la valeur du token
websiteLaunch(tokenValue);


