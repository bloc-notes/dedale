//VueAerienne.js
//Philippe Doyon

class VueAerienne {
    constructor(){
        this.fltTempsActivation = 0;
        this.booVueActive = false;
        this.cameraDepart = creerCamera();
        
    }

    activeVueAerienne() {
        this.booVueActive = true;

        objScene3D.tabObjets3D[2].booVisible = false;

        var index = 0;
        var dimension = objScene3D.tabObjets3D.length;
        for (; index < dimension; index++) {
            var obj3D = objScene3D.tabObjets3D[index];
            //Mur destructible a cette position, donc devant lui
            if (obj3D.strType != "mur" && obj3D.strType != "plat") { //Tempo texure actuel
                obj3D.booVisible = false;
            }
        }
        setPositionsCameraXYZ(getPositionsCameraXYZ(objScene3D.camera), this.cameraDepart);
        setCiblesCameraXYZ(getCiblesCameraXYZ(objScene3D.camera), this.cameraDepart);
        setOrientationsXYZ(getOrientationsXYZ(objScene3D.camera), this.cameraDepart);

        setPositionsCameraXYZ([15.5, 45, 15.5], objScene3D.camera);
        setCiblesCameraXYZ([15.5, 0, 15.499999999999999], objScene3D.camera);

    }

    desactiveVueAerienne() {
        this.booVueActive = false;

        objScene3D.tabObjets3D[2].booVisible = true;

        var index = 0;
        var dimension = objScene3D.tabObjets3D.length;
        for (; index < dimension; index++) {
            var obj3D = objScene3D.tabObjets3D[index];
            //Mur destructible a cette position, donc devant lui
            if (obj3D.strType != "mur" && obj3D.strType != "plat") { //Tempo texure actuel
                obj3D.booVisible = true;
            }
        }

        setPositionsCameraXYZ(getPositionsCameraXYZ(this.cameraDepart), objScene3D.camera);
        setCiblesCameraXYZ(getCiblesCameraXYZ(this.cameraDepart), objScene3D.camera);
    }
}