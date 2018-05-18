// Fleche.js
//Philippe Doyon

function creerObj3DFleches(objgl, fltPositionX, fltPositionZ, intNoTexture) {
    var obj3DFleches = new Object();
    obj3DFleches.fltProfondeur = 0.5;
    obj3DFleches.fltLargeur = 1; 
    obj3DFleches.fltHauteur = 0.5;
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
        //0.5 + fltPositionX, 1.5, 0.2 + fltPositionZ,   // 0: Centre
        0.8 + fltPositionX, 1.8, 0.2 + fltPositionZ,   // 1: Coin haut droit
        0.8 + fltPositionX, 1.2, 0.2 + fltPositionZ,  // 2: Coin bas droit
        //0.2 + fltPositionX, 1.4, 0.2 + fltPositionZ,  // 3: Coin bas gauche
        0.2 + fltPositionX, 1.5, 0.2 + fltPositionZ,  // 3: Coin haut gauche 

        // Face arrière (Z=0.8) 
        //0.5 + fltPositionX, 1.5, 0.8 + fltPositionZ,   // 4: Centre
        0.8 + fltPositionX, 1.8, 0.8 + fltPositionZ,   // 5: Coin haut droit
        0.8 + fltPositionX, 1.2, 0.8 + fltPositionZ,  // 6: Coin bas droit
        //0.2 + fltPositionX, 1.4, 0.8 + fltPositionZ,  // 3: Coin bas gauche
        0.2 + fltPositionX, 1.5, 0.8 + fltPositionZ,  // 7: Coin haut gauche

        //Centre Z=0.5
        //0.8 + fltPositionX, 1.5, 0.5 + fltPositionZ, //8: centre droit
        //0.2 + fltPositionX, 1.5, 0.5 + fltPositionZ, //9: centre gauche
        //0.5 + fltPositionX, 1.8, 0.5 + fltPositionZ //10: centre haut
    ];
    var objFleches = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objFleches);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objFleches;
}

function creerCouleursFleches(objgl, tabCouleur) {
    tabCouleurs = [];
    var i;
    for (i = 0; i < 13; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursFleches = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursFleches);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursFleches;
}

function creerTexelsFleches(objgl, intNoTexture) {
    var tabTexels = [  // Texels de la face avant
        //0.5, 0.5,  // 0: Centre
        1.0, 0.0,  // 1: Coin haut droit
        1.0, 1.0,  // 2: Coin bas droit
        //0.0, 1.0,  // 3: Coin bas gauche
        0.0, 0.0,  // 4: Coin haut gauche

        // Texels de la face arrière
        //0.5, 0.5,   // 5: Centre
        0.0, 0.0,   // 6: Coin haut droit
        0.0, 1.0,   // 7: Coin bas droit
        //1.0, 1.0,   // 8: Coin bas gauche
        1.0, 0.0,    // 9: Coin haut gauche

        //0.5, 0.5, //10
        //0.5, 0.5, //11
        //0.5, 0.5 //12
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
            /*
            0, 1, 2,
            0, 2, 3,
            0, 3, 4,
            0, 4, 1,
            // Les 4 triangles de la face arrière
            5, 6, 7,
            5, 7, 8,
            5, 8, 9,
            5, 9, 6,

            10, 1, 6,
            10, 6, 7,
            10, 7, 2,
            10, 2, 1,

            11, 4, 3,
            11, 3, 8,
            11, 8, 9,
            11, 9, 4,

            12, 6, 1,
            12, 1, 4,
            12, 4, 9,
            12, 9, 6*/

            0, 1, 2,
            3, 4, 5,
            
        ];

    var objMaillageFleches = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageFleches);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageFleches.intNbTriangles = 20;
    // Le nombre de droites
    objMaillageFleches.intNbDroites = 0;

    return objMaillageFleches;
}