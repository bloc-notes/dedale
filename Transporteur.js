//Transporteur.js
//Philippe Doyon

function creerObj3DTransporteur(objgl, fltPositionX, fltPositionZ, intNoTexture) {
    var obj3DTransporteur = new Object();
    obj3DTransporteur.fltProfondeur = 1;
    obj3DTransporteur.fltLargeur = 1; 
    obj3DTransporteur.fltHauteur = 2;
    obj3DTransporteur.fltPositionX = fltPositionX;
    obj3DTransporteur.fltPositionZ = fltPositionZ;
    obj3DTransporteur.fltPositionY = 0;
    obj3DTransporteur.strType = "transporteur";
    obj3DTransporteur.intNoTexture = intNoTexture;
    obj3DTransporteur.booVisible = true;

    obj3DTransporteur.vertex = creerVertexTransporteur(objgl, fltPositionX, fltPositionZ, obj3DTransporteur.fltHauteur);
    obj3DTransporteur.couleurs = creerCouleursTransporteur(objgl, [0.52,0.52,0.52,1]);
    //obj3DTransporteur.couleurs = creerCouleursTransporteur(objgl, [0,0,0,0]);
    obj3DTransporteur.texels = creerTexelsTransporteur(objgl, intNoTexture);
    obj3DTransporteur.maillage = creerMaillageTransporteur(objgl);

    obj3DTransporteur.transformations = creerTransformations();
    return obj3DTransporteur;
}

function creerVertexTransporteur(objgl, fltPositionX, fltPositionZ, fltHauteur) {
    var tabVertex = [
        //Devant extérieur
        0 + fltPositionX, fltHauteur, 0 + fltPositionZ,
        0.5 + fltPositionX, fltHauteur, 0 + fltPositionZ,
        1 + fltPositionX, fltHauteur, 0 + fltPositionZ,
        
        1 + fltPositionX, fltHauteur / 2, 0 + fltPositionZ,

        1 + fltPositionX, 0, 0 + fltPositionZ,
        0.5 + fltPositionX, 0, 0 + fltPositionZ,
        0 + fltPositionX, 0, 0 + fltPositionZ,

        0 + fltPositionX, fltHauteur / 2, 0 + fltPositionZ,

        //Devant intérieur
        0.1 + fltPositionX, 9 * (fltHauteur / 10), 0 + fltPositionZ,
        0.9 + fltPositionX, 9 * (fltHauteur / 10), 0 + fltPositionZ,
        0.9 + fltPositionX, 1 * (fltHauteur / 10), 0 + fltPositionZ,
        0.1 + fltPositionX, 1 * (fltHauteur / 10), 0 + fltPositionZ,

        //Derrière extérieur
        0 + fltPositionX, fltHauteur, 1 + fltPositionZ,
        0.5 + fltPositionX, fltHauteur, 1 + fltPositionZ,
        1 + fltPositionX, fltHauteur, 1 + fltPositionZ,
        
        1 + fltPositionX, fltHauteur / 2, 1 + fltPositionZ,

        1 + fltPositionX, 0, 1 + fltPositionZ,
        0.5 + fltPositionX, 0, 1 + fltPositionZ,
        0 + fltPositionX, 0, 1 + fltPositionZ,

        0 + fltPositionX, fltHauteur / 2, 1 + fltPositionZ,

        //Derrière intérieur
        0.1 + fltPositionX, 9 * (fltHauteur / 10), 1 + fltPositionZ,
        0.9 + fltPositionX, 9 * (fltHauteur / 10), 1 + fltPositionZ,
        0.9 + fltPositionX, 1 * (fltHauteur / 10), 1 + fltPositionZ,
        0.1 + fltPositionX, 1 * (fltHauteur / 10), 1 + fltPositionZ

    ];
    var objTransporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTransporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objTransporteur;
}

function creerCouleursTransporteur(objgl, tabCouleur) {
    tabCouleurs = [];
    var i;
    for (i = 0; i < 24; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursTransporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTransporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursTransporteur;
}

function creerTexelsTransporteur(objgl, intNoTexture) {
    var tabTexels = [  // Texels de la face avant
       0.0, 0.0,
       0.5, 0.0,
       1.0, 0.0,
       1.0, 0.5,
       1.0, 1.0,
       0.5, 1.0,
       0.0, 1.0,
       0.0, 0.5,
       0.1, 0.1,
       0.9, 0,1,
       0.9, 0.9,
       0.1, 0.9,
       
       0.0, 0.0,
       0.5, 0.0,
       1.0, 0.0,
       1.0, 0.5,
       1.0, 1.0,
       0.5, 1.0,
       0.0, 1.0,
       0.0, 0.5,
       0.1, 0.1,
       0.9, 0,1,
       0.9, 0.9,
       0.1, 0.9
    ];

    var objTexelsTransporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTransporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsTransporteur.intNoTexture = intNoTexture; objTexelsTransporteur.pcCouleurTexel = 0.1;

    return objTexelsTransporteur;
}

function creerMaillageTransporteur(objgl) {
    var tabMaillage =
        [ 
            //Devant
            0, 8, 1,
            1, 8, 9,
            9, 1, 2,

            2, 9, 3,
            9, 3, 10,
            3, 10, 4,

            4, 10, 5,
            10, 5, 11,
            5, 11, 6,

            6, 11, 7,
            11, 7, 8,
            7, 8, 0,

            //Derrière
            12, 20, 13,
            20, 13, 21,
            13, 21, 14,

            14, 21, 15,
            21, 15, 22,
            15, 22, 16,

            16, 22, 17,
            22, 17, 23,
            17, 23, 18,

            18, 23, 19,
            23, 19, 20,
            19, 20, 12,

            //Intérieur
            8, 20, 21,
            8, 9, 21,

            9, 21, 22,
            9, 10, 22,

            11, 23, 22,
            11, 10, 22,

            8, 20, 23,
            8, 11, 23    
        ];

    var objMaillageTransporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTransporteur);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageTransporteur.intNbTriangles = 32;
    // Le nombre de droites
    objMaillageTransporteur.intNbDroites = 0;

    return objMaillageTransporteur;
}