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

function initialiseNiveau() {
     //trésor
     // Créer le trésor (maillage tempo et place défini tempo)
    var obj3DTresor = creerObj3DTresor(objgl, 22, 12, TEX_SOL, [0.8, 0.6, 0.1, 1]);
    objScene3D.tabObjets3D.push(obj3DTresor);

    //Flèche
    //Une pour l'instant
    //Ajouter une flèche ... tempo
    var obj3DFleche = creerObj3DFleches(objgl, 16,12, TEX_SOL);

    setPositionX(20.5, obj3DFleche.transformations);
    setPositionZ(12.5, obj3DFleche.transformations);
    
    objScene3D.tabObjets3D.push(obj3DFleche);

    var fltAngleY = getAngleY(obj3DFleche.transformations) - initialiseFleche(20.5,12.5,22.5,12.5);
    setAngleY(fltAngleY, obj3DFleche.transformations);


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

//Depart -> flèche Direction -> Trésor (Exemple)
function initialiseFleche(xDepart, zDepart, xDirection, zDirection) {
    //var xDepart = 16.5;
    //var zDepart = 12.5;

    //var xDirection = 16.5;
    //var zDirection = 5;

    //Valeur de retour
    var fltAngleExterieurDeg = 0; 

    if ((zDirection <= zDepart) && (xDirection > xDepart)) {
        console.log('cas 1');
        var xPointRec = xDirection;
        var zPointRec = zDepart;

        var fltDroiteOppose = xPointRec - xDepart;
        var fltDroiteAdjacent = zPointRec - zDirection;

        var fltAngleInterieurRad = Math.atan2(fltDroiteAdjacent, fltDroiteOppose);
        var fltAngleInterieurDeg = (fltAngleInterieurRad * 180 / Math.PI);
        fltAngleExterieurDeg = 180 - fltAngleInterieurDeg;
    }
    else if ((zDirection > zDepart) && (xDirection >= xDepart)) {
        console.log('cas 2');
        var xPointRec = xDepart;
        var zPointRec = zDirection;

        var fltDroiteOppose =  xDirection - xPointRec;;
        var fltDroiteAdjacent = zPointRec - zDepart;

        var fltAngleInterieurRad = Math.atan2(fltDroiteAdjacent, fltDroiteOppose);
        var fltAngleInterieurDeg = (fltAngleInterieurRad * 180 / Math.PI);
        fltAngleExterieurDeg = 180 + fltAngleInterieurDeg;
        
    }
    else if ((xDirection < xDepart) && (zDirection >= zDepart)) {
        console.log('cas 3');
        var xPointRec = xDirection;
        var zPointRec = zDepart;

        var fltDroiteOppose =  xDepart - xPointRec;
        var fltDroiteAdjacent = zDirection - zPointRec;

        var fltAngleInterieurRad = Math.atan2(fltDroiteAdjacent, fltDroiteOppose);
        var fltAngleInterieurDeg = (fltAngleInterieurRad * 180 / Math.PI);
        fltAngleExterieurDeg = -fltAngleInterieurDeg;
    }
    else if ((xDirection <= xDepart) && (zDirection < zDepart)) {
        console.log('cas 4');
        var xPointRec = xDepart;
        var zPointRec = zDirection;

        var fltDroiteOppose = xPointRec - xDirection;
        var fltDroiteAdjacent = zDepart - zPointRec;

        var fltAngleInterieurRad = Math.atan2(fltDroiteAdjacent, fltDroiteOppose);
        var fltAngleInterieurDeg = (fltAngleInterieurRad * 180 / Math.PI);
        fltAngleExterieurDeg = fltAngleInterieurDeg;
    }

    return fltAngleExterieurDeg;
}