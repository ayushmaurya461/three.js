precision lowp float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;

void main() {
    // gl_FragColor = vec4(1.0, vRandom, 0.0, 0.69);
    vec4 textureColor = texture2D(uTexture,vUv);
    // gl_FragColor = vec4(uColor, 1.0);
    textureColor.rgb *= vElevation * 2.0 + .8;
    gl_FragColor = textureColor;
}