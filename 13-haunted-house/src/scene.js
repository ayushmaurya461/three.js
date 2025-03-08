import { Fog, PointLightHelper, Scene } from "three";
import house from "./components/house";
import lights from "./components/lights";
import camera from "./camera";
import floor from "./components/floor";
import objects from "./components/objects";
import ghosts from "./components/ghosts";
import gui from "./controls";

const scene = new Scene();
scene.add(
  house,
  lights.ambientLight,
  lights.moonLight,
  camera,
  floor,
  ...ghosts
);

const treePositions = [
  [6, 0, -8],
  [-8, 0, 8],
];

const lightPositions = [
  [9, 1.4, 8],
  [9, 1.4, 6],
  [9, 1.4, 4],
  [9, 1.4, 2],
  [9, 1.4, 0],
  [9, 1.4, -2],
  [9, 1.4, -4],
  [9, 1.4, -6],
  [-9, 1.4, 6],
  [-9, 1.4, 4],
  [-9, 1.4, 2],
  [-9, 1.4, 0],
  [-9, 1.4, -2],
];

const pointLightFolder = gui.addFolder("Point Light");

objects
  .loadPoleLight()
  .then((p) => {
    const lightsArray = []; // Array to store the lights
    for (let i = 0; i < lightPositions.length; i++) {
      const pole = p.clone();
      const light = lights.pointLight.clone();
      pole.scale.set(0.15, 0.15, 0.15);
      pole.position.set(...lightPositions[i]);
      if (i > 7) {
        light.position.set(-8.3, 3, 6 - i*2  + 15.3);
        pole.rotation.y = -Math.PI * 0.25;

      } else {
        light.position.set(8.3, 3, 8 - i * 2 + -0.7);
        pole.rotation.y = Math.PI * 0.25;
      }
      const helper  = new PointLightHelper(light,.2)
      lightsArray.push(light); // Add the light to the array

    //   pointLightFolder.add(light, "visible").name(`Light ${i + 1}`); 
      scene.add(pole, light);
    }

    // Toggle function
    const toggleLights = () => {
      const firstLightVisible = lightsArray[0].visible; // Get the state of the first light
      lightsArray.forEach((light) => {
        light.visible = !firstLightVisible; // Toggle visibility
      });
    };

    // Add a button to the GUI
    const toggleButton = { toggle: toggleLights };
    pointLightFolder.add(toggleButton, "toggle").name("Toggle All Lights");
  })
  .catch((err) => console.log(err));

objects
  .loadTreeModel()
  .then((t) => {
    treePositions.forEach((pos) => {
      const treeClone = t.clone();
      treeClone.scale.set(0.15, 0.15, 0.15);
      treeClone.position.set(...pos);
      treeClone.rotation.y = Math.PI * Math.random() * 10;
      scene.add(treeClone);
      console.log(treeClone);
    });
  })
  .catch((err) => console.log(err));

const fogg = new Fog("#08001A", 2, 40);

scene.fog = fogg;

export default scene;
