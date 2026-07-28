const sizeSlider = document.getElementById('size-slider');
const colorPicker = document.getElementById('color-picker');
const atmosphereToggle = document.getElementById('atmosphere-toggle');
const ringToggle = document.getElementById('ring-toggle');
const moonSlider = document.getElementById('moon-slider');

const planet = document.getElementById('planet');
const ring = document.getElementById('ring');
const moons = [
  document.getElementById('moon-1'),
  document.getElementById('moon-2'),
  document.getElementById('moon-3')
];

const infoName = document.getElementById('info-name');
const infoType = document.getElementById('info-type');
const infoGravity = document.getElementById('info-gravity');
const infoTemperature = document.getElementById('info-temperature');
const infoAtmosphere = document.getElementById('info-atmosphere');
const infoHabitability = document.getElementById('info-habitability');

const cardName = document.getElementById('card-name');
const cardRarity = document.getElementById('card-rarity');
const cardType = document.getElementById('card-type');
const cardGravity = document.getElementById('card-gravity');
const cardTemperature = document.getElementById('card-temperature');
const cardAtmosphere = document.getElementById('card-atmosphere');
const cardHabitability = document.getElementById('card-habitability');
const cardMoons = document.getElementById('card-moons');
const cardDescription = document.getElementById('card-description');

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
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function updatePlanetColor(hex) {
  const lightShade = shadeColor(hex, 25);
  const darkShade = shadeColor(hex, -35);
  const glowColor = hexToRgba(hex, 0.35);

  planet.style.setProperty('--planet-light', lightShade);
  planet.style.setProperty('--planet-mid', hex);
  planet.style.setProperty('--planet-dark', darkShade);
  planet.style.setProperty('--planet-glow', glowColor);
}

function updatePlanetSize(size) {
  planet.style.width = size + 'px';
  planet.style.height = size + 'px';

  updateRingSize(size);
  updateMoonPositions(size);
}

function updateAtmosphere(isEnabled) {
  planet.classList.toggle('atmosphere-on', isEnabled);
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

function getHue(hex) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = ((num >> 16) & 0xFF) / 255;
  const g = ((num >> 8) & 0xFF) / 255;
  const b = (num & 0xFF) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta === 0) return 0;

  let hue;
  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;

  hue *= 60;
  if (hue < 0) hue += 360;

  return hue;
}

