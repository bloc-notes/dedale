// Fleche.js
//Philippe Doyon

function creerObj3DFleches(objgl, fltPositionX, fltPositionZ, intNoTexture) {
    var obj3DFleches = new Object();
    obj3DFleches.fltProfondeur = 0.1;
    obj3DFleches.fltLargeur = 0.6; 
    obj3DFleches.fltHauteur = 1.5;
    obj3DFleches.fltPositionX = fltPositionX;
    obj3DFleches.fltPositionZ = fltPositionZ;
    obj3DFleches.fltPositionY = 1;
    obj3DFleches.strType = "fleche";
    obj3DFleches.intNoTexture = intNoTexture;

    obj3DFleches.vertex = creerVertexFleches(objgl, fltPositionX, fltPositionZ);
    obj3DFleches.couleurs = creerCouleursFleches(objgl, [0.5,0,0.5,1]);
    obj3DFleches.texels = creerTexelsFleches(objgl, intNoTexture);
    obj3DFleches.maillage = creerMaillageFleches(objgl);

    obj3DFleches.transformations = creerTransformations();
    return obj3DFleches;
}

function creerVertexFleches(objgl, fltPositionX, fltPositionZ) {
    var tabVertex = [
        // Face avant (Z=0)
        /*
        0.8 + fltPositionX, 1.8, 0.45 + fltPositionZ,   // 1: Coin haut droit
        0.8 + fltPositionX, 1.2, 0.45 + fltPositionZ,  // 2: Coin bas droit
        0.2 + fltPositionX, 1.5, 0.45 + fltPositionZ,  // 3: Coin haut gauche 

        // Face arrière (Z=0.8) 
        0.8 + fltPositionX, 1.8, 0.55 + fltPositionZ,   // 5: Coin haut droit
        0.8 + fltPositionX, 1.2, 0.55 + fltPositionZ,  // 6: Coin bas droit
        0.2 + fltPositionX, 1.5, 0.55 + fltPositionZ,  // 7: Coin haut gauche
        */
        0.3 , 1.8, -0.05,   // 1: Coin haut droit
        0.3 , 1.2, -0.05,  // 2: Coin bas droit
        -0.3, 1.5, -0.05,  // 3: Coin haut gauche 

        // Face arrière (Z=0.8) 
        0.3, 1.8, 0.05,   // 5: Coin haut droit
        0.3, 1.2, 0.05,  // 6: Coin bas droit
        -0.3, 1.5, 0.05,  // 7: Coin haut gauche

    ];
    var objFleches = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objFleches);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objFleches;
}

function creerCouleursFleches(objgl, tabCouleur) {
    tabCouleurs = [];
    var i;
    for (i = 0; i < 6; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursFleches = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursFleches);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursFleches;
}

function creerTexelsFleches(objgl, intNoTexture) {
    var tabTexels = [  // Texels de la face avant
        1.0, 0.0,  // 1: Coin haut droit
        1.0, 1.0,  // 2: Coin bas droit
        0.0, 0.0,  // 4: Coin haut gauche

        // Texels de la face arrière
        0.0, 0.0,   // 6: Coin haut droit
        0.0, 1.0,   // 7: Coin bas droit
        1.0, 0.0,    // 9: Coin haut gauche
    ];

    var objTexelsFleches = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsFleches);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsFleches.intNoTexture = intNoTexture; objTexelsFleches.pcCouleurTexel = 0;

    return objTexelsFleches;
}

function creerMaillageFleches(objgl) {
    var tabMaillage =
        [ // Les 4 triangles de la face avant

            0, 1, 2,

            0, 3, 4,
            0, 1, 4,

            0, 3, 5,
            0, 2, 5,

            1, 2, 5,
            1, 4, 5,

            3, 4, 5
        ];

    var objMaillageFleches = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageFleches);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageFleches.intNbTriangles = 8;
    // Le nombre de droites
    objMaillageFleches.intNbDroites = 0;

    return objMaillageFleches;
}