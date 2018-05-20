//traquenard.js
//Philippe Doyon && Jérémie Lapointe
//Fichier js Principale

var objCanvas = null;
var objgl = null;
var objProgShaders = null;
var objScene3D = null;
var objCycleAnimation = null;
var tabImage = null;
var objJoueur = null;
var tableauDedale = [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3],
    [3, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3],
    [3, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 3],
    [3, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 3, 1, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 4, 4, 3, 1, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 3],
    [3, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 1, 4, 4, 4, 3, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 4, 4, 3, 1, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 3],
    [3, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 3, 1, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 3],
    [3, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3],
    [3, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 3],
    [3, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
];

//constante texture
var TEX_TRANSPARENT = 0;
var TEX_SOL = 1;
var TEX_MUR = 2;
var TEX_CIEL = 3;

//Direction
const Nord = 0;
const Est = 1;
const Sud = 2;
const Ouest = 3;


function demarreChargeImage(Canvas) {
    chargeImage(['Transparent.gif', 'Sol.jpg', 'Mur.jpg', 'Ciel.jpg'], initAnimation);
    objCanvas = Canvas;

}

function initAnimation(tabDesImage) {
    tabImage = tabDesImage;
    objgl = initWebGL(objCanvas);  // Initialise le contexte WebGL
    objProgShaders = initShaders(objgl);
    objScene3D = initScene3D(objgl); // Créer la scène

    dessiner(objgl, objProgShaders, objScene3D);
    animer();
}

function initScene3D(objgl) {
    var objScene3D = new Object();
    var tabObjets3D = new Array();

    // Mettre les textures dans la scène
    objScene3D.textures = creerTextures(objgl, tabImage);

    // Créer le plancher
    var obj3DPlancher = creerObj3DPlat(objgl, 31, 31, TEX_SOL, false);
    tabObjets3D.push(obj3DPlancher);

    //Créer le plancher pour l'enclos
    var obj3DPlancherEnclos = creerObj3DPlat(objgl, 3, 3, TEX_MUR, false);
    tabObjets3D.push(obj3DPlancherEnclos);

    // Créer le plafond
    var obj3DPlafond = creerObj3DPlat(objgl, 31, 31, TEX_CIEL, true);
    tabObjets3D.push(obj3DPlafond);

    //Créer les murs
    var x;
    var intDimensionX = tableauDedale.length;
    for (x = 0; x < intDimensionX; x++) {
        var z;
        var intDimensionZ = tableauDedale[x].length;
        for (z = 0; z < intDimensionZ; z++) {
            var intTypeElement = tableauDedale[x][z];
            if (intTypeElement == 2) {
                var obj3DMur = creerObj3DMurs(objgl, x, z, TEX_SOL);
                tabObjets3D.push(obj3DMur);
            }
            else if (intTypeElement == 3) {
                var obj3DMur = creerObj3DMurs(objgl, x, z, TEX_MUR);
                tabObjets3D.push(obj3DMur);
            }
        }
    }

    // Créer le trésor (maillage tempo et place défini tempo)
    var obj3DTresor = creerObj3DTresor(objgl, 22, 12, TEX_SOL, [0.8, 0.6, 0.1, 1]);
    tabObjets3D.push(obj3DTresor);

    //Ajouter une flèche ... tempo
    var obj3DFleche = creerObj3DFleches(objgl, 17,12, TEX_SOL);
    //var fltAngleY = getAngleY(obj3DFleche.transformations) + 180;
    //setAngleY(fltAngleY, obj3DFleche.transformations);

    setPositionX(17.5, obj3DFleche.transformations);
    //setPositionY(1, obj3DFleche.transformations);
    setPositionZ(12.5, obj3DFleche.transformations);
    
    tabObjets3D.push(obj3DFleche);

    //var fltAngleY = getAngleY(obj3DFleche.transformations) - initialiseFleche();
    //setAngleY(fltAngleY, obj3DFleche.transformations);

    var obj3DRecepteur = creerObj3DRecepteur(objgl, 16, 12, TEX_SOL);
    tabObjets3D.push(obj3DRecepteur);
    


    // Mettre les objets 3D sur la scène
    objScene3D.tabObjets3D = tabObjets3D;

    objJoueur = new Joueur(tableauDedale);

    // La caméra
    var camera = creerCamera();
    setPositionsCameraXYZ([15.5, 1, 16], camera);
    setCiblesCameraXYZ([15, 1, 15], camera);
    setOrientationsXYZ([0, 1, 0], camera);

    // Mettre la caméra sur la scène
    objScene3D.camera = camera;

    return objScene3D;
}

