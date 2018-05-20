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

function initialiseFleche() {
    var xFleche = 15;
    var zFleche = 11;

    var xTresor = 22;
    var zTresor = 10;

    //console.log()
    if (zTresor < zFleche) {
        var xPointRec = xTresor;
        var zPointRec = zFleche;

        var fltDroiteOppose = xPointRec - xFleche;
        var fltDroiteAdjacent = zPointRec - zTresor;

        var fltTanDeg = fltDroiteOppose / fltDroiteAdjacent;
        console.log(fltTanDeg);
        //var fltTanRad = (fltTanDeg * Math.PI / 180);
        var fltAngleInterieurRad = Math.tanh(fltTanDeg);
        var fltAngleInterieurDeg = (fltAngleInterieurRad * 180 / Math.PI);
        var fltAngleExterieurDeg = 180 - fltAngleInterieurDeg;
        console.log(fltAngleExterieurDeg);
        return fltAngleExterieurDeg;
    }
    else if (zTresor > zFleche) {
        var xPointRec = xTresor;
        var zPointRec = zFleche;

        var fltDroiteOppose = xFleche - xPointRec;
        var fltDroiteAdjacent = zTresor - zPointRec;

        var fltTanDeg = fltDroiteOppose / fltDroiteAdjacent;
        var fltAngleInterieurRad = Math.tanh(fltTanDeg);
        var fltAngleInterieurDeg = (fltAngleInterieurRad * 180 / Math.PI);
        var fltAngleExterieurDeg = fltAngleInterieurDeg;
        return fltAngleExterieurDeg;
        
    }
    else if (xTresor> xFleche) {
        //Est
        //this.intDirection = 1;
    }
    else if (xTresor < xFleche) {
        //Ouest
        //this.intDirection = 3;
    }
}