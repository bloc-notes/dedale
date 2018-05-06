// Textures.js
function creerTextures(objgl, tabImages) {
	var tabObjTextures = new Array();
	for (var i = 0; i < tabImages.length; i++) {    
             
		// Cr�er La texture
        var objTexture = objgl.createTexture();
			             
		// La s�lectionner
		objgl.bindTexture(objgl.TEXTURE_2D, objTexture);

		// Ins�rer l'image � l'int�rieur de la texture
		objgl.texImage2D(objgl.TEXTURE_2D, 0, objgl.RGBA, objgl.RGBA,
                         objgl.UNSIGNED_BYTE, tabImages[i]);

		// La param�trer
		objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MAG_FILTER, objgl.LINEAR);
        objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MIN_FILTER, objgl.NEAREST_MIPMAP_NEAREST);
		objgl.generateMipmap(objgl.TEXTURE_2D);
        objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_S, objgl.REPEAT);
        objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_T, objgl.REPEAT);
		
		// Ins�rer cette texture dans un tableau de textures

        tabObjTextures.push(objTexture);
	}
    //console.log(tabObjTextures.length);
	return tabObjTextures;
}