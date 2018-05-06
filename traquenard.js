//traquenard.js
//Philippe Doyon && Jérémie Lapointe
//Fichier js Principale

var objCanvas = null;
var objgl = null;
var objProgShaders = null;
var objScene3D = null;
var objCycleAnimation = null;
var tabImage = null;

function demarreChargeImage() {
    chargeImage(['Transparent.gif'], initAnimation);
}

function initAnimation(tabDesImage) {
    tabImage = tabDesImage;
    objCanvas = document.getElementById('monCanvas');
    objgl = initWebGL(objCanvas);  // Initialise le contexte WebGL
    objProgShaders = initShaders(objgl);
    objScene3D = initScene3D(objgl); // Créer la scène

    dessiner(objgl, objProgShaders, objScene3D);
    animer();
}

function animer() {
    // Un cycle d'animation	
    // Requête pour le prochain cycle
    objCycleAnimation = requestAnimationFrame(animer);

    // Le cycle d'animation
    effacerCanevas(objgl);
    mettreAjourAnimation(objScene3D);
    dessiner(objgl, objProgShaders, objScene3D);
}

function mettreAjourAnimation(objScene3D) {
    
}

function effacerCanevas(objgl) {
    // Met la couleur d'effacement au noir et complétement opaque
    objgl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Efface les couleurs et le buffer de profondeur.
    objgl.clear(objgl.COLOR_BUFFER_BIT | objgl.DEPTH_BUFFER_BIT);
}
