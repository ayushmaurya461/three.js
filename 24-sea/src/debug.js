// gui-controls.js
import * as dat from "dat.gui";

export default function createGUI(material, debugObject) {
  const gui = new dat.GUI();

  gui
    .add(material.uniforms.uWaveElevation, "value", -1, 1, 0.01)
    .name("Wave Elevation");
  gui
    .add(material.uniforms.uWaveFrequency.value, "x", 0, 10, 0.01)
    .name("Wave Frequency X");
  gui
    .add(material.uniforms.uWaveFrequency.value, "y", 0, 10, 0.01)
    .name("Wave Frequency Y");
  gui.add(material.uniforms.uSpeed, "value", 0, 2, 0.01).name("Wave Speed");

  gui.addColor(debugObject, "depthColor").onChange(() => {
    material.uniforms.uDepthColor.value.set(debugObject.depthColor);
  });

  gui.addColor(debugObject, "surfaceColor").onChange(() => {
    material.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor);
  });

  gui
    .add(material.uniforms.uColorOffset, "value", 0, 1, 0.01)
    .name("Color Offset");

  gui
    .add(material.uniforms.uColorMultiplier, "value", 0, 10, 0.01)
    .name("Color Multiplier");

  gui
    .add(material.uniforms.uSmallWaveElevation, "value", 0, 1, 0.01)
    .name("Small Wave Elevation");

  gui
    .add(material.uniforms.uSmallWaveFrequency, "value", 0, 10, 0.01)
    .name("Small Wave Frequency");

  gui
    .add(material.uniforms.uSmallWaveSpeed, "value", 0, 1, 0.01)
    .name("Small Wave Speed");

  gui
    .add(material.uniforms.uSmallWaveIteration, "value", 1, 10, 1)
    .name("Small Wave Iteration");

  return gui;
}
