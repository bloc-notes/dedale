//Tresor.js
//Philippe Doyon && Jérémie Lapointe

function creerObj3DTresor(objgl, fltPositionX, fltPositionZ, intNoTexture, couleurTempo) {
    var obj3DTresor = new Object();

    obj3DTresor.vertex = creerVertexTresor(objgl, fltPositionX, fltPositionZ);
    obj3DTresor.couleurs = creerCouleursTresor(objgl, couleurTempo);
    obj3DTresor.texels = creerTexelsTresor(objgl, intNoTexture);
    obj3DTresor.maillage = creerMaillageTresor(objgl);

    obj3DTresor.transformations = creerTransformations();
    return obj3DTresor;
}

function creerVertexTresor(objgl, fltPositionX, fltPositionZ) {
    var tabVertex = [
        // Face avant (Z=0.2)
        0.5 + fltPositionX, 0.5, 0.2 + fltPositionZ,   // 0: Centre
        0.8 + fltPositionX, 1.0, 0.2 + fltPositionZ,   // 1: Coin haut droit
        0.8 + fltPositionX, 0.0, 0.2 + fltPositionZ,  // 2: Coin bas droit
        0.2 + fltPositionX, 0.0, 0.2 + fltPositionZ,  // 3: Coin bas gauche
        0.2 + fltPositionX, 1.0, 0.2 + fltPositionZ,  // 4: Coin haut gauche 

        // Face arrière (Z=0.8) 
        0.5 + fltPositionX, 0.5, 0.8 + fltPositionZ,   // 5: Centre
        0.8 + fltPositionX, 1.0, 0.8 + fltPositionZ,   // 1: Coin haut droit
        0.8 + fltPositionX, 0.0, 0.8 + fltPositionZ,  // 2: Coin bas droit
        0.2 + fltPositionX, 0.0, 0.8 + fltPositionZ,  // 3: Coin bas gauche
        0.2 + fltPositionX, 1.0, 0.8 + fltPositionZ,  // 9: Coin haut gauche

        //Centre Z=0.5
        0.8 + fltPositionX, 0.5, 0.5 + fltPositionZ, //10: centre droit
        0.2 + fltPositionX, 0.5, 0.5 + fltPositionZ, //11: centre gauche
        0.5 + fltPositionX, 1.0, 0.5 + fltPositionZ //12: centre haut
    ];
    var objTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objTresor;
}

function creerCouleursTresor(objgl, tabCouleur) {
    tabCouleurs = [];
    var i;
    for (i = 0; i < 13; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursTresor;
}

function creerTexelsTresor(objgl, intNoTexture) {
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

    var objTexelsTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsTresor.intNoTexture = intNoTexture; objTexelsTresor.pcCouleurTexel = 0;

    return objTexelsTresor;
}

function creerMaillageTresor(objgl) {
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

    var objMaillageTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTresor);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageTresor.intNbTriangles = 20;
    // Le nombre de droites
    objMaillageTresor.intNbDroites = 0;

    return objMaillageTresor;
}