
function creerObj3DPlat(objgl, intNoTexture, couleurTempo, booSolCiel) {
    var obj3DPlat = new Object();
    obj3DPlat.fltProfondeur = 31;
    obj3DPlat.fltLargeur = 31;
    obj3DPlat.fltHauteur = booSolCiel ? 2.05 : 0;
    
    obj3DPlat.vertex = creerVertexPlat(objgl, obj3DPlat.fltLargeur, obj3DPlat.fltProfondeur, obj3DPlat.fltHauteur);
    obj3DPlat.couleurs = creerCouleursPlat(objgl, couleurTempo);
	obj3DPlat.texels = creerTexelsPlat(objgl, obj3DPlat.fltLargeur, obj3DPlat.fltProfondeur, intNoTexture);
	obj3DPlat.maillage = creerMaillagePlat(objgl);
	
    obj3DPlat.transformations = creerTransformations();

    return obj3DPlat;
}

function creerVertexPlat(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    var tabVertex = [
             0, fltHauteur, 0,
             fltLargeur , fltHauteur, 0,
             0, fltHauteur, fltProfondeur,
             fltLargeur, fltHauteur, fltProfondeur
        ];
    
    var objPlat = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objPlat);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objPlat;
}

function creerCouleursPlat(objgl, tabCouleur) {
    tabCouleurs = []; 
    for (var i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursPlat = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursPlat);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);
 
	return objCouleursPlat;
}

function creerTexelsPlat(objgl, fltLargeur, fltProfondeur, intNoTexture) {
     var tabTexels = [
             0.0, 0.0,
             fltLargeur, 0.0,
             0.0, fltProfondeur,
             fltLargeur, fltProfondeur
        ];
    
    var objTexelsPlat = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsPlat);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsPlat.intNoTexture = intNoTexture; objTexelsPlat.pcCouleurTexel = 1;
    
    return objTexelsPlat;
  }

function creerMaillagePlat(objgl) {

       var tabMaillage =
            [ // Les 2 triangles du Plat
             0, 1, 2,
             1, 2, 3,
            ];

	    var objMaillagePlat = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillagePlat);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillagePlat.intNbTriangles = 2;
        // Le nombre de droites
        objMaillagePlat.intNbDroites = 0;
		
        return objMaillagePlat;
    }
  
  
