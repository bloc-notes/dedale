//Recepteur.js
//Philippe Doyon

function creerObj3DRecepteur(objgl, fltPositionX, fltPositionZ, intNoTexture) {
    var obj3DRecepteur = new Object();
    obj3DRecepteur.fltProfondeur = 1;
    obj3DRecepteur.fltLargeur = 1; 
    obj3DRecepteur.fltHauteur = 0.25;
    obj3DRecepteur.fltPositionX = fltPositionX;
    obj3DRecepteur.fltPositionZ = fltPositionZ;
    obj3DRecepteur.fltPositionY = 0.25;
    obj3DRecepteur.strType = "recepteur";
    obj3DRecepteur.intNoTexture = intNoTexture;

    obj3DRecepteur.vertex = creerVertexRecepteur(objgl, fltPositionX, fltPositionZ, obj3DRecepteur.fltPositionY);
    obj3DRecepteur.couleurs = creerCouleursRecepteur(objgl, [0,0,0.4,1]);
    obj3DRecepteur.texels = creerTexelsRecepteur(objgl, intNoTexture);
    obj3DRecepteur.maillage = creerMaillageRecepteur(objgl);

    obj3DRecepteur.transformations = creerTransformations();
    return obj3DRecepteur;
}

function creerVertexRecepteur(objgl, fltPositionX, fltPositionZ, fltPositionY) {
    var tabVertex = [
        0 + fltPositionX, 0, 1 + fltPositionZ,
        1 + fltPositionX, 0, 1 + fltPositionZ,
        1 + fltPositionX, 0, 0 + fltPositionZ,
        0 + fltPositionX, 0, 0 + fltPositionZ,

        0.25 + fltPositionX, fltPositionY, 0.75 + fltPositionZ,
        0.75 + fltPositionX, fltPositionY, 0.75 + fltPositionZ,
        0.75 + fltPositionX, fltPositionY, 0.25 + fltPositionZ,
        0.25 + fltPositionX, fltPositionY, 0.25 + fltPositionZ
    ];
    var objRecepteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objRecepteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objRecepteur;
}

function creerCouleursRecepteur(objgl, tabCouleur) {
    tabCouleurs = [];
    var i;
    for (i = 0; i < 8; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursRecepteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursRecepteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursRecepteur;
}

function creerTexelsRecepteur(objgl, intNoTexture) {
    var tabTexels = [  // Texels de la face avant
        0.0, 1.0, 
        1.0, 1.0,  
        1.0, 0.0,  
        0.0, 0.0,  

        0.0, 1.0,  
        1.0, 1.0,  
        1.0, 0.0,  
        0.0, 0.0,   
    ];

    var objTexelsRecepteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsRecepteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsRecepteur.intNoTexture = intNoTexture; objTexelsRecepteur.pcCouleurTexel = 0.5;

    return objTexelsRecepteur;
}

function creerMaillageRecepteur(objgl) {
    var tabMaillage =
        [ // Les 4 triangles de la face avant
            0, 4, 1,
            4, 1, 5,

            5, 2, 1,
            5, 2, 6,

            6, 3, 2,
            6, 3, 7,

            7, 0, 3,
            7, 0, 4,

            7, 6, 5,
            7, 4, 5
        ];

    var objMaillageRecepteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageRecepteur);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageRecepteur.intNbTriangles = 10;
    // Le nombre de droites
    objMaillageRecepteur.intNbDroites = 0;

    return objMaillageRecepteur;
}