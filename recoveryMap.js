/* LOAD/TRANSFORM SEVICES */
let SERVICES = [];

function transformServices(data) {
  return data.map(s => {
    // build opening-hours obj
    const hours = {
      Mon: null, Tue: null, Wed: null,
      Thu: null, Fri: null, Sat: null, Sun: null
    };

    const dayIdx = DAY_FULL.indexOf(s["Day"]);
    if (dayIdx !== -1) {
      const abbr = DAYS[dayIdx];
      hours[abbr] = `${s["Start Time"]}-${s["End Time"]}`;
    }

    return {
      name: `${s["Organisation "] || ""} - ${s["Session Name"] || ""}`.trim(),
      cat: s["Category"] || "Other",
      lat: s.lat,
      lng: s.lng,
      address: s["Full Address"] || s.Address || "",
      phone: s.Phone || "",
      website: s.Website || "",
      desc: s["Description on Recovery Map"] || "",
      hours
    };
  });
}

fetch("./data/DundeeRecoveryServices.json")
  .then(res => res.json())
  .then(rawData => {
    SERVICES = transformServices(rawData);
    renderMapMarkers();
  })
  .catch(err => {
    console.error("Failed to load services:", err);
  });


/* SERVICE CATS */
/* defines the service categories, their pin colours,
   and their light background colours (used on buttons).
   color = the main pin and accent colour (hex)
   light = a pale tint of the same colour for button backgrounds */
const CATEGORIES = {
  "Activity Based":{ color: "#C25D93", light: "#F8EDF3" },
  "Mental Health":{ color: "#4FB3B3", light: "#E9FBFB" },
  "Addiction Support":{ color: "#0F6E56", light: "#E1F5EE" },
  "Rehab Information":{ color: "#785E42", light: "#F6F2EF" },
  "Health and Wellbeing":{ color: "#534AB7", light: "#EEEDFE" },
  "Harm Reduction":{ color: "#72243E", light: "#FBEAF0" },
  "Peer Support":{ color: "#C76A22", light: "#FBF1E9" },
  "Family/Carer Support":{ color: "#185FA5", light: "#E6F1FB" },
  "Food Resources":{ color: "#3B6D11", light: "#EAF3DE" },
  "Housing":{ color: "#C4B73B", light: "#FFFFE6" },
};

/* CONST AND VARS */

/* JS Date.getDay() returns 0 for Sunday and 6 for Saturday, converts JS order */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_FULL = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const JS_TO_IDX = [6, 0, 1, 2, 3, 4, 5];

const todayIdx = JS_TO_IDX[new Date().getDay()];
const todayAbbr = DAYS[todayIdx];
let activeDay = todayAbbr;
let activeCats = new Set(Object.keys(CATEGORIES));
let searchTerm = "";
let markers = [];


/* MAP */
const DUNDEE_BOUNDS = L.latLngBounds(
  [56.430, -3.120], // South-West corner
  [56.500, -2.900]  // North-East corner
);

const map = L.map("map", {
  maxBounds: DUNDEE_BOUNDS,
  maxBoundsViscosity: 0.9, // edge springyness (0-1)
  minZoom: 12,
  maxZoom: 17
}).setView([56.462, -2.971], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);

/* replaces Leaflet default blue marker icon, using L.divIcon(), which allows providing any HTML
   (including inline SVG) as the pin visual.*/
