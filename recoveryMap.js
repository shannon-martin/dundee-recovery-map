/* SERVICE CATEGORIES */
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

/* CAT BTNS */
const catContainer = document.getElementById("cat-btns");
Object.entries(CATEGORIES).forEach(([name, c]) => {
  const btn = document.createElement("button");
  btn.className = "cat-btn active";
  btn.style.borderColor = c.color;
  btn.style.color = c.color;
  btn.style.background = c.light;
  btn.textContent = name;
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
      btn.style.opacity    = "1";
    }
    renderMapMarkers();
  };
  catContainer.appendChild(btn);
});

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


/* TRANSFORM DATA */
function transformServices(rawData) {
  /* Main grouping function.
     Groups by the key: Organisation + Full Address.
     Rows with no lat/lng go to virtualServices. */

  const grouped = {};   // key → array of raw rows

  rawData.forEach(row => {
    const org  = (row["Organisation"] || row["Organisation "] || "").trim();
    const addr = (row["Full Address"] || row["Address"] || "").trim();
    const key  = `${org}|||${addr}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(row);
  });

  mapServices     = [];
  virtualServices = [];

  Object.entries(grouped).forEach(([key, rows]) => {
    const first = rows[0];
    const org   = (first["Organisation"] || first["Organisation "] || "").trim();
    const lat   = parseFloat(first.lat);
    const lng   = parseFloat(first.lng);
    const hasCoords = !isNaN(lat) && !isNaN(lng) && (lat !== 0 || lng !== 0);

    // Gather all distinct categories across sessions at this location
    const cats = [...new Set(rows.map(r => r["Category"] || "Other"))];
    // Primary category: most common across sessions
    const catCounts = {};
    rows.forEach(r => { const c = r["Category"] || "Other"; catCounts[c] = (catCounts[c]||0)+1; });
    const primaryCat = Object.entries(catCounts).sort((a,b)=>b[1]-a[1])[0][0];

    // Collect all distinct age groups and cost types across sessions
    const ageGroups  = [...new Set(rows.map(r => normaliseAge(r["Age Group"])))];
    const costTypes  = [...new Set(rows.map(r => normaliseCost(r["Cost Type"])))];

    const entry = {
      org,
      name:        org,
      cat:         primaryCat,
      cats,                          // all categories at this location
      ageGroups,                     // for filtering
      costTypes,                     // for filtering
      lat, lng,
      address:     first["Full Address"] || first["Address"] || "",
      phone:       first["Phone"]   || "",
      email:       first["Email"]   || "",
      website:     first["Website"] || "",
      desc:        resolveDesc(first),
      sessions:    buildSessionsForGroup(rows),   // per-session breakdown
      hours:       buildHoursForGroup(rows),      // merged hours for open/closed logic
      scope:       (first["Council Area"] || "").trim(),   // UK / Angus / Dundee City etc.
    };

    if (hasCoords) {
      mapServices.push(entry);
    } else {
      virtualServices.push(entry);
    }
  });

  console.log(`Grouped: ${mapServices.length} map services, ${virtualServices.length} virtual/sidebar services`);
}

/* LOAD DATA */
fetch("./data/DundeeRecoveryServices.json")
  .then(res => res.json())
  .then(rawData => {
    SERVICES = transformServices(rawData); // FIX
    renderMapMarkers();
  })
  .catch(err => {
    console.error("Failed to load services:", err);
  });

/*© 2026 Shannon Martin. All rights reserved. Created as part of a prototype services-mapping application.*/