function animer() {
    // Un cycle d'animation	
    // Requête pour le prochain cycle
    objCycleAnimation = requestAnimationFrame(animer);

    // Le cycle d'animation
    effacerCanevas(objgl);
    //mettreAjourAnimation(objScene3D);
    dessiner(objgl, objProgShaders, objScene3D);
}

function mettreAjourAnimation(objScene3D) {

    var index = 0;
        var dimension = objScene3D.tabObjets3D.length;
        var booCollision = true;
        for (; (index < dimension) && booCollision; index++) {
            if (objScene3D.tabObjets3D[index].strType == "fleche") {
    var fltAngleY = getAngleY(objScene3D.tabObjets3D[index].transformations) + 0.01;
    var fltAngleX = getPositionX(objScene3D.tabObjets3D[index].transformations);
    console.log(fltAngleX);
    //setAngleY(fltAngleY, objScene3D.tabObjets3D[index].transformations);
    //setPositionX(fltAngleX, objScene3D.tabObjets3D[index].transformations);
            }
        }

        
}

function effacerCanevas(objgl) {
    // Met la couleur d'effacement au noir et complétement opaque
    objgl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Efface les couleurs et le buffer de profondeur.
    objgl.clear(objgl.COLOR_BUFFER_BIT | objgl.DEPTH_BUFFER_BIT);
}

