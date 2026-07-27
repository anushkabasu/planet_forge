const sizeSlider = document.getElementById('size-slider');
const colorPicker = document.getElementById('color-picker');
const planet = document.getElementById('planet');

function shadeColor(hex, percent) {
  let num = parseInt(hex.replace('#', ''), 16);
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00FF) + Math.round(255 * (percent / 100));
  let b = (num & 0x0000FF) + Math.round(255 * (percent / 100));

  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);

  return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
}

function updatePlanetColor(hex) {
  const lightShade = shadeColor(hex, 25);
  const darkShade = shadeColor(hex, -35);

  planet.style.setProperty('--planet-light', lightShade);
  planet.style.setProperty('--planet-mid', hex);
  planet.style.setProperty('--planet-dark', darkShade);
}

function updatePlanetSize(size) {
  planet.style.width = size + 'px';
  planet.style.height = size + 'px';
}

sizeSlider.addEventListener('input', () => {
  updatePlanetSize(sizeSlider.value);
});

colorPicker.addEventListener('input', () => {
  updatePlanetColor(colorPicker.value);
});

updatePlanetSize(sizeSlider.value);
updatePlanetColor(colorPicker.value);