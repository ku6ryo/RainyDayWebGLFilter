precision mediump float;

uniform sampler2D uImage;
uniform float random;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec4 c = texture2D(uImage, vUv);
  float brightness = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
  vec4 monochrome = vec4(brightness, brightness, brightness, 1.0);

  float dx = 1.0 / uResolution.x; 
  float dy = 1.0 / uResolution.y;
  vec4 c0 = texture2D(uImage, vUv + vec2(-dx, -dy));
  vec4 c8 = texture2D(uImage, vUv + vec2(dx, dy));
  vec4 c2 = texture2D(uImage, vUv + vec2(dx, -dy));
  vec4 c6 = texture2D(uImage, vUv + vec2(-dx, dy));
  vec4 x = c8 - c0;
  vec4 y = c6 - c2;
  float r = sqrt(dot(x, y) + dot(y, y));

  float mag = 1.;
  if (random > 0.9) {
    mag = 1. + pow(2., random);
  }
  vec4 highlight = random * r * vec4(0.8314, 0.702, 1.0, 1.0) * 3.;
  float intensity = mag * brightness;
  gl_FragColor = vec4(max(mix(monochrome.rgb * intensity, c.rgb, 0.), highlight.rgb), 1.0);
}