function makeIcon(cat, isOpen) {
  const c = CATEGORIES[cat] || { color: "#888", light: "#eee" };
  const opacity = isOpen ? 1 : 0.35;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <ellipse cx="14" cy="34" rx="6" ry="2" fill="rgba(0,0,0,0.18)"/>
      <path d="M14 0C7.373 0 2 5.373 2 12c0 9 12 22 12 22S26 21 26 12C26 5.373 20.627 0 14 0z"
        fill="${c.color}" opacity="${opacity}" stroke="white" stroke-width="1.5"/>
      <circle cx="14" cy="12" r="5" fill="white" opacity="${opacity}"/>
    </svg>`;

  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36]
  });
}

/* POPUPS */
/* builds the HTML string displayed inside a popup
   when a user clicks a pin. */
function makePopup(s) {
  const c = CATEGORIES[s.cat] || { color: "#888", light: "#eee" };
  const isOpenNow = s.hours[todayAbbr];

  // "Open today" or "Closed today" badge
  const chip = isOpenNow
    ? `<span class="open-chip open">Open today</span>`
    : `<span class="open-chip closed">Closed today</span>`;

  // full week hours grid
  const hoursHTML = Object.entries(s.hours).map(([d, h], i) => {
    const isToday = DAYS[i] === todayAbbr;
    const cls = isToday ? "day-row today-row" : (h ? "day-row" : "day-row closed");
    return `<div class="${cls}">
      <span>${DAY_FULL[i]}</span>
      <span>${h || "Closed"}</span>
    </div>`;
  }).join("");

  return `
    <div class="popup-header" style="background:${c.color}">
      ${s.name} ${chip}
    </div>
    <div class="popup-body">
      <div class="popup-cat" style="color:${c.color}">${s.cat}</div>
      <div class="popup-desc">${s.desc}</div>
      <div class="popup-info">
        <div><span>Address:</span> ${s.address}</div>
        ${s.phone ? `<div><span>Phone:</span> ${s.phone}</div>` : ""}				
		${s.website ? `
		  <div>
			<span>Web:</span>
			<a href="${s.website.startsWith("http") ? s.website : "https://" + s.website}" target="_blank">
			  ${s.website}
			</a>
		  </div>
		` : ""}
      </div>
      <div class="popup-hours">
        <div class="popup-hours-title">Opening hours</div>
        ${hoursHTML}
      </div>
    </div>`;
}

/* MARKERS */
/* removes all existing pins from the map and redraws only the services that match
   the current activeDay + activeCats + searchTerm filters */
function renderMapMarkers() {
  // remove all existing markers from the map
  markers.forEach(m => map.removeLayer(m));
  markers = []; // reset the markers array to empty

  let shown = 0;
  let openToday = 0;

  SERVICES.forEach(s => {
    // check if this service passes category and search filters
    const matchCat = activeCats.has(s.cat); // checks if this service cat in active cats
    const matchSearch = !searchTerm // checks name, category, and description for search term
      || s.name.toLowerCase().includes(searchTerm)
      || s.cat.toLowerCase().includes(searchTerm)
      || s.desc.toLowerCase().includes(searchTerm);

    // skip services that fail category or search filter
    if (!matchCat || !matchSearch) return;

    // is this service open on the currently viewed day?
    const isOpen = !!s.hours[activeDay];

    // create the marker with custom coloured pin
    const icon = makeIcon(s.cat, isOpen);
    const m = L.marker([s.lat, s.lng], {
        icon,
        opacity: isOpen ? 1 : 0.45 // dim closed services
      })
      .bindPopup(makePopup(s), { maxWidth: 290 }) // attaches a popup to the marker
      .addTo(map); //places the marker on the map and makes it interactive

    markers.push(m);
    shown++;

    // count how many are open on actual today (not activeDay)
    if (s.hours[todayAbbr]) openToday++;
  });

  // update the stats bar counts
  document.getElementById("count").textContent = shown;
  const openLabel = document.getElementById("open-count-label");

  if (activeDay === todayAbbr) {
    // user is viewing today, then show live "open right now" count
    openLabel.innerHTML =
      `<span style="color:#0f6e56;font-weight:700">${openToday} open right now</span>`;
  } else {
    // user is browsing another day, then count open on that day
    const openOnDay = SERVICES.filter(s =>
      activeCats.has(s.cat) &&
      (!searchTerm || s.name.toLowerCase().includes(searchTerm) || s.cat.toLowerCase().includes(searchTerm)) &&
      s.hours[activeDay]
    ).length;
    openLabel.innerHTML =
      `<span style="color:#555">${openOnDay} open on ${DAY_FULL[DAYS.indexOf(activeDay)]}</span>`;
  }
}

/* MAP LEGEND */
const legend = document.getElementById("legend");

legend.innerHTML =
  `<div class="legend-title">Service types</div>` +
  Object.entries(CATEGORIES).map(([n, c]) => // content is generated from the CATEGORIES object
    `<div class="legend-item">
       <div class="legend-dot" style="background:${c.color}"></div>
       ${n}
     </div>`
  ).join("") +
  `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #eee;font-size:0.68rem;color:#888">
     Faded pins = closed<br>on selected day
   </div>`;
  

/* BUTTONS */
const dayContainer = document.getElementById("day-btns");

DAYS.forEach((d, i) => {
  const btn = document.createElement("button");
  btn.className = "day-btn"
    + (i === todayIdx ? " today-btn" : "") // adds the "today-btn" class
    + (d === activeDay ? " active" : ""); //  adds "active" initially (today's btn)
  btn.textContent = d + (i === todayIdx ? " <" : ""); // mark today visual
  btn.title = DAY_FULL[i] + (i === todayIdx ? " (today)" : ""); // day name tooltip on hover

  /* updates activeDay state variable, removes "active" from all day buttons, adds "active" back to just the clicked button, calls buildMarkers() to re-render the map */
  btn.onclick = () => {
    activeDay = d;
    document.querySelectorAll(".day-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderMapMarkers();;
  };

  dayContainer.appendChild(btn);
});

// set today badge text in the header
document.getElementById("today-label").textContent = `Today: ${DAY_FULL[todayIdx]}`;

const catContainer = document.getElementById("cat-btns");

Object.entries(CATEGORIES).forEach(([name, c]) => {
  const btn = document.createElement("button");
  btn.className = "cat-btn active";
  btn.style.bordercolour = c.color;
  btn.style.color = c.color;
  btn.style.background = c.light;
  btn.textContent = name;

  /* IF the category IS currently active (in activeCats):
       don't allow deactivating the last category.
       remove from activeCats Set.
       remove class, reset background to white,
       dim opacity.
     IF the category is NOT active:
      add it back to activeCats.
      add class, restore light background, full opacity.
     THEN call buildMarkers(). */
  btn.onclick = () => {
    if (activeCats.has(name)) {
      if (activeCats.size === 1) return;
      activeCats.delete(name);
      btn.classList.remove("active");
      btn.style.background = "#fff";
      btn.style.opacity = "0.5";
    } else {
      activeCats.add(name);
      btn.classList.add("active");
      btn.style.background = c.light;
      btn.style.opacity = "1";
    }
    renderMapMarkers();
  };

  catContainer.appendChild(btn);
});

/* SERACH */
/* addEventListener("input", handler) fires on every
   keystroke as user typesfor instant results.
   e.target.value is the current text in the input.
   .toLowerCase().trim() normalises for comparison. */
document.getElementById("search").addEventListener("input", e => {
  searchTerm = e.target.value.toLowerCase().trim();
  renderMapMarkers();
});

renderMapMarkers();

/*© 2026 Shannon Martin. All rights reserved. Created as part of a prototype services-mapping application.*/