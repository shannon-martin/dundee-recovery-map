# Investigating Deprivation and Community Intervention in Dundee

[![Report](https://img.shields.io/badge/Read_Report-blue?style=for-the-badge)](./report/)
[![PDF](https://img.shields.io/badge/Download-PDF-red?style=for-the-badge&logo=adobeacrobatreader)](./report/Investigating_Deprivation_and_Community_Intervention_in_Dundee.pdf)

This project was undertaken as the final group data analysis project for the Women and Future Skills Programme, Dundee (2025), contributing to our SCQF Level 8 Data Science accreditations. Our project work comprised two goals: The first was analytical, by using open data to map deprivation, health outcomes, and the reach of intervention programmes across the city. The second was practical, responding to a direct request from Parish Nursing Dundee - a community organisation, to help them rebuild a digital tool that was previously available but became unaffordable to maintain. These two goals were not separate, as the analysis we conducted provides the evidence base that demonstrates why the tool matters, and the tool itself represents a practical response to the challenges the analysis reveals.

# Dundee Recovery Map Prototype
An interactive web application mapping mental health, addiction, housing, food provision, and wellbeing support services across Dundee, built in response to a request from Parish Nursing Dundee.

## Project context
This prototype was produced as part of a group data analysis project examining child poverty, mental health, and substance-related harm across Dundee and the Tay Cities region. The broader project also includes Excel and Power BI dashboards, an ArcGIS StoryMap, Python statistical analysis, and an updated service leaflet designed in Canva.

## What this prototype does
This prototype demonstrates that a fully functional replacement can be built and hosted at zero ongoing cost using open-source tools.

**Features:**
- Interactive map of 400+ Dundee support services (Leaflet.js + OpenStreetMap)
- Filter by day of week, service category, cost, target group, and access type
- Day-aware open/closed/hours-not-confirmed/by-appointment status
- Open today / open now detection
- Multi-session popups with per-session details
- Sidebar panel for UK/Scotland-wide remote services
- Marker clustering for overlapping services
- Responsive layout for mobile views
- Real service data for Dundee
- Backed by a Python data pipeline: cleaning, geocoding, JSON export


## My Contributions
**Project Management**: Led the overall direction and coordination of the project from initial scoping through to final submission. Responsibilities included facilitating group discussions, maintaining the project timeline, assigning and tracking work across the team, and ensuring all outputs were delivered to a consistent standard.

**Application Prototype Development**: Designed and built the Dundee Recovery Road Map web prototype using open-source tools, with zero-cost deployment in mind. This included developing the Python data pipeline used to clean, geocode, and structure service data for over 400 local services into a JSON dataset powering a live interactive map. The prototype allows users to filter services by day of the week, service type, and target demographic, and was designed to be easily updateable if the underlying dataset is expanded to support long-term sustainability.

**Report Collation and Writing**: Responsible for compiling the final group report, integrating contributions from all six members into a single coherent document, and contributing to framing the report's overall narrative and structure. This included writing connecting sections to contextualise our analytical work that follows.

## Data
Service data was initially collated by the data lead in our project team from publicly available sources including the Parish Nursing Dundee printed directory, individual organisation websites, and direct verification with services. Data was then processed through a Python cleaning script that standardises and validates fields, geocodes addresses via Nominatim, and exports clean JSON for the web application. Data is used with the knowledge of Parish Nursing Dundee for educational and community benefit purposes. All contact details are publicly listed by the respective organisations.


## Rights & Usage
This repository contains a prototype developed by me as part of a wider group project. No licence is granted for reuse, redistribution, or commercial use of the code or derived datasets without explicit permission.  
The prototype may be shared for non-commercial evaluation or demonstration purposes only.  
© 2026 Shannon Martin. All rights reserved.
