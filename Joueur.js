//Classe Joueur.js
//Jérémie Lapointe && Philippe Doyon

class Joueur {
    constructor(tabDedale) {
        this.fltPositionX = 1.5// tempo, ca va etre 16
        this.fltPositionZ = 1.5; // tempo, ca va etre 16
        this.intNbOuvreur = 0;
        this.tabCarte = tabDedale;
    }

    //Retourne le x ou le z de la limite du mur (selon la direction)
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

    aucuneCollision(tabObjet3D, objCibleCam) {
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

                booCollision = !((objCibleCam.x >= objMinX && objCibleCam.x <= objMaxX) &&
                    (objCibleCam.y >= objMinY && objCibleCam.y <= objMaxY) &&
                    (objCibleCam.z >= objMinZ && objCibleCam.z <= objMaxZ));
            }
        }
        console.log('Resultat: ' + booCollision);
        return booCollision;
    }

    majPosition(intX, intZ) {
        this.fltPositionX = intX;
        this.fltPositionZ = intZ;
    }
}