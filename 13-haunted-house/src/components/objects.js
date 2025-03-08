import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

function loadTreeModel() {
  return new Promise((resolve, reject) => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(
      "low_poly_tree/Lowpoly_tree_sample.mtl",
      (materials) => {
        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
          "low_poly_tree/Lowpoly_tree_sample.obj",
          (object) => {
            if (object instanceof THREE.Object3D) {
              resolve(object); // Ensure it is a valid 3D object
            } else {
              reject(new Error("Loaded object is not a valid THREE.Object3D"));
            }
          },
          undefined,
          (error) => reject(error)
        );
      },
      undefined,
      (error) => reject(error)
    );
  });
}

function loadPoleLight() {
  return new Promise((resolve, reject) => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(
      "LightPole/LightPole.mtl",
      (materials) => {
        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
          "LightPole/LightPole.obj",
          (object) => {
            if (object instanceof THREE.Object3D) {
              resolve(object); // Ensure it is a valid 3D object
            } else {
              reject(new Error("Loaded object is not a valid THREE.Object3D"));
            }
          },
          undefined,
          (error) => reject(error)
        );
      },
      undefined,
      (error) => reject(error)
    );
  });
}

export default { loadTreeModel, loadPoleLight };
