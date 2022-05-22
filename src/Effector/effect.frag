precision mediump float;

uniform sampler2D uImage;
uniform float uRandom;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec3 c = texture2D(uImage, vUv).rgb;
  float brightness = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
  vec3 monochrome = vec3(brightness, brightness, brightness);

  float dx = 1.0 / uResolution.x * 1.5; 
  float dy = 1.0 / uResolution.y * 1.5;
  vec3 c0 = texture2D(uImage, vUv + vec2(-dx, -dy)).rgb;
  vec3 c8 = texture2D(uImage, vUv + vec2(dx, dy)).rgb;
  vec3 c2 = texture2D(uImage, vUv + vec2(dx, -dy)).rgb;
  vec3 c6 = texture2D(uImage, vUv + vec2(-dx, dy)).rgb;
  vec3 x = c8 - c0;
  vec3 y = c6 - c2;
  float r = sqrt(dot(x, x) + dot(y, y));

  float mag = 1.;
  float colorMix = 0.;
  if (uRandom > 0.9) {
    mag = 1. + pow(2., uRandom);
    colorMix = 0.5 + 0.3 * uRandom;
  }
  vec3 highlight = uRandom * r * vec3(0.8314, 0.702, 1.0) * 3.;
  gl_FragColor = vec4(max(mix(monochrome * mag, c, colorMix), highlight), 1.0);
}