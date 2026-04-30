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
const ALL_GROUPS = ["Adults","Women","Older Adults","Men","All Ages","Young People","Children","Unknown"];

let activeDay = todayAbbr;
let activeCats = new Set(Object.keys(CATEGORIES));
let activeCosts  = new Set(["Free","Paid","Unknown"]);
let activeGrps   = new Set(ALL_GROUPS);
let searchTerm = "";

let mapServices = []; // grouped, has lat/lng to map markers
let virtualServices = []; // no lat/lng to sidebar list

/*let markers = []; // live Leaflet marker objects*/

/* HELPERS */
function servicePassesFilters(s) {
  /* returns true if the service should be visible given current filter state. */

  // Category: at least one of the service's cats must be active
  const matchCat = s.cats
    ? s.cats.some(c => activeCats.has(c))
    : activeCats.has(s.cat);

  // Cost: at least one of the service's cost types must be active
  const matchCost = s.costTypes
    ? s.costTypes.some(c => activeCosts.has(c))
    : true;

  // Age: at least one of the service's age groups must be active
  const matchAge = s.ageGroups
    ? s.ageGroups.some(a => activeGrps.has(a))
    : true;

  // Search: name, cat, or desc contains the search term
  const matchSearch = !searchTerm
    || s.name.toLowerCase().includes(searchTerm)
    || s.cat.toLowerCase().includes(searchTerm)
    || (s.desc || "").toLowerCase().includes(searchTerm);

  const matchAccess = activeAccess.has(s.activityStatus || "Unknown");

  return matchCat && matchCost && matchAge && matchSearch && matchAccess;
}

function resolveHours(value, activityStatus) {
  /* Determine display txt and CSS class for an hours value.
     activityStatus (optional) takes priority when indicate
     something more specific than the hours value alone. */

  const status = (activityStatus || "").trim().toLowerCase();

  // By Appointment = regardless of what the hours field says,
  // the user must contact the service first
  if (status === "by appointment") {
    return { text: "By appointment", cls: "hours-appt" };
  }

  // check the hours value itself
  if (!value) return { text: "Closed", cls: "closed" };
  const v = value.trim().toLowerCase();
  if (v === "unknown" || v === "hours not confirmed")
    return { text: "Hours not confirmed", cls: "hours-unknown" };
  if (v === "by appointment" || v === "by appt")
    return { text: "By appointment — contact to book", cls: "hours-appt" };

  // Open Access = no appointment needed, hours are a guide
  if (status === "open access" && value) {
    return { text: value + " (drop-in)", cls: "" };
  }

  return { text: value, cls: "" };
}

/* returns true if marker should show on the selected day.
   Only definitively closed markers (cls === "closed") are hidden.
   Unknown and By Appointment always show. */
function isDayVisible(hoursValue, activityStatus) {
  return resolveHours(hoursValue, activityStatus).cls !== "closed";
}

/* TRANSFORM DATA */
function resolveDesc(row) {
  /* Return the best available description for a service row.
     If "Description on Recovery Map" is missing, blank, or
     literally "Not on Recovery Map", fall back to Additional Notes. */
  const primary = (row["Description on Recovery Map"] || "").trim();
  if (!primary || primary.toLowerCase() === "not on recovery map") {
    return (row["Additional Notes"] || "").trim();
  }
  return primary;
}

function buildHoursForGroup(rows) {
  /* Given all session rows for one location, produce a hours object
     { Mon: "09:00-12:00 / 14:00-16:00", Tue: null, … }
     Multiple sessions on the same day are joined with " / ".   */
  const hours = { Mon:null, Tue:null, Wed:null, Thu:null, Fri:null, Sat:null, Sun:null };

  rows.forEach(row => {
    const dayFull = (row["Day"] || "").trim();
    const range   = (row["Time Range"] || "").trim() || null;

    // handle Unknown/Various day, mark all days as unknown
    // so resolveHours shows "Hours not confirmed" instead of "Closed"
    const isUnknownDay = !dayFull
      || dayFull.toLowerCase() === "unknown"
      || dayFull.toLowerCase() === "various";

    if (isUnknownDay) {
      DAYS.forEach(abbr => {
        // Only upgrade null → unknown, don't overwrite real hours
        if (!hours[abbr]) hours[abbr] = "Unknown";
      });
      return;
    }

    // Handle "By Appointment" as a day value
    if (dayFull.toLowerCase() === "by appointment") {
      DAYS.forEach(abbr => {
        if (!hours[abbr]) hours[abbr] = "By appointment";
      });
      return;
    }

    const idx = DAY_FULL.indexOf(dayFull);
    if (idx === -1) return;
    const abbr = DAYS[idx];
    if (!range) return;
    hours[abbr] = hours[abbr] ? hours[abbr] + " / " + range : range;
  });

  return hours;
}

