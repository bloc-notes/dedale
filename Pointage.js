//Classe Pointage.js
//Philippe Doyon

//peut etre renommer pour niveau et inclure plus de chose ...
class Pointage {
    constructor() {
        this.intNbPoint = 300;
        this.intNiveau = 1;
        this.fltTempsDepart = null;
        this.fltTemps = 0;
        this.fltDureeNiveau = 60; //Variable pour le professeur s'il souhaite modifier le temps des niveaux
        this.intNbOuvreur = 0;
    }

    tresorTrouver() {
        this.intNbPoint += (10 * this.fltTemps);
    }

    recommenceNiveau() {
        this.intNbPoint -= 200;
    }

    ouvreMur() {
        this.intNbPoint -= 50;
    }

    metAJourTemps() {
        if (this.fltTempsDepart != null) {
            //Temps
            var objDateheureMaintenant = new Date();
            var intMsEcoulees = objDateheureMaintenant - this.fltTempsDepart;
            
            this.fltTemps = Math.round((intMsEcoulees / 1000));
        }
    }
}