function dessiner(objgl, objProgShaders, objScene3D) {
    // La vue
    objgl.viewport(0, 0, objgl.drawingBufferWidth, objgl.drawingBufferHeight);

    // Matrice de projection
    var matProjection = mat4.create();
    var fltRapportCanevas = objgl.drawingBufferWidth / objgl.drawingBufferHeight;
    mat4.perspective(45, fltRapportCanevas, 0.01, 100, matProjection);

    // Relier la matrice aux shaders
    objgl.uniformMatrix4fv(objProgShaders.matProjection, false, matProjection);

    var i;
    var intDimensionTab = objScene3D.tabObjets3D.length;
    for (i = 0; i < intDimensionTab; i++) {
        var vertex = objScene3D.tabObjets3D[i].vertex;
        var couleurs = objScene3D.tabObjets3D[i].couleurs;
        var texels = objScene3D.tabObjets3D[i].texels;
        var maillage = objScene3D.tabObjets3D[i].maillage;
        var transformations = objScene3D.tabObjets3D[i].transformations;

        // Matrice du modèle            
        var matModeleVue = mat4.create();
        mat4.identity(matModeleVue);

        // Placer la caméra sur la scène
        mat4.lookAt(getPositionsCameraXYZ(objScene3D.camera),
            getCiblesCameraXYZ(objScene3D.camera),
            getOrientationsXYZ(objScene3D.camera),
            matModeleVue);

        // Appliquer les transformations sur le modèle 
        mat4.translate(matModeleVue, getPositionsXYZ(transformations));
        mat4.scale(matModeleVue, getEchellesXYZ(transformations));
        mat4.rotateX(matModeleVue, getAngleX(transformations) * Math.PI / 180);
        mat4.rotateY(matModeleVue, getAngleY(transformations) * Math.PI / 180);
        mat4.rotateZ(matModeleVue, getAngleZ(transformations) * Math.PI / 180);

        // Relier la matrice aux shaders
        objgl.uniformMatrix4fv(objProgShaders.matModeleVue, false, matModeleVue);

        if (maillage == null) {
            // Dessiner les sous-objets
            var j;
            var intNbSousObjet = vertex.length;
            for (j = 0; j < intNbSousObjet; j++) {

                // Relier les vertex aux shaders
                objgl.bindBuffer(objgl.ARRAY_BUFFER, vertex[j]);
                objgl.vertexAttribPointer(objProgShaders.posVertex, 3, objgl.FLOAT, false, 0, 0);
                var intNbVertex = (objgl.getBufferParameter(objgl.ARRAY_BUFFER, objgl.BUFFER_SIZE) / 4) / 3;

                // Relier les couleurs aux shaders
                objgl.bindBuffer(objgl.ARRAY_BUFFER, couleurs[j]);
                objgl.vertexAttribPointer(objProgShaders.couleurVertex, 4, objgl.FLOAT, false, 0, 0);

                // Activer la texture
                objgl.activeTexture(objgl.TEXTURE0 + texels[j].intNoTexture);
                objgl.bindTexture(objgl.TEXTURE_2D, objScene3D.textures[texels[j].intNoTexture]);

                // Relier les texels aux shaders
                objgl.bindBuffer(objgl.ARRAY_BUFFER, texels[j]);
                objgl.vertexAttribPointer(objProgShaders.posTexel, 2, objgl.FLOAT, false, 0, 0);

                // Relier le no de texture et le taux de couleur aux shaders                 
                objgl.uniform1i(objProgShaders.noTexture, texels[j].intNoTexture);
                objgl.uniform1f(objProgShaders.pcCouleurTexel, texels[j].pcCouleurTexel);

                // Dessiner
                objgl.drawArrays(vertex[j].typeDessin, 0, intNbVertex);
            }
        }
        else { // Dessiner le maillage

            // Relier les vertex aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, vertex);
            objgl.vertexAttribPointer(objProgShaders.posVertex, 3, objgl.FLOAT, false, 0, 0);

            // Relier les couleurs aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, couleurs);
            objgl.vertexAttribPointer(objProgShaders.couleurVertex, 4, objgl.FLOAT, false, 0, 0)

            // Activer la texture
            objgl.activeTexture(objgl.TEXTURE0 + texels.intNoTexture);
            objgl.bindTexture(objgl.TEXTURE_2D, objScene3D.textures[texels.intNoTexture]);

            // Relier les texels aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, texels);
            objgl.vertexAttribPointer(objProgShaders.posTexel, 2, objgl.FLOAT, false, 0, 0);

            // Relier le no de texture et le taux de couleur aux shaders                 
            objgl.uniform1i(objProgShaders.noTexture, texels.intNoTexture);
            objgl.uniform1f(objProgShaders.pcCouleurTexel, texels.pcCouleurTexel);

            // Sélectionner le maillage qu'on va utiliser pour les triangles et les droites
            objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, maillage);

            // Dessiner les triangles
            objgl.drawElements(objgl.TRIANGLES, maillage.intNbTriangles * 3, objgl.UNSIGNED_SHORT, 0);
            // Dessiner les droites à la suite des triangles
            objgl.drawElements(objgl.LINES, maillage.intNbDroites * 2, objgl.UNSIGNED_SHORT, maillage.intNbTriangles * 2 * 3);
        }
    }
}

