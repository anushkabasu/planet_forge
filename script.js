const sizeSlider = document.getElementById('size-slider');
const colorPicker = document.getElementById('color-picker');
const atmosphereToggle = document.getElementById('atmosphere-toggle');
const ringToggle = document.getElementById('ring-toggle');
const moonslider = document.getElementById('moon-slider');

const planet = document.getElementById('planet');
const ring = document.getElementById('ring');
const moons = [
  document.getElementById('moon-1'),
  document.getElementById('moon-2'),
  document.getElementById('moon-3')
]

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

function hexToRgba(hex, alpha) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = (num >> 16) & 0xFF;
  const g = (num >> 8) & 0xFF;
  const b = num & 0xFF;
  return 'rgba(${r}, ${g}, ${b}, ${alpha}';
}

function updatePlanetColor(hex) {
  const lightShade = shadeColor(hex, 25);
  const darkShade = shadeColor(hex, -35);
  const glowColor = hexToRgba(hex, 0.35);

  planet.style.setProperty('--planet-light', lightShade);
  planet.style.setProperty('--planet-mid', hex);
  planet.style.setProperty('--planet-dark', darkShade);
  planet.style.setProperty('--planet-glow', glowColor)
}

function updatePlanetSize(size) {
  planet.style.width = size + 'px';
  planet.style.height = size + 'px';

  updateRingSize(size);
  updateMoonPositions(size);
}

function updateAtmosphere(isEnabled) {
  planet.classList.toggle('atmosphere-on', inEnabled);
}

function updateRingSize(planetSize) {
  const ringWidth = planetSize * 1.8;
  const ringHeight = planetSize * 0.5;

  ring.style.width = ringWidth + 'px';
  ring.style.height = ringHeight + 'px';
}

function updateRingVisibility(isEnabled) {
  ring.classList.toggle('active', isEnabled);
}

function updateMoonPositions(planetSize) {
  const angles = [300, 60, 180];
  const distance = planetSize / 2 + 35;
  const center = 320 / 2;

  moons.forEach((moon, index) => {
    const angleInRadians = (angles[index] * Math.PI) / 180;
    const x = center + distance * Math.cos(angleInRadians) - 9;
    const y = center + distance * Math.sin(angleInRadians) - 9;

    moon.style.left = x + 'px';
    moon.style.top = y + 'px';
  });
}

function updateMoonCount(count) {
  moons.forEach((moon, index) => {
    moon.classList.toggle('active', index < count);
  });
}

sizeSlider.addEventListener('input', () => {
  updatePlanetSize(sizeSlider.value);
});

colorPicker.addEventListener('input', () => {
  updatePlanetColor(colorPicker.value);
});

atmosphereToggle.addEventListener('change', () => {
  updateAtmosphere(atmosphereToggle.checked);
});

ringToggle.addEventListener('change', () => {
  updateRingVisibility(ringToggle.checked);
});

moonSlider.addEventListener('input', () => {
  updateMoonCount(Number(moonSlider.value));
});

updatePlanetSize(sizeSlider.value);
updatePlanetColor(colorPicker.value);
updateAtmosphere(atmosphereToggle.checked);
updateRingVisibility(ringToggle.checked);
updateMoonCount(Number(moonSlider.value))