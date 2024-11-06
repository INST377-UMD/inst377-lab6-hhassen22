const map = L.map('leafletMap').setView([37.8, -96], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap'
}).addTo(map);

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coordinates = [
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
];

coordinates.forEach((coord, index) => {
  const marker = L.marker([coord.lat, coord.lng]).addTo(map)
    .bindPopup(`Location ${index + 1}`)
    .openPopup();

  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lng}&localityLanguage=en`)
    .then(response => response.json())
    .then(data => {
      const locality = data.locality || "Locality not found";
      document.getElementById(`location${index + 1}`).textContent = `Location ${index + 1} (Lat: ${coord.lat}, Lng: ${coord.lng}): ${locality}`;
    })
    .catch(error => {
      document.getElementById(`location${index + 1}`).textContent = `Location ${index + 1}: Error retrieving locality`;
      console.error(error);
    });
});
