//https://webglfundamentals.org/webgl/lessons/webgl-2-textures.html
//Philippe Doyon 26-04-2018
//Pour executer chrome sans regle cors: chrome --allow-file-access-from-files

function chargeImage(tabCheminImage) {
    chargeTousLesImages(tabCheminImage,initAnimationImgCharger);
}

function chargeTousLesImages(tabCheminImage, rappel) {
    var tabImage = new Array();
    var intNbImageTraite = tabCheminImage.length;

    var imageEstCharge = function() {
        intNbImageTraite--;

        if (intNbImageTraite == 0) {
            rappel(tabImage);
        }
    };

    var x;
    for (x = 0; x < intNbImageTraite; x++) {
        var objImage = creerImage(tabCheminImage[x], imageEstCharge);
        tabImage.push(objImage);
    }
}

function creerImage(chemin, rappel) {
    var objImage = new Image();
    objImage.src = chemin;
    objImage.onload = rappel;
    return objImage;
}