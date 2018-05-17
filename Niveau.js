//Classe Niveau.js

class Niveau {
    constructor() {

    }

    deroulementNiveau() {

    }
}

var booSortieEnclos = false;

function deroulementNiveau() {
    if (!booSortieEnclos) {
        tempoFermeEnclos();
    }
    else {
        
    }
}


function tempoFermeEnclos() {
    if (objJoueur.fltPositionZ < 13) {
        objScene3D.tabObjets3D.push(creerObj3DMurs(objgl, 15, 13, TEX_MUR));
        booSortieEnclos = true;
    }
}

function tempoTenteOuvrirMur() {
    var booPeutOuvrir = false;

    if (objJoueur.intNbOuvreur > 0) {
        var camera = objScene3D.camera;
        var intDirection = objJoueur.directionRegard(getCibleCameraX(camera), getCibleCameraZ(camera));

        var objResultat = objJoueur.MurDevantDestructible(objScene3D.tabObjets3D);
        if (objResultat.booTrouver) {
            objScene3D.tabObjets3D.splice(objResultat.index,1);
            console.log("Pouff Magie!!");
        }
        else {
            console.log("Ne peut pas ouvrir de mur :(");
        }

    }


}