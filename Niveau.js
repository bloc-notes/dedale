//Classe Niveau.js

class Niveau {
    constructor(intNiveau) {
        this.intNiveau = intNiveau;
        this.booSortieEnclos = false;
        this.objPositionTresor = new Object();
        this.tabObj3DNiveau = new Array();
        this.intNbOuvreur = Math.floor(((10 - this.intNiveau) / 2));

        //Trésor
        let objPosition = this.positionDisponible();

        this.objPositionTresor.xPosition = objPosition.x;
        this.objPositionTresor.zPosition = objPosition.z;

        console.log('XTresor: ' + this.objPositionTresor.xPosition);
        console.log('ZTresor: ' + this.objPositionTresor.zPosition);

        var obj3DTresor = creerObj3DTresor(objgl, this.objPositionTresor.xPosition, this.objPositionTresor.zPosition, TEX_SOL, [0.8, 0.6, 0.1, 1]);
        this.tabObj3DNiveau.push(obj3DTresor);
        objScene3D.tabObjets3D.push(obj3DTresor);

        //Transporteur
        this.intNbTransporteur = Math.floor(this.intNiveau / 2);

        //let intIndex = 0;


        //var obj3DTransporteur = creerObj3DTransporteur(objgl, 16, 10, TEX_SOL);
        //tabObjets3D.push(obj3DTransporteur);
        
        //Flèche
        this.intNbFleche = ((10 - this.intNiveau) * 2);
        
        let index = 0;
        for (; index < this.intNbFleche; index++) {
            var xPositionFleche = 0;
            var zPositionFleche = 0;

            let objPos = this.positionDisponible();
            xPositionFleche = objPos.x;
            zPositionFleche = objPos.z;

            var obj3DFleche = creerObj3DFleches(objgl, xPositionFleche, zPositionFleche, TEX_SOL);

            setPositionsXYZ([(xPositionFleche + 0.5),1.7,(zPositionFleche + 0.5)], obj3DFleche.transformations);

            this.tabObj3DNiveau.push(obj3DFleche);
            console.log(objScene3D.tabObjets3D.length);
            objScene3D.tabObjets3D.push(obj3DFleche);

            var fltAngleY = getAngleY(obj3DFleche.transformations) - initialiseFleche((xPositionFleche + 0.5),(zPositionFleche + 0.5), (this.objPositionTresor.xPosition + 0.5),(this.objPositionTresor.zPosition + 0.5));
            setAngleY(fltAngleY, obj3DFleche.transformations);

        }
        
        //Récepteur
        this.intNbRecepteur = (this.intNiveau - 1);

    }

    deroulementNiveau() {
        if (!this.booSortieEnclos) {
            tempoFermeEnclos();
        }
        else {
            if (objJoueur.estSur(this.objPositionTresor.xPosition, this.objPositionTresor.zPosition)) {
                console.log('Trésor trouvé');
            }
        }
    }

    positionDisponible() {
        var xTempo = 0;
        var zTempo = 0;
        var booPositionValide = false;

        while(!booPositionValide) {
            xTempo = Math.floor(Math.random() * 30) + 1;
            zTempo = Math.floor(Math.random() * 30) + 1;

            var index = 0;
            var dimension = objScene3D.tabObjets3D.length;
            var booTrouver = false;
            for (; (index < dimension) && !booTrouver; index++) {
                var obj3D = objScene3D.tabObjets3D[index];
                if (!((obj3D.strType == "plat") && (obj3D.intNoTexture != 2))) {
                    if (obj3D.fltPositionX == xTempo && obj3D.fltPositionZ == zTempo) {
                        booTrouver = true;
                    }
                }   
            }

            booPositionValide = booTrouver ? false : true;
        }
        console.log('Xtresor dedans: ' + xTempo);
        console.log('ZTresor dedans: ' + zTempo);
        var objPos = new Object();
        objPos.x = xTempo;
        objPos.z = zTempo;
        return objPos;
    }
}

var booSortieEnclos = false;
var objPositionTresor = new Object();

function deroulementNiveau() {
    if (!booSortieEnclos) {
        tempoFermeEnclos();
    }
    else {
        if (objJoueur.estSur(objPositionTresor.xPosition, objPositionTresor.zPosition)) {
            console.log('Trésor trouvé');
        }
    }
}

function initialiseNiveau() {
    /*
     //trésor
     // Créer le trésor (maillage tempo et place défini tempo)
    var obj3DTresor = creerObj3DTresor(objgl, 22, 12, TEX_SOL, [0.8, 0.6, 0.1, 1]);
    objScene3D.tabObjets3D.push(obj3DTresor);
    objPositionTresor.xPosition = 22;
    objPositionTresor.zPosition = 12;

    //Flèche
    //Une pour l'instant
    //Ajouter une flèche ... tempo
    var obj3DFleche = creerObj3DFleches(objgl, 16,12, TEX_SOL);

    setPositionsXYZ([20.5,1.7,12.5], obj3DFleche.transformations);
    
    objScene3D.tabObjets3D.push(obj3DFleche);

    var fltAngleY = getAngleY(obj3DFleche.transformations) - initialiseFleche(20.5,12.5,22.5,12.5);
    setAngleY(fltAngleY, obj3DFleche.transformations);*/

    //Vue Aérienne
    objVueAerienne = new VueAerienne();

    var obj3DFlecheAe = creerObj3DFleches(objgl, 16,12, TEX_SOL);
    obj3DFlecheAe.booVisible = false;

    var fltAngleX = getAngleX(obj3DFlecheAe.transformations) + 90;
    setAngleX(fltAngleX, obj3DFlecheAe.transformations);

    setPositionsXYZ([getPositionCameraX(objScene3D.camera), 1.8 ,getPositionCameraZ(objScene3D.camera)], obj3DFlecheAe.transformations);
    
    objScene3D.tabObjets3D.unshift(obj3DFlecheAe);

    var fltAngleY = getAngleZ(obj3DFlecheAe.transformations) + initialiseFleche(getPositionCameraY(objScene3D.camera), getPositionCameraZ(objScene3D.camera),getCibleCameraY(objScene3D.camera), getCibleCameraZ(objScene3D.camera));
    setAngleZ(fltAngleY, obj3DFlecheAe.transformations);

    


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