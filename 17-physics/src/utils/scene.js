import THREE from "../three";
import objects from "./objects";
import lights from "./lights";

const scene = new THREE.Scene();

scene.add(...lights);
scene.add(objects.floor);

export default scene;