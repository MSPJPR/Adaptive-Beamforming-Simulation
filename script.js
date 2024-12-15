document.getElementById('simulateBtn').addEventListener('click', simulateBeamforming);
document.getElementById('sidelobe').addEventListener('input', updateSidelobeValue);

function simulateBeamforming() {
  const numElements = parseInt(document.getElementById('elements').value);
  const steeringAngle = parseInt(document.getElementById('angle').value);
  const sidelobeLevel = parseInt(document.getElementById('sidelobe').value);
  
  const canvas = document.getElementById('beamCanvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const width = canvas.width;
  const height = canvas.height;
  const centerY = height / 2;
  const elementSpacing = width / (numElements + 1);

  ctx.strokeStyle = '#007bff';
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0, centerY);

  for (let i = 1; i <= numElements; i++) {
    const phaseShift = (i - 1) * (steeringAngle * Math.PI / 180);
    const y = centerY + Math.sin(i * 0.5 + phaseShift) * (50 - sidelobeLevel);
    const x = i * elementSpacing;
    ctx.lineTo(x, y);
  }

  ctx.stroke();

  updateMetrics(numElements, sidelobeLevel);
}

function updateMetrics(numElements, sidelobeLevel) {
  const beamwidth = (180 / numElements).toFixed(2);
  const signalStrength = (100 - sidelobeLevel).toFixed(2);

  document.getElementById('beamwidth').innerText = `${beamwidth}°`;
  document.getElementById('signalStrength').innerText = `${signalStrength}%`;
}

function updateSidelobeValue() {
  const sidelobeLevel = document.getElementById('sidelobe').value;
  document.getElementById('sidelobeValue').innerText = sidelobeLevel;
}
