//Classe Joueur.js
//Philippe Doyon

class Joueur {
    constructor(tabDedale) {
        this.fltPositionX = 1.5// tempo, ca va etre 16
        this.fltPositionZ = 1.5; // tempo, ca va etre 16
        this.tabCarte = tabDedale;
        this.intDirection = -1;
        this.booImmobile = false;
    }

    //Retourne le x ou le z de la limite du mur (selon la direction) ne prend âs en compte la direction (angle d'avancement)
    limiteDeplacementJoueur(intDirection) {
        var incX = 0;
        var incZ = 0;
        switch (intDirection) {
            //Nord
            case 0:
                incZ--;
                break;
            //Est
            case 1:
                incX++;
                break;
            //Sud
            case 2:
                incZ++;
                break;
            //Ouest
            case 3:
                incX--;
                break;
        }

        var x = Math.floor(this.fltPositionX);
        var z = Math.floor(this.fltPositionZ);

        do {
            x += incX;
            z += incZ;
        } while (this.tabCarte[x][z] == 1 || this.tabCarte[x][z] == 4);

        if (incX < 0 || incZ < 0) {
            x += -incX;
            z += -incZ;
        }
        return ((incX == 0) ? z : x);
    }

    aucuneCollision(tabObjet3D, objCamFutur) {
        var index = 0;
        var dimension = tabObjet3D.length;
        var booCollision = true;
        for (; (index < dimension) && booCollision; index++) {
            if (tabObjet3D[index].strType == "mur") {
                var objMinX = tabObjet3D[index].fltPositionX;
                var objMaxX = tabObjet3D[index].fltPositionX + tabObjet3D[index].fltLargeur;
                var objMinY = tabObjet3D[index].fltPositionY;
                var objMaxY = tabObjet3D[index].fltPositionY + tabObjet3D[index].fltHauteur;
                var objMinZ = tabObjet3D[index].fltPositionZ;
                var objMaxZ = tabObjet3D[index].fltPositionZ + tabObjet3D[index].fltProfondeur;

                booCollision = !((objCamFutur.x >= objMinX && objCamFutur.x <= objMaxX) &&
                    (objCamFutur.y >= objMinY && objCamFutur.y <= objMaxY) &&
                    (objCamFutur.z >= objMinZ && objCamFutur.z <= objMaxZ));
            }
        }
        return booCollision;
    }

    majPosition(intX, intZ) {
        this.fltPositionX = intX;
        this.fltPositionZ = intZ;
    }

    directionRegard(camX,camZ) {
        var XJoueur = Math.floor(this.fltPositionX);
        var ZJoueur = Math.floor(this.fltPositionZ);
        var XCamera = Math.floor(camX);
        var ZCamera = Math.floor(camZ);

        if (ZCamera < ZJoueur) {
            //Nord
            this.intDirection = 0;
        }
        else if (ZCamera > ZJoueur) {
            //Sud
            this.intDirection = 2;
        }
        else if (XCamera> XJoueur) {
            //Est
            this.intDirection = 1;
        }
        else if (XCamera < XJoueur) {
            //Ouest
            this.intDirection = 3;
        }
        return this.intDirection;
    }

    //retour en tuple de 2 (booléen,int)
    MurDevantDestructible(tabObjet3D) {
        var XJoueur = Math.floor(this.fltPositionX);
        var ZJoueur = Math.floor(this.fltPositionZ);
        
        var objPosition = this.deplacementAvecDirection();
        var incX = objPosition.X;
        var incZ = objPosition.Z;

        var xTempo = XJoueur;
        var zTempo = ZJoueur;
        
        xTempo += incX;
        zTempo += incZ;

        var index = 0;
        var dimension = tabObjet3D.length;
        var booTrouver = false;
        for (; (index < dimension) && !booTrouver; index++) {
            var obj3D = objScene3D.tabObjets3D[index];
            //Mur destructible a cette position, donc devant lui
            if (obj3D.strType == "mur" && obj3D.intNoTexture == 1) { //Tempo texure actuel
                if (obj3D.fltPositionX == xTempo && obj3D.fltPositionZ == zTempo) {
                    booTrouver = true;
                }
            }
        }

        var objRetour = new Object();
        objRetour.booTrouver = booTrouver;
        objRetour.index = (index - 1);
        return objRetour;
    }

    deplacementAvecDirection() {
        var incX = 0;
        var incZ = 0;

        switch (this.intDirection) {
            //Nord
            case 0:
                incZ--;
                break;
            //Est
            case 1:
                incX++;
                break;
            //Sud
            case 2:
                incZ++;
                break;
            //Ouest
            case 3:
                incX--;
                break;
        }

        var objPosition = new Object();
        objPosition.X = incX;
        objPosition.Z = incZ;

        return objPosition;
    }

    estSur(xObjet, zObjet) {
        return ((Math.floor(this.fltPositionX) == Math.floor(xObjet)) && (Math.floor(this.fltPositionZ) == Math.floor(zObjet)));
    }
}