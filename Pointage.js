//Classe Pointage.js
//Philippe Doyon && Jérémie Lapointe

//peut etre renommer pour niveau et inclure plus de chose ...
class Pointage {
    constructor() {
        this.intNbPoint = 300;
        this.intNiveau = 1;
        this.fltTemps = 0;
        this.fltDureeNiveau = 60; //Variable pour le professeur s'il souhaite modifier le temps des niveaux
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
}