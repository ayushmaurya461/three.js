varying vec2 vUv;

const float PI = 3.1415926535897932384626433832795;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 80.233))) *
        43758.5453123);
}

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

void main() {

    // float strength = vUv.x; // 3

    // float strength = vUv.x; // 4 

    // float strength = 1.0 - vUv.y; // 5

    // float strength = mod(vUv.y * 10.0, 1.0); //

    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(.8, strength);

    // float barX = step(.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(.8, mod(vUv.y * 10.0 + .2, 1.0));
    // float barY = step(.8, mod(vUv.x * 10.0 + .2, 1.0));
    // barY *= step(.4, mod(vUv.y * 10.0, 1.0));
    // float strength = barX + barY;

    // float strength = min(abs(vUv.x - .5), abs(vUv.y - .5));

    // float strength = max(abs(vUv.x - .5), abs(vUv.y - .5));

    // float strength = max(abs(vUv.x - .5), abs(vUv.y - .5));
    // strength = step(.4, strength);

    // float strength = min(abs(vUv.x - .5), abs(vUv.y - .5));
    // strength = step(.2, strength);

    // float x = floor(vUv.x * 10.0) / 10.0;
    // float y= floor(vUv.y * 10.0) / 10.0;
    // float strength = x * y;
    // float strength = step(.4, abs(x - y));

    // float strength = random(vUv);

    // vec2 grid = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
    // float strength = random(grid);

    // vec2 grid = vec2(floor(vUv.x * 10.0) / 10.0, floor((vUv.y  + vUv.x * .5)* 10.0) / 10.0);
    // float strength = random(grid);

    // float strength = length(vUv );

    // float strength = 1.0 - length(vUv - vec2(0.5, 0.5));

    // float strength = 0.01 / distance(vUv, vec2(0.5, 0.5)) * 2.0;

    // vec2 light = vec2(vUv.x * .2 + .4, vUv.y);
    // float strength = 0.015 / distance(light, vec2(0.5, 0.5)) * 2.0;

    // vec2 lightUvX = vec2(vUv.x * .2 + .4, vUv.y);
    // float lightX = 0.015 / distance(lightUvX, vec2(0.5));
    // vec2 lightUvY = vec2(vUv.y * .2 + .4, vUv.x);
    // float lightY = 0.015 / distance(lightUvY, vec2(0.5));
    // float strength = lightX * lightY;

    // vec2 lightUvX = vec2(vUv.x * .2 + .4, vUv.y);
    // lightUvX = rotate(lightUvX, 0.05);
    // float lightX = 0.015 / distance(lightUvX, vec2(0.5));
    // vec2 lightUvY = vec2(vUv.y * .2 + .4, vUv.x);
    // lightUvY = rotate(lightUvY, 0.05);
    // float lightY = 0.015 / distance(lightUvY, vec2(0.5));
    // float strength = lightX * lightY;

    // float strength = step(.3, distance(vUv, vec2(0.5, 0.5)));

    // float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // vec2 waveUv = vec2(vUv.x, vUv.y + sin(vUv.x * 30.0) * 0.1);
    // float strength = 1.0 - step(0.01, abs(distance(waveUv, vec2(0.5)) - 0.25));

    // vec2 waveUv = vec2(vUv.x + sin(vUv.y * 30.0) * 0.1, vUv.y + sin(vUv.x * 30.0) * 0.1);
    // float strength = 1.0 - step(0.01, abs(distance(waveUv, vec2(0.5)) - 0.25));

    // vec2 waveUv = vec2(vUv.x + sin(vUv.y * 100.0) * 0.1, vUv.y + sin(vUv.x * 100.0) * 0.1);
    // float strength = 1.0 - step(0.01, abs(distance(waveUv, vec2(0.5)) - 0.25));

    // float angle = atan(vUv.x , vUv.y );
    // float strength = angle;

    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5; 
    // float strength = angle;

    float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    angle /= PI * 2.0;
    angle += 0.5;
    angle *= 20.0;
    angle = mod(angle + 0.5, 1.0);
    float strength = sin(angle * 10.0);

    gl_FragColor = vec4(vec3(strength), 1.0);
}
