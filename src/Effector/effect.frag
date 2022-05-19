precision mediump float;

uniform sampler2D uImage;
uniform float random;
uniform vec2 u_resolution;

varying vec2 vUv;

void main() {
  vec4 c = texture2D(uImage, vUv);

  float dx = 1.0 / u_resolution.x; 
  float dy = 1.0 / u_resolution.y;
  vec4 c0 = texture2D(uImage, vUv + vec2(-dx, -dy));
  vec4 c8 = texture2D(uImage, vUv + vec2(dx, dy));
  vec4 c2 = texture2D(uImage, vUv + vec2(dx, -dy));
  vec4 c6 = texture2D(uImage, vUv + vec2(-dx, dy));
  vec4 x = c8 - c0;
  vec4 y = c6 - c2;
  float r = sqrt(dot(x, y) + dot(y, y));
  float f = r * (1.0 - step(r, 0.1)) * 3.0;

  float mag = 1.;
  if (random > 0.8) {
    mag = 1. + 0.5;
  }
  float brintness = mag * c.r;
  float g = max(brintness, f * random);
  gl_FragColor = vec4(g, g, g, 1.);
}