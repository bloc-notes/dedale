//Murs.js
//Philippe Doyon
//Adaptation du fichier du même nom d'Alain Loyer

function creerObj3DMurs(objgl, fltPositionX, fltPositionZ, intNoTexture) {
    var obj3DMurs = new Object();
    obj3DMurs.fltProfondeur = 1;
    obj3DMurs.fltLargeur = 1; 
    obj3DMurs.fltHauteur = 2;
    obj3DMurs.fltPositionX = fltPositionX;
    obj3DMurs.fltPositionZ = fltPositionZ;
    obj3DMurs.fltPositionY = 0;
    obj3DMurs.strType = "mur";
    obj3DMurs.intNoTexture = intNoTexture;

    obj3DMurs.vertex = creerVertexMurs(objgl, fltPositionX, fltPositionZ);
    obj3DMurs.couleurs = creerCouleursMurs(objgl, [0,0,0,1]);
    obj3DMurs.texels = creerTexelsMurs(objgl, intNoTexture);
    obj3DMurs.maillage = creerMaillageMurs(objgl);

    obj3DMurs.transformations = creerTransformations();
    return obj3DMurs;
}

function creerVertexMurs(objgl, fltPositionX, fltPositionZ) {
    var tabVertex = [
        // Face avant (Z=0)
        0.5 + fltPositionX, 1.0, 0 + fltPositionZ,   // 0: Centre
        1.0 + fltPositionX, 2.0, 0 + fltPositionZ,   // 1: Coin haut droit
        1.0 + fltPositionX, 0.0, 0 + fltPositionZ,  // 2: Coin bas droit
        0.0 + fltPositionX, 0.0, 0 + fltPositionZ,  // 3: Coin bas gauche
        0.0 + fltPositionX, 2.0, 0 + fltPositionZ,  // 4: Coin haut gauche 

        // Face arrière (Z=1) 
        0.5 + fltPositionX, 1.0, 1 + fltPositionZ,   // 5: Centre
        1.0 + fltPositionX, 2.0, 1 + fltPositionZ,   // 1: Coin haut droit
        1.0 + fltPositionX, 0.0, 1 + fltPositionZ,  // 2: Coin bas droit
        0.0 + fltPositionX, 0.0, 1 + fltPositionZ,  // 3: Coin bas gauche
        0.0 + fltPositionX, 2.0, 1 + fltPositionZ,  // 9: Coin haut gauche

        //Centre Z=0.5
        1.0 + fltPositionX, 1.0, 0.5 + fltPositionZ, //10: centre droit
        0.0 + fltPositionX, 1.0, 0.5 + fltPositionZ, //11: centre gauche
        0.5 + fltPositionX, 2.0, 0.5 + fltPositionZ //12: centre haut
    ];
    var objMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objMurs;
}

function creerCouleursMurs(objgl, tabCouleur) {
    tabCouleurs = [];
    var i;
    for (i = 0; i < 13; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursMurs;
}

function creerTexelsMurs(objgl, intNoTexture) {
    var tabTexels = [  // Texels de la face avant
        0.5, 0.5,  // 0: Centre
        1.0, 0.0,  // 1: Coin haut droit
        1.0, 1.0,  // 2: Coin bas droit
        0.0, 1.0,  // 3: Coin bas gauche
        0.0, 0.0,  // 4: Coin haut gauche

        // Texels de la face arrière
        0.5, 0.5,   // 5: Centre
        0.0, 0.0,   // 6: Coin haut droit
        0.0, 1.0,   // 7: Coin bas droit
        1.0, 1.0,   // 8: Coin bas gauche
        1.0, 0.0,    // 9: Coin haut gauche

        0.5, 0.5, //10
        0.5, 0.5, //11
        0.5, 0.5 //12
    ];

    var objTexelsMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsMurs.intNoTexture = intNoTexture; objTexelsMurs.pcCouleurTexel = 1;

    return objTexelsMurs;
}

function creerMaillageMurs(objgl) {
    var tabMaillage =
        [ // Les 4 triangles de la face avant
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
            12, 9, 6
        ];

    var objMaillageMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageMurs);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageMurs.intNbTriangles = 20;
    // Le nombre de droites
    objMaillageMurs.intNbDroites = 0;

    return objMaillageMurs;
}