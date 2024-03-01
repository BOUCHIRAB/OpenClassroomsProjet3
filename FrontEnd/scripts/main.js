//////////////FONCTION PRINCIPALE, POINT D'ENTREE PERMETTANT DE LANCER LE CHARGEMENT DES DONNEES ET LA GESTION DES PROJETS//////////////


///Récupération du la valeur du token 
ValeurToken=window.localStorage.getItem("token");  
console.log(ValeurToken)

////Chargement des donnée et adaptation des fonctionnalité en fonction de la valeur du token
LancementSite(ValeurToken)