function buildSessionsForGroup(rows) {
  /* Collect distinct session names and their per-day detail so the
     popup can show a per-session breakdown rather than just merged hours.
     Returns an array of { name, cat, tgtGroup, cost, hours } objects. */
  // Deduplicate by Session Name (same session can appear on multiple days)
  const byName = {};
  rows.forEach(row => {
    const sName = (row["Session Name"] || "").trim() || "Session";
    if (!byName[sName]) {
      byName[sName] = {
        name: sName,
        cat: row["Category"] || "Other",
        tgtGroup: row["Age Group"],
        cost: row["Cost Type"],
        activityStatus: (row["Activity Status"] || "").trim(),
        hours: { Mon:null,Tue:null,Wed:null,Thu:null,Fri:null,Sat:null,Sun:null },
      };
    }
    const dayFull = (row["Day"] || "").trim();
    const isUnknownDay = !dayFull
    || dayFull.toLowerCase() === "unknown"
    || dayFull.toLowerCase() === "various";

    if (isUnknownDay) {
    DAYS.forEach(abbr => {
        if (!byName[sName].hours[abbr]) byName[sName].hours[abbr] = "Unknown";
    });
    return;
    }

    if (dayFull.toLowerCase() === "by appointment") {
        DAYS.forEach(abbr => {
            if (!byName[sName].hours[abbr]) byName[sName].hours[abbr] = "By appointment";
        });
        return;
        }

        const idx = DAY_FULL.indexOf(dayFull);
        if (idx === -1) return;

    const abbr = DAYS[idx];
    const range = (row["Time Range"] || "").trim() || null;
    if (!range) return;
    byName[sName].hours[abbr] = byName[sName].hours[abbr]
      ? byName[sName].hours[abbr] + " / " + range
      : range;
  });
  return Object.values(byName);
}

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

    const statusCounts = {};
    rows.forEach(r => {
    const st = (r["Activity Status"] || "Unknown").trim();
    statusCounts[st] = (statusCounts[st] || 0) + 1;
    });
    const primaryStatus = Object.entries(statusCounts).sort((a,b) => b[1]-a[1])[0][0];

    rows.forEach(r => { const c = r["Category"] || "Other"; catCounts[c] = (catCounts[c]||0)+1; });
    const primaryCat = Object.entries(catCounts).sort((a,b)=>b[1]-a[1])[0][0];

    // collect all distinct age groups and cost types across sessions
    const ageGroups  = [...new Set(rows.map(r => r["Age Group"]))];
    const costTypes  = [...new Set(rows.map(r => r["Cost Type"]))];

    const entry = {
      org,
      name: org,
      cat: primaryCat,
      cats,
      ageGroups,
      costTypes,
      activityStatus: primaryStatus,
      lat, lng,
      address: first["Full Address"] || first["Address"] || "",
      phone: first["Phone"] || "",
      email: first["Email"] || "",
      website: first["Website"] || "",
      desc: resolveDesc(first),
      sessions: buildSessionsForGroup(rows), // per-session breakdown
      hours: buildHoursForGroup(rows), // merged hours for open/closed logic
      scope: (first["Council Area"] || "").trim(), // UK / Angus / Dundee City etc.
    };

    if (hasCoords) {
      mapServices.push(entry);
    } else {
      virtualServices.push(entry);
    }
  });

  console.log(`Grouped: ${mapServices.length} map services, ${virtualServices.length} virtual/sidebar services`);
}



/* MAP */
const DUNDEE_BOUNDS = L.latLngBounds(
  [56.3102, -3.3626], // South-West corner, increased from 56.430, -3.120
  [56.6198, -2.6674]  // North-East corner, increased from 56.500, -2.900
);

const map = L.map("map", {
  maxBounds: DUNDEE_BOUNDS,
  maxBoundsViscosity: 0.7, // edge springyness (0-1)
  minZoom: 12,
  maxZoom: 19
}).setView([56.462, -2.971], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);

let clusterGroup = L.markerClusterGroup({
  maxClusterRadius: 40, // pixels, pins must be this close to cluster
  disableClusteringAtZoom: 16 // at max zoom, show individual pins
});
map.addLayer(clusterGroup);

