/* MAP */
const DUNDEE_BOUNDS = L.latLngBounds(
  [56.430, -3.120], // South-West corner
  [56.500, -2.900]  // North-East corner
);

const map = L.map("map", {
  maxBounds: DUNDEE_BOUNDS,
  maxBoundsViscosity: 0.9, // edge springyness (0–1)
  minZoom: 12,
  maxZoom: 17
}).setView([56.462, -2.971], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);

/*© 2026 Shannon Martin. All rights reserved. Created as part of a prototype services-mapping application.*/