function deplacerCamera(eventCode) {
    var camera = objScene3D.camera;


    if (eventCode == 32) {
        tempoTenteOuvrirMur();

    }
    else if (eventCode == 37 || eventCode == 39) {
        // 37:  Flèche-à-gauche; 39:Flèche-à-droite
        var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
        var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
        var intDirection = (eventCode == 37) ? -1 : 1;
        var fltAngle = intDirection * Math.PI / 45; // 90 -> 2 degrés
        var fltXPrime = fltX * Math.cos(fltAngle) - fltZ * Math.sin(fltAngle);
        var fltZPrime = fltX * Math.sin(fltAngle) + fltZ * Math.cos(fltAngle);
        setCibleCameraX(getPositionCameraX(camera) + fltXPrime, camera);
        setCibleCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
    }
    else if (eventCode == 38 || eventCode == 40) {
        // 38:  Flèche-en-haut; 40:Flèche-en-bas
        var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
        var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
        var fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
        var intDirection = (eventCode == 38) ? 1 : -1;

        var fltXPrime = intDirection * 0.2 * Math.cos(Math.acos(fltX / fltRayon));
        var fltZPrime = intDirection * 0.2 * Math.sin(Math.asin(fltZ / fltRayon));

        //Permet de laisser une distance entre le mur et le joueur
        var fltXPrimeBonus = intDirection * 0.3 * Math.cos(Math.acos(fltX / fltRayon));
        var fltZPrimeBonus = intDirection * 0.3 * Math.cos(Math.acos(fltZ / fltRayon));

        // Positions de la caméra
        var fltXCamera = getPositionX(camera) + fltXPrime;
        var fltZCamera = getPositionZ(camera) + fltZPrime;

        // Limites du mur
        
        //var fltLimiteNord = objJoueur.limiteDeplacementJoueur(Nord) + 0.1;
        var fltLimiteEst = objJoueur.limiteDeplacementJoueur(Est) - 0.1;
        //var fltLimiteSud = objJoueur.limiteDeplacementJoueur(Sud) - 0.1;
        var fltLimiteOuest = objJoueur.limiteDeplacementJoueur(Ouest) + 0.1;

        var objCamFutur = new Object();
        objCamFutur.x = getPositionX(camera) + fltXPrimeBonus;
        objCamFutur.y = getPositionY(camera); 
        objCamFutur.z = getPositionZ(camera) + fltZPrimeBonus;

        var binAucuneCollision = objJoueur.aucuneCollision(objScene3D.tabObjets3D,objCamFutur);

        if (binAucuneCollision) {
            setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
            setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
            setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
            setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
        }
        else {
            if (fltXCamera <= fltLimiteOuest || fltXCamera >= fltLimiteEst) {
                // On longe le mur ouest ou est 
                fltZPrime = 0.2 * ((fltZ < 0) ? -1 : 1); fltXPrime = 0.0;
                fltZPrimeBonus = 0.3 * ((fltZ < 0) ? -1 : 1); fltXPrimeBonus = 0.0;
            }
            else { // On longe le mur sud ou nord
                fltXPrime = 0.2 * ((fltX < 0) ? -1 : 1); fltZPrime = 0.0;
                fltXPrimeBonus = 0.3 * ((fltZ < 0) ? -1 : 1); fltZPrimeBonus = 0.0;
            }

            // Nouvelles positions de la caméra
            fltXCamera = getPositionX(camera) + fltXPrime;
            fltZCamera = getPositionZ(camera) + fltZPrime;

            var objCamFutur = new Object();
            objCamFutur.x = getPositionX(camera) + fltXPrimeBonus;
            objCamFutur.y = getPositionY(camera); 
            objCamFutur.z = getPositionZ(camera) + fltZPrimeBonus;

            var binAucuneCollision = objJoueur.aucuneCollision(objScene3D.tabObjets3D,objCamFutur);
            // Longer le mur s'il ne rencontre pas un nouveau mur
            if (binAucuneCollision) {
                setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
                setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
                setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
                setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
            }
        }
    }
    objJoueur.majPosition(getPositionCameraX(camera), getPositionCameraZ(camera));

    deroulementNiveau();

    effacerCanevas(objgl);
    dessiner(objgl, objProgShaders, objScene3D);
}