function generatePlanetName() {
  const words = ['Astera', 'Nyx', 'Helion', 'Vesper', 'Orion', 'Thalos', 'Kryos', 'Zeta', 'Auron', 'Lyra', 'Corvus', 'Draken', 'Ignis', 'Tessera'];
  const suffixes = ['Prime', 'Major', 'Minor', 'IX', 'VII', 'X', 'II'];

  const word = words[Math.floor(Math.random() * words.length)];
  const pattern = Math.floor(Math.random() * 3);

  if (pattern === 0) {
    const number = Math.floor(Math.random() * 9) + 1;
    return `${word}-${number}`;
  }

  if (pattern === 1) {
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${word} ${suffix}`;
  }

  return word;
}

function determinePlanetType(size, hue) {
  if (size > 260) return 'Gas Giant';

  if (hue < 30 || hue >= 330) return 'Volcanic World';
  if (hue < 60) return 'Desert Planet';
  if (hue < 160) return 'Rocky Planet';
  if (hue < 200) return 'Ice World';
  if (hue < 260) return 'Ocean World';

  return 'Rocky Planet';
}

function calculateGravity(size) {
  const minGravity = 0.5;
  const maxGravity = 2.2;
  const sizeRatio = (size - 100) / (300 - 100);

  let gravity = minGravity + sizeRatio * (maxGravity - minGravity);
  gravity += Math.random() * 0.2 - 0.1;

  return Math.max(0.1, gravity).toFixed(2);
}

function calculateTemperature(hue) {
  let baseTemp;

  if (hue < 40 || hue >= 320) baseTemp = 80;
  else if (hue < 70) baseTemp = 45;
  else if (hue < 160) baseTemp = 15;
  else if (hue < 200) baseTemp = -10;
  else if (hue < 260) baseTemp = -40;
  else baseTemp = 10;

  const variation = Math.random() * 20 - 10;
  return Math.round(baseTemp + variation);
}

function determineAtmosphereType(hasAtmosphere) {
  if (!hasAtmosphere) return 'None';

  const gasTypes = ['Nitrogen-Oxygen', 'Carbon Dioxide', 'Methane', 'Hydrogen', 'Helium'];
  return gasTypes[Math.floor(Math.random() * gasTypes.length)];
}

function calculateHabitability(gravity, temperature, atmosphereType) {
  if (atmosphereType === 'None') return 'Uninhabitable';

  const gravityOk = gravity >= 0.7 && gravity <= 1.4;
  const temperatureOk = temperature >= -10 && temperature <= 35;

  if (gravityOk && temperatureOk && atmosphereType === 'Nitrogen-Oxygen') return 'High';
  if (gravityOk && temperatureOk) return 'Moderate';
  if (gravityOk || temperatureOk) return 'Low';

  return 'Uninhabitable';
}

function generateRarity() {
  const rarities = [
    { name: 'Common', weight: 40},
    { name: 'Uncommon', weight: 30},
    { name: 'Rare', weight: 20},
    { name: 'Epic', weight: 8},
    { name: 'Legendary', weight: 2}
  ];

  const totalWeight = rarities.reduce((sum, r) => sum + r.weight, 0);
  let roll = Math.random() * totalWeight;

  for (const rarity of rarities) {
    if (roll < rarity.weight) return rarity.name;
    roll -= rarity.weight;
  }

  return 'Common';
}

function generatePlanetDescription(type, atmosphereType, habitability, temperature) {
  const tempWord = temperature < -10 ? 'frozen' : temperature > 40 ? 'scorching' : 'temperate';
  const atmosphereWord = atmosphereType === 'None' ? 'no atmosphere' : `a ${atmosphereType.toLowerCase()} atmosphere`;

  const templates = {
    'Gas Giant': `A massive gas giant wrapped in swirling clouds and ${atmosphereWord}.`,
    'Volcanic World': `A ${tempWord} volcanic planet covered in molten plains and intense geological activity.`,
    'Desert Planet': `A ${tempWord} desert world with vast dry plains and ${atmosphereWord}.`,
    'Rocky Planet': `A rocky planet with ${atmosphereWord} and generally stable conditions.`,
    'Ice World': `A ${tempWord} world locked in ice, with ${atmosphereWord}.`,
    'Ocean World': `An ocean-covered planet with ${atmosphereWord} and a mostly stable climate.`
  };

  let description = templates[type] || `A ${tempWord} planet with ${atmosphereWord}.`;

  if (habitability === 'High') {
    description += ' Conditions here could support life.';
  } else if (habitability === 'Uninhabitable') {
    description += ' Conditions are hostile to life as we know it.';
  }

  return description;
}

function updatePlanetCard(data) {
  cardName.textContent = data.name;
  cardType.textContent = data.type;
  cardGravity.textContent = `${data.gravity} g`;
  cardTemperature.textContent = `${data.temperature}°C`;
  cardAtmosphere.textContent = data.atmosphereType;
  cardHabitability.textContent = data.habitability;
  cardMoons.textContent = data.moonCount;
  cardDescription.textContent = data.description;

  cardRarity.className = 'card-rarity';
  cardRarity.classList.add(`rarity-${data.rarity.toLowerCase()}`);
  cardRarity.textContent = data.rarity;
}

function updatePlanetInfo() {
  const size = Number(sizeSlider.value);
  const hue = getHue(colorPicker.value);
  const hasAtmosphere = atmosphereToggle.checked;

  const name = generatePlanetName();
  const type = determinePlanetType(size, hue);
  const gravity = calculateGravity(size);
  const temperature = calculateTemperature(hue);
  const atmosphereType = determineAtmosphereType(hasAtmosphere);
  const habitability = calculateHabitability(Number(gravity), temperature, atmosphereType);

  const moonCount = Number(moonSlider.value);
  const rarity = generateRarity();
  const description = generatePlanetDescription(type, atmosphereType, habitability, temperature);

  infoName.textContent = name;
  infoType.textContent = type;
  infoGravity.textContent = `${gravity} g`;
  infoTemperature.textContent = `${temperature}°C`;
  infoAtmosphere.textContent = atmosphereType;
  infoHabitability.textContent = habitability;

  updatePlanetCard({
    name,
    type,
    gravity,
    temperature,
    atmosphereType,
    habitability,
    moonCount,
    rarity,
    description
  });
}

sizeSlider.addEventListener('input', () => {
  updatePlanetSize(sizeSlider.value);
  updatePlanetInfo();
});

colorPicker.addEventListener('input', () => {
  updatePlanetColor(colorPicker.value);
  updatePlanetInfo();
});

atmosphereToggle.addEventListener('change', () => {
  updateAtmosphere(atmosphereToggle.checked);
  updatePlanetInfo();
});

ringToggle.addEventListener('change', () => {
  updateRingVisibility(ringToggle.checked);
  updatePlanetInfo();
});

moonSlider.addEventListener('input', () => {
  updateMoonCount(Number(moonSlider.value));
  updatePlanetInfo();
});

updatePlanetSize(sizeSlider.value);
updatePlanetColor(colorPicker.value);
updateAtmosphere(atmosphereToggle.checked);
updateRingVisibility(ringToggle.checked);
updateMoonCount(Number(moonSlider.value));
updatePlanetInfo();