/* ICON */
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
function makeHoursGrid(hours, activityStatus) {
  return Object.entries(hours).map(([abbr, h], i) => {
    const isToday  = DAYS[i] === todayAbbr;
    const isActive = DAYS[i] === activeDay;
    const resolved = resolveHours(h, activityStatus);

    let cls = "day-row";
    if (isToday) cls += " today-row";
    if (isActive && !isToday) cls += " active-day-row";
    if (resolved.cls) cls += " " + resolved.cls;

    return `<div class="${cls}">
      <span>${DAY_FULL[i]}</span>
      <span>${resolved.text}</span>
    </div>`;
  }).join("");
}
/* builds the HTML string displayed inside a popup
   when a user clicks a pin. */
function makePopup(s) {
  const c = CATEGORIES[s.cat] || { color:"#888" };
  const todayHours = resolveHours(s.hours[todayAbbr], s.activityStatus);
  const chip = todayHours.cls === "closed"
    ? `<span class="open-chip closed">Closed today</span>`
    : todayHours.cls === "hours-unknown"
    ? `<span class="open-chip unknown">Hours not confirmed</span>`
    : todayHours.cls === "hours-appt"
    ? `<span class="open-chip appt">By appointment</span>`
    : `<span class="open-chip open">Open today</span>`;

  // IF only one session, show simple flat layout
  if (s.sessions.length === 1) {
    const sess = s.sessions[0];
    const sc = CATEGORIES[sess.cat] || c;
    return `
      <div class="popup-header" style="background:${sc.color}">
        ${s.name} ${chip}
      </div>
      <div class="popup-body">
        <div class="popup-cat" style="color:${sc.color}">${sess.cat}</div>
        <div class="popup-desc">${s.desc}</div>
        <div class="popup-info">
          <div><span>Address:</span> ${s.address}</div>
          ${s.phone ? `<div><span>Phone:</span> ${s.phone}</div>` : ""}
          ${s.website ? `<div><span>Web:</span> <a href="${s.website.startsWith("http")?s.website:"https://"+s.website}" target="_blank">${s.website}</a></div>` : ""}
          <div><span>Target Group:</span> ${sess.tgtGroup}</div>
          <div><span>Cost:</span> ${sess.cost}</div>
        </div>
        <div class="popup-hours">
          <div class="popup-hours-title">Opening hours</div>
          ${makeHoursGrid(sess.hours, sess.activityStatus)}
        </div>
      </div>`;
  }

  // multiple sessions displys accordion layout.
  // each session is a <details> element (expand/collapse).
  const sessionsHTML = s.sessions.map((sess, i) => {
    const sc = CATEGORIES[sess.cat] || c;
    const dot = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${sc.color};margin-right:5px;flex-shrink:0"></span>`
    const sessResolved = resolveHours(sess.hours[todayAbbr], sess.activityStatus);
    const badge = sessResolved.cls === "closed"
        ? `<span class="open-chip closed" style="font-size:0.6rem;padding:1px 5px">Closed</span>`
        : sessResolved.cls === "hours-unknown"
        ? `<span class="open-chip unknown" style="font-size:0.6rem;padding:1px 5px">Hours ?</span>`
        : sessResolved.cls === "hours-appt"
        ? `<span class="open-chip appt" style="font-size:0.6rem;padding:1px 5px">By appt</span>`
        : `<span class="open-chip open" style="font-size:0.6rem;padding:1px 5px">Open</span>`;
    return `
      <details class="session-details" ${i===0?"open":""}>
        <summary class="session-summary">
          ${dot}${sess.name} ${badge}
        </summary>
        <div class="session-body">
          <div class="popup-cat" style="color:${sc.color};margin-bottom:4px">${sess.cat}</div>
          <div class="popup-info" style="margin-bottom:4px">
            <div><span>Target Group:</span> ${sess.tgtGroup}</div>
            <div><span>Cost:</span> ${sess.cost}</div>
          </div>
          <div class="popup-hours">
            <div class="popup-hours-title">Hours</div>
            ${makeHoursGrid(sess.hours, sess.activityStatus)}
          </div>
        </div>
      </details>`;
  }).join("");

  return `
    <div class="popup-header" style="background:${c.color}">
      ${s.name} ${chip}
    </div>
    <div class="popup-body">
      <div class="popup-desc">${s.desc}</div>
      <div class="popup-info" style="margin-bottom:8px">
        <div><span>Address:</span> ${s.address}</div>
        ${s.phone   ? `<div><span>Phone:</span> ${s.phone}</div>` : ""}
        ${s.website ? `<div><span>Web:</span> <a href="${s.website.startsWith("http")?s.website:"https://"+s.website}" target="_blank">${s.website}</a></div>` : ""}
      </div>
      <div class="session-list">${sessionsHTML}</div>
    </div>`;
}

/* MARKERS */
/* removes all existing pins from the map and redraws only the services that match current filters */
function renderMapMarkers() {
  // remove all existing markers from the map
  clusterGroup.clearLayers();

  let shown = 0, openToday = 0;

  mapServices.forEach(s => {
	// check if this service passes category and search filters
    if (!servicePassesFilters(s)) return;
    if (!isDayVisible(s.hours[activeDay], s.activityStatus)) return; // hides cloased services

    // only definitively closed pins are faded.
    const todayH = resolveHours(s.hours[activeDay]);
    const isOpen = todayH.cls !== "closed";
    const opacity = todayH.cls === "closed" ? 0.45 : 1;
    const icon = makeIcon(s.cat, isOpen);

    const m = L.marker([s.lat, s.lng], { icon, opacity })
      .bindPopup(makePopup(s), { 
        maxWidth:310, 
        autoPanPaddingTopLeft: [20, 20], 
        autoPanPaddingBottomRight: [20, 100], // extra space for popup height
      })
      /*.addTo(map);*/

    clusterGroup.addLayer(m);
    shown++;
    if (s.hours[todayAbbr]) openToday++;
  });

  // Stats bar
  document.getElementById("count").textContent = shown;
  const openLabel = document.getElementById("open-count-label");
  if (activeDay === todayAbbr) {
    openLabel.innerHTML = `<span style="color:#0f6e56;font-weight:700">${openToday} open right now</span>`;
  } else {
    const openOnDay = mapServices.filter(s => servicePassesFilters(s) && s.hours[activeDay]).length;
    openLabel.innerHTML = `<span style="color:#555">${openOnDay} open on ${DAY_FULL[DAYS.indexOf(activeDay)]}</span>`;
  }

  renderSidebar();
}

/* MAP LEGEND */
const legend = document.getElementById("legend");
const legendToggle = document.querySelector(".legend-toggle");
const legendContent = document.querySelector(".legend-content");

legendContent.innerHTML =
  `<div class="legend-title">Service types</div>` +
  Object.entries(CATEGORIES).map(([n, c]) => // content is generated from the CATEGORIES object
    `<div class="legend-item">
       <div class="legend-dot" style="background:${c.color}"></div>
       ${n}
     </div>`
  ).join("")/* +
  `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #eee;font-size:0.68rem;color:#888">
     Faded pins = closed<br>on selected day
   </div>`*/; // faded pins legend txt

legendToggle.addEventListener("click", () => {
  const isOpen = legendContent.style.display !== "none";
  legendContent.style.display = isOpen ? "none" : "block";
  legendToggle.setAttribute("aria-expanded", String(!isOpen));
  legendToggle.textContent = isOpen ? "> Service types" : "[expand] Service types";
});

// set initial toggle label, CSS controls visibility
legendToggle.textContent = "> Service types";
  

/* SIDEBAR */
function makeSidebarCard(s) {
  const c = CATEGORIES[s.cat] || { color:"#888", light:"#eee" };
  const isOpen = !!s.hours[activeDay];
  const chip = isOpen
    ? `<span class="open-chip open">Open ${activeDay}</span>`
    : `<span class="open-chip closed">Closed ${activeDay}</span>`;
  const scopeBadge = s.scope
    ? `<span class="scope-badge">${s.scope}</span>`
    : "";

  const hoursForDay = resolveHours(s.hours[activeDay], s.activityStatus).text;

  return `
    <div class="sidebar-card">
      <div class="sidebar-card-header" style="border-left:4px solid ${c.color}">
        <div>
          <div class="sidebar-card-name">${s.name} ${chip}</div>
          <div class="sidebar-card-cat" style="color:${c.color}">${s.cat} ${scopeBadge}</div>
        </div>
      </div>
      <div class="sidebar-card-body">
        <div class="sidebar-card-desc">${s.desc}</div>
        ${s.phone ? `<div class="sidebar-card-info"><span>Phone:</span> ${s.phone}</div>` : ""}
        ${s.website ? `<div class="sidebar-card-info"><span>Web:</span> <a href="${s.website.startsWith("http")?s.website:"https://"+s.website}" target="_blank">${s.website}</a></div>` : ""}
        <div class="sidebar-card-info"><span>${activeDay}:</span> ${hoursForDay}</div>
      </div>
    </div>`;
}

function renderSidebar() {
  const panel   = document.getElementById("sidebar-list");
  const counter = document.getElementById("sidebar-count");
  if (!panel) return;

  const visible = virtualServices.filter(servicePassesFilters);
  counter.textContent = visible.length;

  if (visible.length === 0) {
    panel.innerHTML = `<p class="sidebar-empty">No matching services for current filters.</p>`;
    return;
  }
  panel.innerHTML = visible.map(makeSidebarCard).join("");
}

/* BUTTONS */
/* DAYS */
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
/*document.getElementById("today-label").textContent = `Today: ${DAY_FULL[todayIdx]}`;*/
/* CATS */
const catContainer = document.getElementById("cat-btns");

Object.entries(CATEGORIES).forEach(([name, c]) => {
  const btn = document.createElement("button");
  btn.className = "cat-btn active";
  btn.style.borderColor = c.color;
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

/* COST BTNS */
const COST_OPTS = [
  { value:"Free", label:"Free", color:"#1A6B3C" },
  { value:"Paid", label:"Paid", color:"#993C1D" },
  /*{ value:"Unknown", label:"Unknown", color:"#888" },*/
];

const costContainer = document.getElementById("cost-btns");
if (costContainer) {
  COST_OPTS.forEach(({ value, label, color }) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn active";
    btn.textContent = label;
    btn.style.borderColor = color;
    btn.style.color = color;
    btn.title = value === "Unknown"
      ? "Services where cost information is not recorded"
      : `Show ${value} services`;

    btn.onclick = () => {
      if (activeCosts.has(value)) {
        if (activeCosts.size === 1) return;
        activeCosts.delete(value);
        btn.classList.remove("active");
        btn.style.opacity = "0.45";
      } else {
        activeCosts.add(value);
        btn.classList.add("active");
        btn.style.opacity = "1";
      }
      renderMapMarkers();
    };
    costContainer.appendChild(btn);
  });
}

/* TARGET GROUP */
const GRP_OPTS = [
  { value:"All Ages", label:"All Ages" },
  { value:"Adults", label:"Adults" },
  { value:"Women", label:"Women" },
  { value:"Men", label:"Men" },
  { value:"Older Adults", label:"50+" },
  { value:"Young People", label:"Young People" },
  { value:"Children", label:"Children" },
  /*{ value:"Unknown", label:"Unknown" },*/
];

const grpContainer = document.getElementById("grp-btns");
if (grpContainer) {
  GRP_OPTS.forEach(({ value, label }) => {
    const btn = document.createElement("button");
    btn.className   = "filter-btn active";
    btn.textContent = label;
    btn.title = value === "Unknown"
      ? "Services where age group is not recorded"
      : `Show services for ${value}`;

    btn.onclick = () => {
      if (activeGrps.has(value)) {
        if (activeGrps.size === 1) return;
        activeGrps.delete(value);
        btn.classList.remove("active");
        btn.style.opacity = "0.45";
      } else {
        activeGrps.add(value);
        btn.classList.add("active");
        btn.style.opacity = "1";
      }
      renderMapMarkers();
    };
    grpContainer.appendChild(btn);
  });
}

/* ACCESS FILTR */
const ACCESS_OPTS = [
  { value:"Open Access", label:"Drop-in", title:"Walk-in, no appointment needed" },
  { value:"Scheduled Activity",label:"Scheduled", title:"Runs at specific times" },
  { value:"By Appointment", label:"By appointment",title:"Must contact service first" },
  { value:"Unknown", label:"Unknown", title:"Access type not recorded" },
];
let activeAccess = new Set(ACCESS_OPTS.map(o => o.value));

const accessContainer = document.getElementById("access-btns");
if (accessContainer) {
  ACCESS_OPTS.forEach(({ value, label, title }) => {
    const btn = document.createElement("button");
    btn.className   = "filter-btn active";
    btn.textContent = label;
    btn.title       = title;
    btn.onclick = () => {
      if (activeAccess.has(value)) {
        if (activeAccess.size === 1) return;
        activeAccess.delete(value);
        btn.classList.remove("active");
        btn.style.opacity = "0.45";
      } else {
        activeAccess.add(value);
        btn.classList.add("active");
        btn.style.opacity = "1";
      }
      renderMapMarkers();
    };
    accessContainer.appendChild(btn);
  });
}


/* SERACH */
/* addEventListener("input", handler) fires on every
   keystroke as user typesfor instant results.
   e.target.value is the current text in the input.
   .toLowerCase().trim() normalises for comparison. */
document.getElementById("search").addEventListener("input", e => {
  searchTerm = e.target.value.toLowerCase().trim();
  renderMapMarkers();
});


/* LOAD */
fetch("./data/DundeeRecoveryServices.json")
  .then(res => res.json())
  .then(rawData => {
    transformServices(rawData);
    renderMapMarkers();
  })
  .catch(err => {
    console.error("Failed to load services:", err);
  });


/*© 2026 Shannon Martin. All rights reserved. Created as part of a prototype services-mapping application.*/