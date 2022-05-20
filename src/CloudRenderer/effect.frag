precision mediump float;

uniform sampler2D uImage;
uniform float uRandom;
uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

void main() {
  float n0 = texture2D(uImage, fract(vUv - vec2(uTime / 10., 0.0))).r;
  float n1 = texture2D(uImage, fract(vUv + vec2(uTime / 10., 0.3))).r;

  float mag = 1.;
  if (uRandom > 0.9) {
    mag = 2. + pow(2., uRandom);
  }
  float intensity = mag * n0 * n1;
  float alpha = 0.;
  gl_FragColor = vec4(intensity, intensity, intensity, 0.);
}