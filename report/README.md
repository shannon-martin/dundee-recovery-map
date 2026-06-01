# Investigating Deprivation and Community Intervention in Dundee
Dundee has some of Scotland’s highest rates of child poverty, substance-abuse, and mental health issues, yet it also has hundreds of community support services – many of them poorly signposted, difficult to find, and not listed anywhere accessible. This project examines the first problem by combining spatial mapping, statistical analysis, and interactive dashboards to analyse deprivation and intervention across Dundee and the wider Tay Cities, then begins to address the second by exploring practical community outcomes.

# Contents

- [Project Overview](#project-overview)
  - [Group Members](#group-members)
- [Background](#background)
- [Legal, Social, Ethical, and Professional Issues](#legal-social-ethical-and-professional-issues)
- [Equality, Diversity, and Inclusion Considerations](#equality-diversity-and-inclusion-considerations)
- [Data Sources](#data-sources)
- [Deprivation](#deprivation)
  - [Child Poverty](#child-poverty)
  - [Mental Health](#mental-health)
    - [Inpatient Hospitalisations in Scotland: Dundee City Focus (1997/98–2023/24)](#inpatient-hospitalisations-in-scotland-dundee-city-focus-199798202324)
  - [Substance Abuse](#substance-abuse)
    - [Alcohol-Related Hospital Admissions in Scotland: Dundee City Focus (1997/98–2023/24)](#alcohol-related-hospital-admissions-in-scotland-dundee-city-focus-199798202324)
- [Intervention](#intervention)
  - [Community Services](#community-services)
    - [Mapping and Analysis of Community Support Service Accessibility and Provision](#mapping-and-analysis-of-community-support-service-accessibility-and-provision)
  - [Prevention and Treatment](#prevention-and-treatment)
    - [Dundee Alcohol & Drug Partnership: Performance Overview 2022–2025](#dundee-alcohol--drug-partnership-performance-overview-20222025)
    - [Local Mental Health Service Performance and Geographical Inequality (2022–2025)](#local-mental-health-service-performance-and-geographical-inequality-20222025)
    - [ADP Framework Analysis: Progress, Risk and Deprivation](#adp-framework-analysis-progress-risk-and-deprivation)
  - [StoryMap Personas](#storymap-personas)
    - [Impact of Accessible Community Services](#impact-of-accessible-community-services)
- [Parish Nursing Dundee](#parish-nursing-dundee)
  - [Stakeholder Engagement and Problem Definition](#stakeholder-engagement-and-problem-definition)
  - [Dundee Recovery Map Prototype](#dundee-recovery-map-prototype)
    - [Overview](#overview)
    - [Looking into the Future](#looking-into-the-future)
    - [Development Process](#development-process)
  - [Recovery Leaflet Re-Design](#recovery-leaflet-re-design)
- [References](#references)


# Project Overview
This project was undertaken as the final group data analysis project for the Women and Future Skills Programme, Dundee (2025-2026), contributing to our SCQF Level 8 Data Science accreditations. Our group of six approached the project with goal to conduct analysis that not only demonstrates the skills we have learned during the programme, but to also provide valuable information to the communities we live and work within. From our initial discussions, we identified Dundee's challenges of child poverty, mental health pressures, and substance-related harm as a focus area.
Our project work comprises two goals: The first is analytical, by using open data to map deprivation, health outcomes, and the reach of intervention programmes across the city. The second is practical, responding to a direct request from Parish Nursing Dundee - a community organisation, to help them rebuild a digital tool that was previously available but became unaffordable to maintain. These two goals are not separate, as the analysis we have conducted provides the evidence base that demonstrates why the tool matters, and the tool itself represents a practical response to the challenges the analysis reveals.
We are a team of women at various stages of retraining and upskilling in data skills. We have tried to approach this work with the same care we would want applied if our own communities were being studied by framing our findings constructively and focusing on what is working and where opportunity lies, and treating the data not as abstract statistics but as descriptions of real people’s lives and experiences.


## Group Members
| Member                | Role             | Responsibilities                                                            | Primary Tools                             |
|-----------------------|------------------|-----------------------------------------------------------------------------|-------------------------------------------|
| Shannon Martin        | Project Manager  | Communication, Data Management, Application Development, and Report Writing | Python, HTML, CSS, JavaScript, GitHub     |
| Fiona Maclean         | Data Lead        | Data Sourcing, Research, Analysis, and Report Writing                       | Excel, Power BI                           |
| Inna Yeromonko        | Excel Lead       | Data Sourcing, Research, Analysis, and Report Writing                       | Excel, Power BI                           |
| Judit Remenyi         | Python Lead      | Data Sourcing, Research, Analysis, Code Documentation, and Report Writing   | Python, Power BI                          |
| Michelle Gallacher    | Research Lead    | Data Sourcing, Research, Analysis, and Report Writing                       | Excel, Power BI                           |
| Roksolana Stefanyshyn | GIS Lead         | Data Sourcing, GIS, Presentation, and Report Writing                        | ArcGIS Online, Canva                      |
> *Table 1: Our project group members and respective roles.*

# Background
Dundee’s challenges are well-documented in data. A briefing note for Dundee City, using the Scottish Index of Multiple Deprivation (SIMD) 2020 data, confirms that 70 out of Dundee’s 188 data zones are ranked within the 20% most deprived in Scotland. The Dundee Poverty Profile 2025 report puts this into perspective by using the data zones ranked within the 20% Most Deprived in the 2020 SIMD along with the 2022 mid-year small area population estimates, to estimate that 54,488 people (36.7%) of those who live in Dundee City live in a data zone ranked within the 20% most deprived. A figure which has risen compared to 53,435 (36.0%) in SIMD 2016.
The impact on children is of particular concern, as End Child Poverty’s 2023/24 estimates (Stone, 2025), found that 7,041 (26.1%) of children in Dundee City were living in poverty after housing costs. This is notably higher than the overall Scottish proportion which stood at 23%, indicating that deprivation is both widespread and being passed down through generations. Pressure on children’s and adolescent’s mental health services adds further concern. NHS Tayside data from Child and Adolescent Mental Health Waiting Times published by Public Health Scotland (2025) show 222 children and young people were awaiting treatment in December 2025, an increase of 20.7% from 184 at the same time in December 2024, reflecting a growing demand on services.
The consequences of sustained poverty are also visible in health data. The Dundee Alcohol and Drug Partnership’s Strategic Framework 2023-2028 notes that nationally, people in the most deprived areas were 15.3 times more likely to die from drug use than those in the least deprived areas. It also states that in Dundee in 2021, more than half of all drug-related deaths occurred in areas of greatest socioeconomic deprivation. National Records of Scotland’s report Drug-related deaths in Scotland, 2024 further confirms that, after adjusting for age, Dundee City had one of the highest rates of drug misuse deaths in Scotland over the period 2020-2024, alongside Glasgow and Inverclyde. 

It was this context that shaped the direction of our project, as these figures raised a practical question:  
**If need is this concentrated and well-documented, how effectively does existing provision respond to it?**  

In exploring this question, along with direct engagement with community organisations, our project’s analytical work examines deprivation, health outcomes, and service reach across Dundee and neighbouring Tay Cities to inform our practical outputs which include up-to-date digital resources to help direct and signpost people in crisis to the support available to them.

---

# Legal, Social, Ethical, and Professional Issues
Data projects involving sensitive public health and social information carry significant responsibilities. Our project covers child poverty, substance use, and mental health, which are all issues affecting real people, and so our analysis was conducted with care and respect to related legal, social, ethical, and professional considerations.  

Legally, all datasets used are published under the Open Government Licence v3.0 (OGL), permitting free use and adaptation provided the source is acknowledged. Every dataset is recorded in our data source tracker with its licence confirmed before use. No personal or individual-level data is used in this project. All analysis is conducted on data aggregated to datazone, council area, or NHS Board level, ensuring that no individuals can be identified. Where data providers have applied suppression to small counts, we have respected this and acknowledged them as limitations rather than attempting to infer hidden values from surrounding data.  

Socially, the topics that our project investigates, including drug-related deaths, mental health crises, and child poverty are all real, lived experiences, and so our analysis focuses solely on systemic factors: poverty, trauma, inadequate access to service services, and other structural inequalities. It does not focus on individual choices or behaviours, and avoids language or framing that could reinforce any stigma that already surrounds these issues.  

Ethically, we are clear about what our analysis can and cannot claim. Where we identify any relationship between variables, we acknowledge that this is a statistical association, not proof of causation. We also acknowledge that some of our data, including SIMD 2020, is over six years old and may not fully reflect communities that have changed since then. We supplement it with more recent sources where available, including the Dundee Poverty Profile 2025, and Public Health Scotland's most recent publications.  

Professionally, all analysis performed is reproducible. Python notebooks are clean, fully commented, and executable top to bottom. Every statistic and claim in this report is traceable to a cited source in the data source tracker. Code and documents are version-controlled in our shared GitHub project repository. As learners conducting an educational project rather than professional researchers, our recommendations are presented as suggestions for consideration - not definitive policy conclusions, and our findings are reported with appropriate modesty about their scope and authority.

---

# Equality, Diversity, and Inclusion Considerations
These considerations ask us to reflect on who is represented in our data and analysis, whose voices are absent, and whether our research treats all groups fairly. Our data tells us where deprivation, poor health outcomes, and service gaps are concentrated geographically, but it cannot easily tell us how those experiences differ across gender, ethnicity, disability, or other individual characteristics within the same area. We acknowledge this limitation throughout and do not treat poverty or poor health as uniform experiences. The people most affected by the issues we analyse, including those experiencing poverty, substance use, or mental health crises are not directly present in our analysis. We also note this and recognise that any meaningful, lasting improvement to service provision in Dundee and the other Tay cities will require cooperation with affected communities, not analysis of them alone.  

All our outputs are designed to be accessible, we provide plain-English labels and descriptions throughout all visualisations, along with contextualising statistics so that a member of the public without a data background can easily understand our findings.

---

# Data Sources
| Dataset | Topic | Source | Time Period | Licence | Geography | Format |
|---------|-------|--------|-------------|---------|-----------|--------|
| [Scottish Index of Multiple Deprivation (SIMD) 2020](https://www.gov.scot/collections/scottish-index-of-multiple-deprivation-2020/) | Deprivation / Child Poverty | Scottish Government | 2020 | OGL v3.0 | Datazone | CSV, Shapefile |
| [Drug-Related Deaths in Scotland](https://www.nrscotland.gov.uk/publications/drug-related-deaths-in-scotland-2024/) | Substance Harm | National Records of Scotland (NRS) | 2000–2023 | OGL v3.0 | Local Authority | Excel (.xlsx) |
| [Drug-Related Hospital Statistics](https://www.opendata.nhs.scot/dataset/drug-related-hospital-statistics-scotland) | Substance Harm / Mental Health | Public Health Scotland | 1996–2025 | OGL v3.0 | NHS Board / Local Authority | CSV |
| [Scotland's Census 2022](https://www.scotlandscensus.gov.uk/2022-reports/) | Population / Demographics | National Records of Scotland (NRS) | 2022 | OGL v3.0 | Datazone | CSV |
| [Data Zone Boundaries 2011](https://www.data.gov.uk/dataset/ab9f1f20-3b7f-4efa-9bd2-239acf63b540/data-zone-boundaries-2011) | GIS | Scottish Government | 2011 | OGL v3.0 | Datazone | CSV, Shapefile |
| [Child Poverty Pathfinders in Dundee and Glasgow: Phase Two Evaluation](https://www.gov.scot/publications/phase-2-evaluation-child-poverty-pathfinders-dundee-glasgow/) | Child Poverty / Early Intervention | Scottish Government | 2022–2025 | OGL v3.0 | Dundee | PDF (Report) |
| [Fairness and Local Child Poverty Plan 2024/25](https://www.dundeecity.gov.uk/sites/default/files/Final%20191-2025%20Fairness%20and%20Local%20Child%20Poverty%20Action%20Plan%20-%20Annual.pdf) | Child Poverty | Dundee City Council | 2024–2025 | OGL v3.0 | Dundee | PDF (Report) |
| [Dundee Poverty Profile 2025](https://www.dundeecity.gov.uk/sites/default/files/Dundee_Poverty_Profile_2025.pdf) | Poverty | Dundee City Council | 2025 | OGL v3.0 | Ward / Local Authority | PDF (Report) |
| [Child and Adolescent Mental Health Services (CAMHS) Waiting Times](https://publichealthscotland.scot/publications/child-and-adolescent-mental-health-services-camhs-waiting-times/child-and-adolescent-mental-health-services-camhs-waiting-times-quarter-ending-september-2025/) | Mental Health | Public Health Scotland | 2025 | OGL v3.0 | NHS Board | PDF (Report) / CSV |
| [Mental Health Inpatient Activity](https://publichealthscotland.scot/publications/mental-health-inpatient-activity/mental-health-inpatient-activity-10-december-2024/data-explorer/) | Mental Health | Public Health Scotland | 1997–2024 | OGL v3.0 | Local Authority / NHS Board | CSV |
| [Alcohol Related Hospital Statistics](https://publichealthscotland.scot/publications/alcohol-related-hospital-statistics/alcohol-related-hospital-statistics-scotland-financial-year-202223/) | Substance Harm / Alcohol Misuse | Public Health Scotland | 2022–2023 | OGL v3.0 | Local Authority / NHS Board | Excel (.xlsx) |
| [Mental Health Services Performance Indicators 2025–26 Quarter 2](https://www.dundeehscp.com/mental-health-services-performance-indicators-2025-26-quarter-2) | Intervention | Dundee Health and Social Care Partnership | 2025–2026 | OGL v3.0 | Dundee | PDF |

> *Table 2: Reports and datasets used or referenced throughout our project.*

**Data Quality Notes**:
- Some statistical disclosure control has been applied to Public Health Scotland datasets to protect patient confidentiality.  
- Scottish Index of Multiple Deprivation (SIMD) 2020 is over 6 years old, and so may not fully reflect current deprivation statistics.

---

# Deprivation

## Child Poverty
Child poverty became one of the main themes in our project because it is closely connected to many of the wider challenges affecting Dundee and the Tay Cities, including deprivation, housing insecurity, mental health pressures, educational inequality, and uneven access to support services. Looking at child poverty gave us a clear way to bring these connected issues together and to show that they should not be treated in isolation. As part of the project, we developed a child poverty dashboard to bring key indicators, local patterns, and regional comparisons into one visual tool. We wanted the dashboard show how child poverty varies by place, how it overlaps with deprivation, and why local context matters when interpreting the figures.
The dashboard brings together several related measures. These include Dundee's child poverty rate after housing costs, child poverty rate before housing costs, absolute child poverty rate before housing costs, and the percentage of children living in the 20% most deprived areas according to the Scottish Index of Multiple Deprivation. It also includes comparison data for Angus, Dundee City, Fife, and Perth and Kinross, alongside ward-level child poverty data for Dundee and trend data showing how rates have changed across the Tay Cities over time.  

These measures were compiled from publicly available national and local sources, including Dundee City Council publications, Dundee poverty profile data, Department for Work and Pensions child poverty statistics, and SIMD-based deprivation data. Bringing these sources together allowed us to move from a single headline figure to a more rounded view of how child poverty is experienced across the area. The dashboard clearly shows that child poverty in Dundee forms part of a wider pattern of inequality rather than being a stand-alone issue. The headline figures show that 26.1% of children in Dundee were living in poverty after housing costs, 18.7% were living in relative poverty before housing costs, 14.8% were living in absolute poverty before housing costs, and 43.4% of children were living in areas ranked within the 20% most deprived SIMD areas. These figures are important for two reasons. First, they show the extent to which housing costs affect the reality of poverty for families. Second, they show that a large proportion of Dundee's children are growing up in neighbourhoods where disadvantage is already concentrated.  

The comparison charts place Dundee within the wider Tay Cities context. They show how Dundee compares with Angus, Fife, and Perth and Kinross, while the ward-level analysis highlights that child poverty is not evenly distributed across the city. In our local dashboard, wards such as Coldside, East End, and Maryfield emerge as areas facing the greatest pressure, while The Ferry and West End show substantially lower levels. The trend view adds a further layer by showing how child poverty rates changed between 2022 and 2025 across the Tay Cities authorities. This helps distinguish between short-term movement in the data and more persistent patterns over time. From a political point of view, this matters because long-term inequality requires a different response from a temporary rise or fall in the figures.  

Taken together, the dashboard functions as an evidence tool rather than just a visual output. It brings together city-wide indicators, regional comparison, and neighbourhood-level analysis in a way that is accessible and practical. More importantly, it supports one of the central points of our project: child poverty should not be understood as a single number in isolation, but as a place-based and multi-dimensional issue shaped by deprivation, family circumstances, housing pressures, health, and access to support.  


![Figure 1](figures/figure1.png)
> *Figure 1: ArcGIS Dashboard visualising child poverty in Dundee and neighbouring Tay Cities.*

---

## Mental Health
### Inpatient Hospitalisations in Scotland: Dundee City Focus (1997/98–2023/24)

#### Aim of the analysis
This analysis examines long-term trends in mental health inpatient activity in Scotland, with a specific focus on Dundee City. The main aim is to assess how Dundee compares with Scotland overall and whether differences persist over time.

The analysis also explores:
- Differences between psychiatric and non-psychiatric admissions.
- Dundee’s position relative to other council areas in 2023/24.
- Whether observed patterns are driven by a specific type of inpatient activity or are more general across mental health care.

#### Data and methods

##### **Data sources**

The analysis used Mental Health Inpatient and Day Case Statistics (MHRHS), covering Scottish general and psychiatric hospitals from financial year 1997/98 to 2023/24.

Although the source dataset includes day cases, this analysis focuses exclusively on inpatient activity.

Patient rates are reported per 100,000 population. Council-level rates are taken directly from the published datasets. Scotland-level rates are derived by averaging age-specific patient rates to provide a consistent national comparator.

Rates are suitable for comparison over time and between areas within Scotland, but they are not directly equivalent to European age-standardised rates.

Two datasets were used:
- Council area–level patient rates by admission type  
- National age- and sex-specific rates, used to derive Scotland-level comparisons  

##### **Data preparation**
- Council area codes were mapped to readable council names.
- Admission types were grouped as:
  - Psychiatric (SMR04)
  - Non-psychiatric (SMR01)
  - Combined (total inpatient activity)
- Quality flag variables and unused fields were removed.
- Data types were checked and standardised.
- Cleaned datasets were exported for reproducibility.

##### **Study design**
- Main comparisons focus on Dundee City versus Scotland.
- Trends were assessed over the full period (1997/98–2023/24).
- Analyses primarily use combined psychiatric and non-psychiatric admissions unless stated otherwise.
- Additional breakdowns examine psychiatric and non-psychiatric trends separately.
- A difference analysis (Dundee minus Scotland) was used to quantify excess inpatient rates.
- A council-level comparison was produced for 2023/24.
- The analysis is descriptive; no statistical modelling was applied.

##### **How Scotland-level and council-level rates were calculated**

Scotland-level rates were calculated from age-specific national data by averaging patient rates across age groups for each year. Council-level rates, including Dundee City, were taken directly from the council-area dataset and averaged where needed within each year.

Both sets of rates:
- Use the same underlying national dataset
- Apply consistent admission definitions
- Cover the same time period

*Minor technical differences in aggregation do not affect the overall patterns or conclusions.

---

#### Results
##### Overall trends: all mental health inpatient admissions in Dundee City vs Scotland (Figure 2)  
Mental health inpatient rates have changed substantially over time in both Dundee City and Scotland. Across the full time period, Dundee City records consistently higher mental health inpatient rates than the Scottish average.
Although rates decline in both Dundee and Scotland over time, the gap between Dundee and the national average persists, indicating a long-standing difference rather than short-term variation. This indicates that Dundee’s higher rates are not driven by short-term fluctuations but reflect longer-standing differences in population need, service use, or both.

![Figure 2](figures/figure2.png)
> *Figure 2: Mental health inpatient rates (total cases), Dundee City vs Scotland, 1997/98–2023/24.
Standardised patient rates per 100,000 population for total inpatient activity (combining psychiatric and non-psychiatric admissions).*

#####  Dundee City: psychiatric vs non-psychiatric activity (Figure 3)  
Within Dundee City, both psychiatric and non-psychiatric admissions contribute to overall inpatient activity. Psychiatric admissions show higher and more variable rates over time, while non-psychiatric admissions occur at substantially lower levels and show more modest change.  
Overall trends in Dundee are therefore driven primarily by psychiatric inpatient activity.

![Figure 3](figures/figure3.png)
> *Figure 3: Psychiatric vs non-psychiatric inpatient rates in Dundee City, 1997/98–2023/24.
Standardised patient rates per 100,000 population for psychiatric and non-psychiatric mental health inpatient admissions in Dundee City.*

##### Excess mental health inpatient admissions in Dundee relative to Scotland (Figure 4)  
By subtracting the Scottish inpatient rate from the Dundee rate, the analysis highlights the size and persistence of Dundee’s excess mental health inpatient hospitalisations.
The difference between Dundee and Scotland remains positive across most of the time period. Dundee rarely falls below the national average. The size of the gap varies over time but remains persistent. This indicates a sustained inequality in mental health inpatient burden.

![Figure 4](figures/figure4.png)
> *Figure 4: Excess mental health inpatient hospitalisation rates in Dundee City relative to Scotland, 1997/98–2023/24.
Difference in standardised mental health inpatient rates per 100,000 population (Dundee minus Scotland).
Values above zero indicate higher rates in Dundee than the national average. The dashed horizontal line marks parity with the national average.*

##### Psychiatric-only mental health admissions: Dundee City versus Scotland (Figure 5)  
For psychiatric mental health admissions, both Dundee and Scotland show marked decrease over time.
For psychiatric admissions only, Dundee records consistently higher psychiatric inpatient rates across most of the time series, suggesting sustained pressure on specialist mental health services relative to the national picture.

![Figure 5](figures/figure5.png)
> *Figure 5: Psychiatric inpatient rates, Dundee City vs Scotland, 1997/98–2023/24.*

##### Non-psychiatric mental health admissions: Dundee City versus Scotland (Figure 6)  
For non-psychiatric mental health admissions, rates are substantially lower than for psychiatric admissions in both Dundee and Scotland.
Although Dundee remains above the national average in most years, the difference is smaller than for psychiatric admissions. This reinforces the finding that psychiatric inpatient care is the main driver of Dundee’s relative excess.

![Figure 6](figures/figure6.png)
> *Figure 6: Non-psychiatric inpatient rates, Dundee City vs Scotland, 1997/98–2023/24.*

##### Dundee within Scotland: council area comparison, 2023/24 (Figure 7)  
Council-level comparisons for 2023/24 show wide variation in mental health inpatient hospitalisation rates across Scotland.
In 2023/24, council-level variation is clear:  
-	Dundee City records the highest inpatient rates in Scotland.
-	Fife records the 2nd highest inpatient rates in Scotland.
-	Neighbouring councils such as Angus and Perth and Kinross record lower rates and sit closer to the national average.
-	Many council areas cluster closer to the national average.  
This pattern indicates that Dundee’s higher inpatient rates are not shared evenly across the region and are not simply a feature of Tayside as a whole.

![Figure 7](figures/figure7.png)
> *Figure 7: Mental health inpatient hospitalisation rates by council area, Scotland, 2023/24.
Standardised patient rates per 100,000 population for combined psychiatric and non-psychiatric mental health inpatient admissions. Dundee City is highlighted in red, Tayside cities are highlighted in blue, and Scottish average shown for reference.*

---

#### Alignment with policy and system changes (context, not causation)
Several major changes in mental health policy and service delivery occurred during the study period. While this analysis cannot establish causality, the observed trends align in time with key system shifts.  

**Late 1990s to early 2000s: higher inpatient use**  
-	Greater reliance on inpatient care for mental health conditions
-	Fewer community-based alternatives
-	Higher levels of unmet need in deprived urban areas

**Mid-2000s to 2010s: declining inpatient admissions**  
-	Expansion of community mental health teams
-	Policy focus on care in the community rather than hospital settings
-	Reductions in psychiatric bed numbers across Scotland

**Recent years: persistent local inequalities**  
-	Overall inpatient rates remain lower than historic levels
-	Dundee continues to record higher rates than Scotland overall
-	Suggests that service redesign alone has not removed underlying differences in need

Overall inpatient rates have declined substantially since the early 2000s, consistent with national policy shifts towards community-based mental health care and reductions in psychiatric bed numbers. However, Dundee continues to record higher inpatient rates than Scotland overall, particularly for psychiatric admissions. The persistence of this difference over more than two decades suggests long-standing, place-based factors operating alongside national trends in service provision, rather than short-term or policy-specific effects.

#### Limitations
**Descriptive analysis only**: No statistical testing or causal inference was performed.
**Hospital-based data**: The analysis captures inpatient and day case activity only and does not reflect community mental health care, primary care contacts, or unmet need.
**No adjustment for deprivation or morbidity**: Differences may reflect population health and socioeconomic factors rather than service performance.
**Changes in service models over time**: Reductions in inpatient rates may reflect policy-driven changes in care pathways rather than changes in mental health prevalence.
**Scotland-level estimates**: Scotland-level estimates are derived from age-structured data rather than a directly equivalent council dataset.
**Differences in dataset structure**: Differences in dataset structure may introduce minor inconsistencies in absolute values.

#### Conclusion
Dundee City has experienced persistently higher mental health inpatient hospitalisation rates than Scotland overall for more than two decades.
Key findings include:  
-	Dundee’s excess inpatient rates are long-standing and sustained.
-	The gap is driven primarily by psychiatric admissions.
-	National inpatient rates have declined, but local inequalities remain.
-	Neighbouring Tayside councils do not show the same level of inpatient activity.  

National mental health reforms have reduced reliance on inpatient care across Scotland but have not eliminated persistent local differences. Addressing mental health inequalities in Dundee is therefore likely to require targeted, place-specific approaches alongside national policy initiatives.

---

## Substance Abuse

### Alcohol-Related Hospital Admissions in Scotland: Dundee City Focus (1997/98–2023/24)

####	Aim of the analysis
This analysis examined long-term trends in alcohol-related hospital admissions in Scotland, with a specific focus on how **Dundee City compares with the wider Tayside area and Scotland overall**. The aim was to identify whether Dundee experiences a consistently higher admission rates due to alcohol-related issues and whether this pattern changes over time or by clinical category. Additionally, we wanted to assess whether Dundee’s higher admission rates reflect a broader regional pattern or whether Dundee stands out within its local health system.

####	Data and methods
##### Data source
The analysis used Alcohol-Related Hospital Statistics (ARHS), covering general acute and psychiatric hospital admissions in Scotland from 1997/98 to 2023/24.
Rates are reported as European Age-Standardised Rates (EASR) per 100,000 population, which allows fair comparison across places and years.
Study design
-	National trends were assessed using Scotland-level data.
-	Local comparisons focused on Dundee City versus Scotland.
-	The Tayside comparator group included Dundee City, Angus, Perth and Kinross and Fife.
-	Additional comparisons examined Dundee against all other council areas in 2023/24.
-	Analyses used combined psychiatric and non-psychiatric admissions unless stated otherwise.
-	Condition-specific comparisons used mean EASR across all years.
  
*No statistical modelling was applied; the analysis is descriptive.

---

#### Results
##### National trends (Figure 8)
Alcohol-related hospital admission rates in Scotland show large changes over time, with a general rise from the late 1990s into the mid-2000s, followed by periods of stabilisation and decline. Despite some reduction from peak levels, rates remain high in recent years, indicating that alcohol-related harm continues to place pressure on hospital services.

![Figure 8](figures/figure8.png)
> *Figure 8: National trends in alcohol-related hospital admissions, Scotland, 1997/98–2023/24.
European age-standardised rates (EASR) of alcohol-related hospital admissions per 100,000 population in Scotland, combining general acute and psychiatric admissions, from 1997/98 to 2023/24.*

##### Dundee City versus Scotland: all alcohol conditions (Figure 9)
Across the entire time series, **Dundee City consistently records higher alcohol-related hospital admission rates than the Scottish average**. The gap between Dundee and Scotland is persistent rather than temporary, suggesting long-standing local or structural factors rather than short-term fluctuations.

![Figure 9](figures/figure9.png)
> *Figure 9: Alcohol-related hospital admission rates: Dundee City compared with Scotland, 1997/98–2023/24.
Comparison of alcohol-related hospital admission rates (EASR per 100,000) between Dundee City and Scotland overall, 1997/98–2023/24.*

##### Mental and behavioural disorders due to alcohol (Figure 10)
Differences between Dundee and Scotland are **even more pronounced** for alcohol-related mental and behavioural disorders. Dundee’s admission rates exceed the national average in most years, indicating a disproportionate concentration of alcohol-related mental health harm and sustained pressure on psychiatric services.

![Figure 10](figures/figure10.png)
> *Figure 10: Alcohol-related mental and behavioural disorder hospital admissions: Dundee City compared with Scotland, 1997/98–2023/24.
European age-standardised rates (EASR per 100,000) of hospital admissions for mental and behavioural disorders due to alcohol, comparing Dundee City with Scotland overall, 1997/98–2023/24.*

##### Excess admissions in Dundee (Figure 11)
By directly subtracting the Scottish rate from the Dundee rate, the analysis shows that **Dundee’s excess admission rate is sustained over time**.
Although the size of the gap varies, Dundee rarely falls to or below the national average.

![Figure 11](figures/figure11.png)
> *Figure 11: Excess alcohol-related hospital admissions in Dundee City relative to Scotland, 1997/98–2023/24.
Difference between Dundee City and Scotland alcohol-related hospital admission rates (Dundee minus Scotland), expressed as excess EASR per 100,000 population, 1997/98–2023/24.
Values above zero indicate higher rates in Dundee, values below zero indicate lower rates in Dundee than national average. The dashed horizontal line at zero indicates years when Dundee City and Scotland had the same rate.*

##### Condition-specific comparison (Figure 12)
When averaging rates across the full period:
-	Dundee shows higher admission rates for most alcohol-related conditions
-	The pattern is broad, not driven by a single diagnosis
This indicates that Dundee’s higher rates reflect system-wide alcohol-related harm, rather than one specific clinical category.

![Figure 12](figures/figure12.png)
> *Figure 12: Mean alcohol-related hospital admission rates by condition, Dundee City compared with Scotland, 1997/98–2023/24.
Mean European age-standardised rates (EASR) of alcohol-related hospital admissions by diagnostic category, averaged across all years (1997/98–2023/24), comparing Dundee City with Scotland overall.
Each horizontal line represents a condition, with points indicating the average rate in Dundee City and in Scotland. Conditions are ordered by the average rate in Dundee City. Differences between the two points illustrate where hospitalisation rates in Dundee City are higher or lower than the national average.*

##### Dundee within Tayside: Council area comparison, 2023/24 (Figures 13 and 14)
Council-level comparisons for 2023/24 show clear variation within Tayside:
- Dundee City records substantially higher admission rates than:
  - Angus
  - Perth and Kinross
  - Fife
- Other Tayside councils cluster closer to the Scottish average.
- Dundee sits well above both the Tayside cluster and the national rate.
- Dundee ranks among the highest council areas for alcohol-related admissions overall.
- Dundee sits well above the Scottish average


![Figure 13](figures/figure13.png)
> *Figure 13: Alcohol-related hospital admissions across Tayside council areas, 2023/24.
Alcohol-related hospital admission rates (EASR per 100,000 population) for Dundee City, Angus, Perth and Kinross, and Fife in 2023/24 with the Scottish average shown for reference.
Dundee City is highlighted in red, Tayside council areas are highlighted in blue and the dashed vertical line indicates the Scotland national average for the same year. Council areas are ranked from highest to lowest rate.*

The same pattern appears **for alcohol-related mental and behavioural disorder admissions**:
-	Dundee records markedly higher rates than other Tayside councils.
-	Angus, Perth and Kinross, and Fife remain closer to the Scottish average.
-	The mental health gap within Tayside is larger than the gap between most other councils.
This indicates that Dundee’s high admission rates are not shared evenly across the region

![Figure 14](figures/figure14.png)
> *Figure 14: Alcohol-related mental and behavioural disorder admissions across Tayside council areas, 2023/24.
Hospital admission rates for mental and behavioural disorders due to alcohol (EASR per 100,000 population) across Tayside council areas in 2023/24.
Dundee City is highlighted in red, Tayside council areas are highlighted in blue and the dashed vertical line indicates the Scotland national average for the same year. Council areas are ranked from highest to lowest rate.*

---

#### Alignment with policy and system changes (context, not causation)
Several major changes in alcohol policy and health services occurred during the study period. The trends seen here align in time with some of these shifts, although this analysis cannot prove cause and effect.
**Early 2000s: rising admissions**  
-	Increased alcohol affordability and consumption across Scotland
-	Limited availability of specialist alcohol services
-	High levels of social deprivation in cities such as Dundee  
These factors plausibly align with the sharp rise in admissions during this period.  

**Late 2000s to early 2010s: stabilisation**  
-	Expansion of alcohol brief interventions within NHS Scotland
-	Greater focus on community-based addiction services
-	Stronger public health framing of alcohol-related harm

**Post-2018: moderation of trends**  
-	Introduction of Minimum Unit Pricing (MUP) in Scotland
-	Strongest effects seen in reduced consumption rather than immediate hospital admissions  

The persistence of high rates in Dundee suggests that **pricing policy alone does not offset long-standing social and health inequalities**. Dundee’s continued divergence from neighbouring Tayside councils indicates that **national policies alone do not address local drivers**, such as deprivation, long-term morbidity, and concentrated service demand.

####	Limitations
This analysis has clear limitations:
**Descriptive only**: No statistical testing or causal inference was performed.  
**Hospital admissions only**: The data capture severe harm but miss community-level alcohol problems, primary care contacts, and unmet need.  
**Use of mean rates**: Averaging across years smooths peaks and troughs and may hide short-term effects.  
**No adjustment for deprivation or service access**: The analysis does not adjust for deprivation, population health, or service configuration. Differences may reflect underlying socioeconomic factors rather than healthcare performance.  

####	Conclusion
Dundee City has experienced persistently higher alcohol-related hospital admission rates than both Scotland overall and neighbouring Tayside councils for more than two decades.
Key findings:
-	Dundee’s excess admission rates are long-standing and sustained.
- The gap is strongest for alcohol-related mental health admissions.
-	The pattern remains visible in the most recent data
-	Other Tayside councils do not show the same level of harm.

National policy measures may have moderated overall trends, but they have **not eliminated local inequalities**. Reducing alcohol-related harm in Dundee is likely to require **place-specific action**, rather than reliance on national policy alone.

---

# Intervention
This section looks at what interventions exist across Dundee, how they are distributed relative to need, and what the data says about their effectiveness in reaching people at the most vulnerable points in their lives.

## Community Services
For many people, their journey to recovery starts in a community setting – a food bank, a drop-in chat, or an activity. The graphic below shows how that first contact, when met with support and compassion, can build the trust and routine from which recovery grows.

![Figure 15](figures/figure15.png)
> *Figure 15: Journey showing how service access barriers can affect people seeking support.*

###	Mapping and Analysis of Community Support Service Accessibility and Provision
####	Summary
The dashboard presents an overview of community support services based on a structured mapping derived from the Parish Nursing Recovery Map framework, supplemented with additional food-related and activity-based services identified through publicly available sources. The classification of services reflects this guiding framework, although it does not represent a comprehensive mapping of all services within the local area. Areas such as housing, benefits advice, and debt support were outside the scope of this project due to time and methodological constraints.
Overall, the analysis highlights a service landscape that is predominantly free and broadly accessible, but with variation in temporal availability, demographic targeting, and transparency of information. These factors may influence how easily individuals can identify and access appropriate support within the local area.

![Figure 16](figures/figure16.png)
> *Figure 16: Power BI dashboard visualising the distribution and accessibility of community support services across temporal, demographic, and cost dimensions.*

#### Service Classification and Scope of Mapping
The categorisation of services within this dataset was primarily guided by the structure of the original Parish Nursing Recovery Map, which provided the foundational framework for grouping types of support. This included core categories such as mental health, addiction support, and peer support services.  

Additional categories were incorporated to reflect the broader local support landscape, including food-related services (such as food banks and community larders) and selected activity-based services identified as relevant to community wellbeing and inclusion.  

It is important to note that the dataset does not represent an exhaustive mapping of all available services within the area. Certain types of provision - such as housing support, benefits advice, debt advice, and condition-specific health services - fall outside the scope of this project due to the limitations of a course-based study and the focus of the original recovery map framework. As a result, the analysis reflects a structured but partial representation of local support provision.

#### Service Availability by Day of Week
The analysis of service availability by day of the week demonstrates a clear concentration of provision during weekdays, with Wednesday (84 services) and Thursday (76 services) showing the highest levels of availability. In contrast, weekend provision is significantly lower, with only 22 services available on Saturdays and 11 on Sundays. This suggests that access to support is primarily structured around the standard working week, which may present barriers for individuals requiring support outside typical weekday hours.  

In addition, a number of services are categorised as “Unknown” (30) or “Various” (8), reflecting inconsistencies or gaps in publicly available scheduling information. This lack of clarity may itself impact accessibility, as service users may experience difficulty identifying when support is available.  
Overall, the findings highlight a concentration of services during midweek periods alongside the importance of clear and consistent scheduling information to support accessibility and navigation. 

#### Service Availability by Focus Demographic
The analysis of services by focus demographic indicates that the majority of provision is broadly targeted, with 207 services categorised as supporting “All Ages” and 120 services focused on adults. Comparatively fewer services are explicitly targeted towards young people (18), women (27), older adults (10), men (10), and children (2).  

This distribution suggests that many services are positioned as broadly accessible rather than explicitly targeted toward specific demographic groups, although certain populations appear comparatively less represented within the mapped provision. In particular, services aimed at children and older adults are limited within the dataset.  

A proportion of services (29) were categorised as “Unknown” due to limited or unclear demographic information being publicly available online. It should also be noted that categorisation was based solely on publicly accessible service descriptions, meaning findings reflect visible targeting rather than confirmed eligibility criteria.

#### Service Accessibility by Cost Type
The analysis of service provision by cost type indicates that the majority of mapped services are free to access, with 317 services identified as offering free provision. Comparatively fewer services are categorised as paid (46) or mixed-cost (8), suggesting that most support within the mapped landscape is intended to remain financially accessible.  

Paid services are primarily associated with selected community cafés, food-related provision, and wellbeing or activity-based services, while mixed-cost categories reflect services where elements of provision vary between free and chargeable.  

A further 52 services were categorised as “Unknown” due to unclear or incomplete cost information being publicly available online. As the dataset was compiled using publicly accessible information only, findings reflect the visibility of cost information rather than verified pricing structures.  

Overall, the findings suggest a predominantly free and accessible service landscape, although inconsistent cost transparency may still create uncertainty for individuals navigating available support.  

---

## Prevention and Treatment
Addressing substance-related harm and mental health requires both preventative measures and accessible treatment options. This section examines what prevention and treatment provision looks like across Dundee, and where the data shows unmet need.

### Dundee Alcohol & Drug Partnership: Performance Overview 2022-2025
This analysis examines drug and alcohol service activity in Dundee between 2022 and 2025, with a focus on treatment access and retention, referral patterns across drug and alcohol pathways, the relationship between prevention activity and hospital admissions, and trends in crisis and emergency incidents. The analysis was carried out in Microsoft Excel, and the underlying data was taken from the Dundee Health and Social Care Partnership's Drug and Alcohol Service Indicators 2025–26 Quarter 2 report, published by the Chief Finance Officer and presented to the Performance and Audit Committee. The dashboard below brings together the key findings in a single visual summary.

![Figure 17](figures/figure17.png)
> *Figure 17: Dundee Alcohol & Drug Partnership: Performance Overview Dashboard (2022-2025).*

*Analysis conducted in Microsoft Excel. Data source: Drug and Alcohol Service Indicators 2025–26 Quarter 2 (Dundee Health and Social Care Partnership).

#### Comparison of Treatment Referrals: Drugs vs Alcohol
The referrals comparison chart plots the number of new referrals for drug treatment and for alcohol treatment across each rolling quarter from 2022/23 Quarter 2 through to 2024/25 Quarter 2. The two lines reveal sharply diverging trends over this period.  

![Figure 18](figures/figure18.png)
> *Figure 18: Comparison of Treatment Referrals: Drugs vs Alcohol.*

Alcohol treatment referrals have fallen steadily and substantially, from 654 in 2022/23 Quarter 2 to 453 in 2024/25 Quarter 2, a decline of approximately 31% over two years. Drug treatment referrals, by contrast, have risen across the same period, reaching 606 in the most recent quarter. The practical significance of this crossing is considerable: for the first time in the reporting period, new referrals for drug treatment have meaningfully exceeded referrals for alcohol treatment. The two pathways, which had previously operated at broadly comparable volumes, now represent different trajectories of demand.  

This divergence has implications for how the Dundee Drug and Alcohol Recovery Service (DDARS) allocates capacity between the two pathways. While a reduction in alcohol treatment referrals may partly reflect the impact of prevention work and Alcohol Brief Interventions, it may also reflect changing patterns in how people seek help, or reduced visibility of harm at the early intervention stage. The rising trend in drug referrals, reaching its highest point in the reporting period, reinforces the importance of maintaining and expanding the assertive outreach and rapid access components of the service model for drug treatment.  

#### Access to Treatment vs Service User Retention
The access and retention chart plots two measures simultaneously over the same reporting period: the proportion of people who began treatment within 21 days of referral (the 21-day access standard, shown as a line), and the number of unplanned discharges where service users disengaged from treatment before completion (shown as bars).

![Figure 19](figures/figure19.png)
> *Figure 19: Access to Treatment vs Service User Retention.*

On the access side, performance has improved substantially since the earlier part of the period, rising from 61% in 2022/23 Quarter 2 to a stabilised range of 89% to 94% in more recent quarters. The national standard is 90%, and Dundee has broadly met or closely approached this for sustained periods, reflecting the positive impact of the Medication Assisted Treatment (MAT) standards implementation and same-day access ambitions embedded in the service model.  

However, the retention picture tells a different and more concerning story. Unplanned discharges — where service users disengaged before completing treatment — reached a sharp peak of 353 cases in 2023/24 Quarter 4, at exactly the point when the access rate was at its highest at 94%. This pattern, sometimes described as a scissors effect, reveals a structural tension in the system: the processes that enable rapid intake do not automatically translate into sustained engagement once treatment begins. At the most recent data point, unplanned discharges had stabilised at 275, but this figure remains 31% higher than the 210 recorded two years earlier. Despite the genuine achievement represented by high access rates, the primary challenge for the partnership has shifted towards retention. This points to the need for strengthened psychosocial support, particularly during the first weeks of treatment when disengagement risk is highest.

#### Alcohol Prevention (ABI) vs Hospital Admissions
The prevention and admissions chart plots the number of Alcohol Brief Interventions (ABIs) delivered alongside the number of alcohol-related emergency hospital admissions across the reporting period. ABIs are structured conversations carried out by trained staff in a range of settings, including primary care, emergency departments, and community services, designed to identify risky alcohol use and encourage behaviour change before dependency or crisis develops.

![Figure 20](figures/figure20.png)
> *Figure 20: Alcohol Prevention (ABI) vs Hospital Admissions.*

The number of ABIs delivered has increased over the period, reaching 1,322 in 2024/25 Quarter 2, up from 1,210 in 2022/23 Quarter 2. The number of emergency hospital admissions due to alcohol has remained broadly stable across the same period, fluctuating in a narrow band between 256 and 288, with the most recent figure at 279. The pattern suggests that sustained delivery of ABIs at scale is contributing to holding alcohol-related admissions relatively flat in a city where deprivation levels would otherwise be expected to drive them upward. This does not establish a causal relationship, but the stability of hospital admissions against a background of high population-level need is a positive signal, and is consistent with wider evidence on the effectiveness of brief interventions when delivered as part of a systematic training programme. An ongoing ABI training programme supports continued delivery capacity across services.  

#### Crisis and Emergency Incident Trends
The crisis and emergency chart tracks three indicators simultaneously across the full reporting period: drug-related emergency hospital admissions, alcohol-related emergency hospital admissions, and non-fatal overdose (NFOD) incidents reported by Scottish Ambulance Service and Police Scotland.  

![Figure 21](figures/figure21.png)
> *Figure 21: Crisis and Emergency Incident Trends.*

Drug-related emergency admissions, the highest of the three indicators, reached a peak of 488 in 2023/24 Quarter 1 and have since declined modestly to 452 in 2024/25 Quarter 2. Alcohol-related admissions have remained broadly stable throughout, with only slight variation across the period and a current figure of 279. Non-fatal overdose incidents have shown similarly flat movement, sitting at 206 in 2024/25 Quarter 2 compared with 201 in 2022/23 Quarter 2 — a change of five cases over two years.  

The overall message from this chart is that crisis-level harm in Dundee is neither rising sharply nor declining. The modest fall in drug-related admissions is a cautious positive, particularly given the continued rise in drug treatment referrals noted above, but the overall level of critical incidents remains persistently high. Dundee continues to carry one of the highest rates of drug-related mortality in Scotland, second only to Glasgow City over the five-year period 2019 to 2023. The flat trajectory of non-fatal overdose incidents in particular underscores the ongoing relevance of the NFOD multi-agency rapid response team, which meets daily to provide support to people who have experienced an overdose, and of the early-stage discussions underway with the Scottish Government to explore the development of a Safer Consumption Facility in the city.

#### Conclusion
Considered together, the four charts from this dashboard describe a service operating under sustained and complex pressure. Access to treatment has improved markedly since 2022, with the majority of people now beginning treatment within the national 21-day standard. But retention remains a live challenge, the balance of demand between drug and alcohol pathways has shifted significantly, and crisis-level harm has not declined at a pace that reflects the scale of investment in prevention and treatment. Addressing these challenges will require continued focus on what happens after the point of first contact, as well as place-based responses to the acute deprivation that drives much of the harm seen across Dundee's communities.

---

###	Local Mental Health Service Performance and Geographical Inequality (2022-2025)
This analysis examines mental health service activity across Dundee's Local Community Planning Partnership (LCPP) areas between 2022 and 2025, with a focus on access to psychological therapies, emergency hospital admissions, regional disparities, and demographic trends. The analysis was carried out in Microsoft Excel, and the underlying data was taken from the Dundee Health and Social Care Partnership's Mental Health Services Indicators 2025–26 Quarter 2 report, published by the Chief Finance Officer and presented to the Performance and Audit Committee. The dashboard below brings together the key findings in a single visual summary.  

![Figure 22](figures/figure22.png)
> *Figure 22: Dundee Mental Health Crisis: Access and Admission Analysis Dashboard (2022–2025).*

*Analysis conducted in Microsoft Excel. Data source: Mental Health Services Indicators 2025–26 Quarter 2 (Dundee Health and Social Care Partnership).

#### System Efficiency: Target vs Actual Waiting Times
The target-versus-actual chart tracks the proportion of patients referred to Psychological Therapies who began treatment within 18 weeks of referral. The Scottish Government standard requires that 90% of patients commence treatment within this window. Across the period from 2022/23 Quarter 1 through to 2024/25 Quarter 2, Dundee's actual performance declined from 75% to 70.4%, sitting consistently and significantly below the 90% aim line.  

![Figure 23](figures/figure23.png)
> *Figure 23: System Efficiency: Target vs Actual Waiting Times.*

Dundee is one of seven mainland health board areas placed in Enhanced Support by the Scottish Government as a direct result of this failure to meet the 18-week standard. The gap this creates is not a marginal shortfall: almost 30% of patients referred for psychological therapies are not being seen within the target period. This matters because delayed access to early intervention is associated with deterioration in mental health, which in turn drives increased reliance on crisis and inpatient services.

#### Admission Rate by LCPP Area
The admission rate chart presents mental health emergency hospitalisation rates per 1,000 population across Dundee's eight LCPP areas. The range across the city is striking. The Ferry records the lowest emergency admission rate at 1.5 per 1,000 population, while Lochee records 5.4 and Coldside records 5.7. The admission rate in Lochee is therefore 3.6 times higher than in The Ferry.  

![Figure 24](figures/figure24.png)
> *Figure 24: Admission Rate by LCPP Area.*

This disparity maps almost exactly onto the pattern of social deprivation across Dundee. The areas with the highest admission rates - Coldside, Lochee, and Maryfield - are consistently among the most deprived localities in the city, and in the 2022 Census they also recorded the highest rates of self-reported mental health conditions per 1,000 population. The Ferry, which records the lowest admission rate, had the lowest rate of self-reported mental health conditions in the same Census. This pattern confirms that the distribution of mental health crisis presentations across the city is not random: it closely follows the geography of poverty, poor housing, and reduced access to preventative support.  

#### Hospital Admission Statistics by Region in Dundee
The regional hospital admissions chart plots both total bed days (bars) and emergency hospitalisation rates (line) across all eight LCPP areas. An important anomaly is visible in Coldside. While several areas show elevated total admission volumes, Coldside records the highest emergency hospitalisation rate in the city at 5.7 per 1,000 population - substantially higher than its total admission figure might initially suggest.  

![Figure 25](figures/figure25.png)
> *Figure 25: Hospital Admission Statistics by Region in Dundee.*

This pattern indicates a structural problem with access to primary and preventive mental health care in Coldside. A high emergency rate relative to overall admissions suggests that residents are not reaching services at an earlier stage of need. Instead, they are presenting in crisis, when hospitalisation becomes unavoidable. This is consistent with findings from the 2022 Census, which identified Coldside as having one of the highest rates of people living with a mental health condition in Dundee, and with the broader pattern of limited preventive service capacity in the most deprived localities. The data makes a strong case for prioritising outreach, community-based support, and earlier intervention specifically in Coldside and Lochee, rather than waiting for demand to arrive at emergency services.  

#### Demographic Trends: Admissions and Bed Days by Age Group
Two related charts examine mental health hospitalisations and bed day use across two broad age groups: people aged 18 to 64, and people aged 65 and over. Together, they reveal an important contrast in how the two groups experience and use mental health inpatient services.  

![Figure 26](figures/figure26.png)
> *Figure 26: Hospital admissions by age group.*

The admissions trend shows that the 18 to 64 age group accounts for the substantial majority of mental health hospital admissions across all quarters in the period, with numbers rising from 443 in 2022/23 Quarter 1 to 481 in 2024/25 Quarter 2. Admissions for the 65 and over group are considerably lower and have remained broadly stable, fluctuating between 89 and 99 across the same period.  

However, when these figures are examined alongside the bed day distribution chart, a different picture emerges. The 65 and over group accounts for a share of total bed days that is substantially larger relative to their admission numbers, indicating that when older people are admitted for mental health care they tend to stay significantly longer.  

![Figure 27](figures/figure27.png)
> *Figure 27: Number of hospital bed days distribution by age group.*

This contrast points to two distinct patterns of need. People of working age are being admitted more frequently, suggesting an increasing volume of acute mental health crises in this group, but their stays are typically shorter. For older people, admissions are less frequent but episodes of care are more intensive and prolonged, reflecting the greater complexity often associated with mental health conditions in later life, including dementia and comorbid physical conditions. The fact that the 18 to 64 group is the primary driver of rising admission numbers has wider implications for the city: mental health crisis in Dundee is disproportionately affecting the working-age population, which carries long-term risks for workforce participation, family stability, and economic activity across the city as a whole.  

#### Conclusion
Taken together, these five charts from the dashboard present a consistent and troubling picture. Dundee's mental health services are operating under significant strain, with a system that is consistently missing its access targets, unevenly distributed across the city in a way that disadvantages the most deprived communities, and facing growing demand from working-age residents. The geographic concentration of emergency admissions in Coldside and Lochee makes clear that place-based inequalities in mental health outcomes are not improving. Addressing this will require more than general increases in capacity: it will require targeted investment in early intervention and community-based support specifically in the areas where need is highest and preventive provision is weakest.  

---

### ADP Framework Analysis: Progress, Risk and Deprivation
Research was carried out using the ADP Framework (2023) and the National Records of Scotland Drug-related Deaths in Scotland (2023) report to understand how wider social and economic inequalities can contribute to substance-related harm.

Using data from the ADP Framework, a raw dataset was created, cleaned, information structured, and visuals were developed to help identify key patterns and trends. Both sources were then used to compare and contrast the reporting on drug and alcohol issues in Dundee, highlighting where the evidence aligned and where there were gaps or tensions in the narrative. This helped build a clearer picture of how deprivation, mental health, and addiction are interconnected, and why local responses need to consider the wider social factors behind substance-related harm.  

The Dundee Alcohol and Drug Partnership Strategic Framework 2023–2028 sets out an ambitious public health response to alcohol and drug harm, with a focus on prevention, harm reduction, trauma-informed practice, same-day prescribing, Medication Assisted Treatment standards, lived experience, and improved partnership working. This aligns closely with the wider purpose of our project, as it recognises that alcohol and drug harm cannot be understood separately from deprivation, mental health, trauma, and access to support.  

The ADP Framework suggests that Dundee has made progress in some areas, particularly in relation to drug harm. It highlights a shift towards a public health approach, stronger links with mental health services, residential rehabilitation pathways, primary care support, and rapid responses for people experiencing non-fatal overdose. The local data also shows some positive movement, including reductions in drug deaths from 72 in 2019 to 52 in 2021, and reductions in non-fatal overdoses from 636 in 2019 to 319 in 2022.  

However, this progress needs to be interpreted with caution. National Records of Scotland data shows that drug misuse deaths in Scotland increased again in 2023, and that Dundee City remained one of the areas with the highest age-adjusted rates of drug misuse deaths. This creates an important tension between local improvement activity and the continuing scale of harm. It suggests that while Dundee’s strategy is directionally appropriate, progress remains fragile and should not be read as evidence that the underlying problem has been resolved.  

Deprivation is a key issue across both sources. The ADP Framework highlights that more than half of Dundee’s drug deaths in 2021 occurred in the areas of greatest socioeconomic deprivation, while the NRS data confirms the wider national pattern that people in the most deprived areas are significantly more likely to experience drug misuse death. This supports one of the central arguments of our group project: substance-related harm is not only a health or treatment issue, but is strongly connected to poverty, inequality, poor mental health, and wider social conditions.  

The alcohol data raises an additional concern. While some drug-related indicators improved between 2019 and 2021/22, alcohol deaths in Dundee increased from 30 in 2019 to 46 in 2021, and 2021/22 recorded the highest number of alcohol-related hospital discharges in Dundee. The ADP Framework acknowledges that more focus had previously been placed on drug harm and that further work is needed around alcohol. This is important because the data suggests alcohol harm is not a minor gap, but a significant and ongoing public health pressure.  

Overall, the evidence presents a mixed picture. Dundee has a clear and compassionate strategic response, and some indicators show improvement. However, the continued impact of deprivation, the high rate of drug deaths, and rising alcohol-related harm show that local intervention must remain strongly focused on prevention, treatment access, retention, and wider social support. This provides a strong evidence base for the practical intervention element of our project, including the recovery map and improved signposting to community services.  

The following visuals were created from the ADP Framework data to show the relationship between drug harm, alcohol harm, treatment demand, and deprivation in Dundee. They help illustrate where the ADP Framework shows signs of progress, while also highlighting areas where risk remains high.  

This visual shows reductions in drug deaths and non-fatal overdoses between 2019 and 2021/22, suggesting some signs of local progress. However, the number of drug-related hospital admissions, new referrals and people receiving treatment each month shows that demand for drug support services remains substantial.

![Figure 28](figures/figure28.png)
> *Figure 28: Dundee drug harm indicators from the ADP Framework 2023–2028.*

This visual shows that alcohol-related harm remains a significant pressure in Dundee. Alcohol deaths increased from 30 in 2019 to 46 in 2021, while alcohol service referrals, monthly treatment numbers and deprivation-related hospitalisation risk highlight continuing demand. The data suggests that alcohol harm requires sustained focus alongside drug-related harm.  

![Figure 29](figures/figure29.png)
> *Figure 29: Dundee alcohol harm indicators from the ADP Framework 2023–2028.*

---

## StoryMap Personas
An ArcGIS StoryMap was created as a public-facing output to make the findings of the project easier to understand for non-technical audiences. While the technical report presents detailed analysis, the StoryMap uses a more visual and narrative format to show how deprivation, child poverty, mental health pressures, substance-related harm, and access to support services are connected in Dundee.  

![Figure 30](figures/figure30.png)
> *Figure 30: StoryMap opening page introducing the project focus and Dundee context.*

Across Dundee, local organisations provide services with trust, belonging, and hope. Behind every statistic is a person trying to rebuild routine, confidence, and stability. These journeys demonstrate how community-based support can help people move from isolation towards connection, resilience, and recovery.
Personas were included to help connect the data with realistic service-user experiences. They do not represent real individuals, but they help illustrate how people facing poverty, mental health challenges, addiction, social isolation, or housing insecurity may experience barriers when trying to find support.


![Figure 31](figures/figure31.png)
> *Figure 31: Persona ‘Sophie’ story section showing how the StoryMap connects the analysis with realistic community experiences.*


![Figure 32](figures/figure32.png)
> *Figure 32: Persona ‘Sophie’ map section showing how the StoryMap visualises potential community services accessed.*

![Figure 33](figures/figure33.png)
> *Figure 33: Persona ‘Liam' story section showing how the StoryMap connects the analysis with realistic community experiences.*

![Figure 34](figures/figure34.png)
> *Figure 34: Persona ‘Liam' map section showing how the StoryMap visualises potential community services accessed.*

![Figure 35](figures/figure35.png)
> *Figure 35: Persona ‘Isla’ story section showing how the StoryMap connects the analysis with realistic community experiences.*

![Figure 36](figures/figure36.png)
> *Figure 36: Persona ‘Isla' map section showing how the StoryMap visualises potential community services used by persona.*

### Impact of Accessible Community Services
These persona journeys show why timely and accessible information matters. A person may be willing to seek help only at a particular moment, so unclear opening times, unknown eligibility, or outdated service information can become a practical barrier to support.  

They highlight that recovery is not only an individual journey, but a collective one, shaped through relationships, shared experiences, and community support.  

The StoryMap links the evidence base to the practical output of the project: a Recovery Map prototype that helps users identify available local services by day, category, and type of support.  

![Figure 37](figures/figure37.png)
> *Figure 37: StoryMap section showing how the Recovery Map prototype responds to the needs identified in the analysis.*

Research suggests that recovery is rarely shaped by one service alone. Instead, it emerges through networks of support, trust and relationships - often built in community settings rather than formal systems

Although each persona experiences different challenges, the stories reveal common themes across Dundee's support network. The stories also show that mental health, poverty, addiction, trauma and social isolation are deeply connected. Early support, safe environments and local community-based services can help prevent crisis and strengthen long-term wellbeing.

Key findings:
- Local support services are most effective when they are visible, informal and easy to access.
- Recovery pathways often depend on trust and relationships rather than one-off interventions. 
- Mental health, poverty and addiction are interconnected social issues. 
- Community-based support can reduce isolation and strengthen resilience before crisis occurs.
- Different groups require different types of support, including youth-focused, women-centred and peer-led services.

---

# Parish Nursing Dundee
Parish Nursing Dundee look to work with those who are stuck in a cycle of substance use, alcoholism, poverty, violence and other life struggles. They have asked us if we could design an updated leaflet and/or an interactive map which shows which services are available/open each day of the week.  

## Stakeholder Engagement and Problem Definition
Stakeholder engagement was carried out to ground the project in real-world needs around service access and signposting for health and social issues, including poverty, addiction, and mental health. This included initiating and conducting meetings with Parish Nursing services and the Dundee Recovery Coordinator. These discussions shifted the project from a broad exploration of social challenges to a more focused opportunity: improving access to up-to-date, local service information for frontline workers and community use.  

Stakeholder input directly informed the functional direction of the project, including requirements around accessibility, eligibility information, and real-time usability.  


### Data Collection and System Development
A structured a dataset of over 400 local services was compiled, including key attributes such as service type, availability, eligibility criteria, referral pathways, cost, service lead, description of service offering and contact details. This dataset forms the foundational layer of the current mapping prototype and provides a scalable structure for further development and analysis. The dataset was designed to support both visual mapping and service filtering, enabling more practical, place-based navigation of local support services. It's designed to filter available services by day of the week and service type.  

Parish Nurses advised that they would really value a deliverable whereby they could easily signpost clients to support services that were available on that particular day. They explained that clients tend to engage with services there and then, if they're going to engage at all. If they signpost clients to a service that clients have to go to at a later time, the window of opportunity for engagement may be lost, and clients may lose motivation to seek support if not immediate. Parish Nursing was encouraging of the project, stating it would be valued with local Police services also, as they frequently bring clients to Parish Nursing for signposting to suitable support. They advised it would be valuable to extend across Tayside region and indeed nation-wide.  

### Prototype Development and Iterative Feedback
The initial prototype was developed using the structured dataset and showed the map of Dundee, with services being able to be filtered by day and service type. This has been reviewed with the Dundee Recovery Coordinator, who provided feedback on usability and suggested refinements, including enhanced geographic breakdown (neighbourhood-level access), improved eligibility visibility, and inclusion of both services and activities. This feedback was shared with the team to inform ongoing and possible future development.  

### Analysis and Evaluation
Analysis of service provision was completed within the dataset to identify gaps, patterns, and areas of unmet need across different types of support services. This analysis will contribute to the evaluation section of the project and support evidence-based recommendations.  

### Scope and Project Direction
Given the project timeframe and the need to prepare for final outputs and showcase presentation, the focus has shifted from expanding the dataset to consolidating, analysing, and refining existing work. This ensures that outputs remain coherent, demonstrable, and aligned with assessment expectations.  

## Dundee Recovery Map Prototype
The Recovery Road Map was originally developed as a visual resource for Dundee, displaying the network of services available to people experiencing difficulties related to mental health, addiction, homelessness, and social isolation. It provided information on mental health support, addiction services, health and wellbeing provision, rehabilitation pathways, peer support, and family and carer support. In the years following its launch, the app became widely used across the city, both by people seeking help for themselves and by frontline organisations seeking to connect people with appropriate support.  

When the costs of maintaining the app became unsustainable and it was taken offline, a practical gap opened at the point where reliable information is most needed. Parish Nurses in Dundee described a situation in which the police bring people to them in crisis - people who need immediate signposting to the right service at the right time. Without a maintained, up-to-date digital resource, practitioners have been falling back on a printed leaflet produced in 2023. That leaflet is known to be incomplete and, for some services, out of date. In response to a direct request from Parish Nursing Dundee, our group explored what could be rebuilt using free and open source tools within the scope of a data analysis project. The result was an interactive, filterable web map prototype of recovery and support services across Dundee, which demonstrates what a maintained community resource of this kind could look like, and provides a working foundation on which a more fully featured application could be built upon.  

The value of a recovery service map is also clearly reflected in the analysis carried out as part of our project. Our analysis of deprivation, drug-related harm, mental health pressures, and poverty across Dundee and the wider Tay cities area shows where need is most concentrated. Viewed alongside this evidence, the Recovery Map offers a practical and immediate way of helping people navigate support in the places where it is most needed. For this reason, our analysis and prototype are presented together as a connected response to what the evidence shows about the challenges facing communities across Dundee.

### Overview
The prototype is a single-page web application centred on an interactive map of Dundee. The sections below describe its key features.

#### Map and Marker Display
Services with confirmed Dundee locations are displayed as custom teardrop pin icons on a Leaflet.js interactive map, rendered against OpenStreetMap tile imagery. Each pin is coloured according to its service category using a palette derived from Parish Nursing Dundee's existing website and leaflet. Ten categories are currently represented: Activity Based, Mental Health, Addiction Support, Rehab Information, Health and Wellbeing, Harm Reduction, Peer Support, Family and Carer Support, Food Resources, and Housing.  

Where multiple services are located in close proximity, pins are automatically merged into cluster bubbles by the Leaflet.markercluster plugin. Cluster size scales with the number of contained services, separating into individual pins as the user zooms in. Multi-session services are grouped under a single pin. Services that are definitively closed on the selected day are hidden. Services with unconfirmed hours or appointment-only access are always shown, with their status clearly indicated. This prevents the overlapping markers that would otherwise appear when multiple CSV rows share identical coordinates, and ensures that clicking any location opens a complete picture of everything available there rather than a partial view of a single session.  

![Figure 38](figures/figure38.png)
> *Figure 38: Recovery Map prototype map and marker display.*

#### Popups
Clicking a map pin opens a popup panel displaying the full details of the service or services at that location. The popup header shows the service name alongside a colour-coded status chip indicating one of four states: Open today, Closed today, Hours not confirmed, or By appointment. The header background matches the service’s category colour, providing immediate visual identification consistent with the map legend and category filter buttons.  

The popup body displays the service category, a description, address, phone number, and website link where available. The Access field indicates whether the service operates as a drop-in, runs to a fixed schedule, or requires an appointment to be made in advance, information that is particularly important for someone in crisis who needs to know whether they can simply arrive or must contact the service first.  

The weekly hours grid lists all seven days with their respective opening times. Today’s row is highlighted in green representing the currently selected day, if different from today, is highlighted in an accent colour. Days on which a service is closed are shown in muted grey. Days with unconfirmed hours display an amber italic note; appointment-only services display a purple italic note across all days.  

Where a location hosts multiple distinct sessions, the popup uses a native HTML accordion layout. Each session is presented as an expandable panel showing its name, category colour dot, open or closed status for today, age group, cost, and access type. The first session is expanded by default. Single-session locations use a simpler flat layout.

<img src="figures/figure39.png" alt="Figure 39" width="300">
<blockquote>
  <em>Figure 39: Recovery Map prototype popup display.</em>
</blockquote>

#### Filtering and Search
Primary filters include day-of-the-week buttons, category buttons, and a text search across name, category, and description. At least one category must remain selected at all times.  

<img src="figures/figure40.png" alt="Figure 40">
<blockquote>
  <em>Figure 40: Prototype service category and day filters.</em>
</blockquote>

A secondary collapsible panel provides cost, target group, and access-type filters. Services with unknown values are included by default. “Show all” and “Clear all” controls reset all filters. A stats bar displays the number of visible services and, when relevant, how many are open on the selected day.  

<img src="figures/figure41.png" alt="Figure 41">
<blockquote>
  <em>Figure 41: Prototype optional filter buttons.</em>
</blockquote>

#### Remote and National Services Sidebar
Not all support services relevant to Dundee residents have a fixed physical location. UK-wide helplines, Scotland-wide phone services, and organisations that operate across council areas without a single address cannot be meaningfully placed on a city-level map. Rather than excluding these services from the application, they are presented in a dedicated sidebar panel labelled Remote and National Services, positioned alongside the map on desktop screens and stacked below it on mobile devices.  

Each entry in the sidebar is presented as a card displaying the service name, category, geographic scope badge (UK, Scotland, or the relevant council area), a status chip for the selected day, phone number, website, and opening hours for the selected day. The sidebar respects the same filter logic as the map: category, cost, target group, access type, and search term filters all apply, and the sidebar updates in real time alongside the map whenever any filter changes. A count of matching sidebar services is displayed in the sidebar header.  

<img src="figures/figure42.png" alt="Figure 42" width="300">
<blockquote>
  <em>Figure 42: Prototype sidebar.</em>
</blockquote>

#### Legend and Mobile Considerations
A collapsible legend panel shows the category colour key. Responsive layout adjustments support smaller viewports. Colours and typography align with Parish Nursing Dundee materials.

#### Hosting
The prototype is a static web application with all processing done client-side. Cleaned JSON data is served alongside the HTML and JavaScript, enabling no cost hosting via platforms such as GitHub Pages. Data-access and exposure decisions would need review before public deployment.

### Looking into the Future
The main limitation of the prototype is its static dataset. Two feasible approaches to data maintenance may be considered: a managed backend or automated data retrieval from service providers websites. A hybrid approach combining both is likely most realistic.  

**Backend Architecture**: Replacing the static JSON with a backend would enable authentication, logging, and moderated updates. A lightweight API built using Flask, supported by a database such as SQLite for simplicity or PostgreSQL for scalability, would be sufficient. This solution could also be deployed using low-cost or free hosting services.  

**Mobile Application**: A full mobile application could be developed using React Native to provide consistent and high-performance user experience across both iOS and Android platforms. This approach would enable integration with device-specific features such as push notifications, geolocation, and offline storage, improving both usability and responsiveness.  

#### Enhanced Functionality
Potential enhancements include:
-	Real-time open/closed status.
-	Directions and routing.
-	Optional deprivation-analysis overlays.
-	Accessibility filtering.
-	Referral pathway information.
-	Multi-language support.
-	User feedback and update suggestions.

#### Limitations
Current limitations include:
-	The dataset has not been formally verified with all service providers.
-	Some information may already be out of date.
-	Services with unconfirmed hours are clearly labelled but not verified.
-	Geocoding accuracy varies for incomplete addresses.
-	Improvements to accessibility are needed.
-	The prototype is not yet suitable to be publicly deployed.

### Development Process
The prototype was built through four iterative stages, each responding to problems and limitations identified in the previous stage. This section describes each stage in turn, from the initial working prototype through to the version presented here. 

Tools used:
-	Python (data cleaning using Pandas and geocoding using Nominatim API)
-	HTML, CSS, JavaScript
-	GitHub for version control and GitHub Pages (proposed hosting)


#### Stage 1: Initial Prototype
The first stage produced a working interactive map centred on Dundee, built using Leaflet.js and OpenStreetMap tiles. At this point, service data was hardcoded directly in the JavaScript file as a static array, which was sufficient for early testing and layout development. The main interface was designed in this stage: custom pin icons coloured by service category to match the Revovery Map leaflet; day-of-the-week filter buttons; category filter buttons; a text search box; and a popup for each pin displaying the service name, address, phone number, website, age group, cost, and a full weekly hours grid. Today's row in the hours grid was highlighted, and each popup carried an open/closed chip in the header. A floating legend panel and a stats bar showing the count of visible services were also introduced at this stage.  

#### Stage 2: Data Pipeline and JSON
The second stage addressed the limitations of hardcoded data by introducing a proper data pipeline. A Python cleaning script was written to process the raw Excel dataset compiled by the team. The script standardised inconsistent formatting across fields, corrected errors, geocoded service addresses to latitude and longitude coordinates using the Nominatim API (OpenStreetMap’s geocoding service), and exported the cleaned data as both a CSV file for validation and a structured JSON file for use by the web application. The service data was moved out of the JavaScript file and into an external JSON file, loaded by the application via a fetch() call. A description fallback function was also added at this stage: if a service's primary description field was blank or contained the exact text value "Not on Recovery Map" - indicating it was absent from the original Recovery Map or Parish Nursing leaflet, then the application falls back to an additional notes field. This ensured that as many services as possible had meaningful descriptions displayed to users. The Python script handles cleaning and geocoding only and outputs a flat row-per-session JSON file where each row represents a single session of a single service. The grouping of those rows into per-location service entries is handled by the JavaScript application at runtime.  

#### Stage 3: Grouping, Multi Session Popups, and Sidebar
The third stage addressed a significant limitation of the flat JSON structure. Because the dataset contains one row per session, organisations offering multiple sessions at the same location would otherwise generate multiple overlapping pins at identical coordinates. A grouping function was introduced in the JavaScript layer to combine all session rows sharing the same organisation name and address into a single map entry before markers were rendered. This introduced the need for two different popup layouts. Where a location has only a single session, a simple flat popup is shown with the service details and a full weekly hours grid. Where a location has multiple sessions, an accordion layout is used, implemented with native HTML details and summary elements. Each session appears as a collapsible row showing its name, category, target group, cost, and individual hours, with a colour dot and an open/closed badge in the header of each row. The first session is expanded by default. This stage also introduced the sidebar panel for services without a fixed geographic location. This includes national helplines, online services, and Scotland or UK-wide provision that cannot be placed as a pin on the Dundee map. Previously, services without valid coordinates were being silently dropped; the sidebar ensured they remained accessible. These services respond to all active filters in the same way as map markers, with their count displayed alongside the map.  

#### Stage 4: Hours States, Access Filters, and Clustering
The fourth stage addressed several problems with how hours data was being interpreted and displayed. A central hours-resolution function was added to translate raw hours values into one of several display states: confirmed open hours, "Hours not confirmed" for services where opening times were unknown or variable, and "By appointment" for services requiring prior contact. The day-of-the-week filter behaviour was also revised. Previously, services with NULL hours for a given day were being displayed as "Closed", causing services with genuinely unknown hours to be incorrectly filtered out. Unknown and "various" day values are now treated as "Unknown" rather than NULL, so these services remain visible when a day filter is applied. Only services that are definitively closed on the selected day are hidden. Marker clustering was introduced using the Leaflet.markercluster plugin. Nearby pins merge into numbered cluster bubbles at lower zoom levels and disperse as the user zooms in. Additional filter controls were added to a collapsible filter panel: a cost filter (Free/Paid), a target-group filter (All Ages/Adults/Women/Men/50+/Young People/Children), and an access-type filter (Drop-in/Scheduled/By appointment). "Show all" and "Clear all" buttons were added to reset filters in a single action, though the logic for these buttons was not yet added in this stage. Finally, the map boundary constraints were relaxed. Restricting panning to the Dundee boundary caused popups near the edge of the map to be clipped. Removing this constraint resolved the issue while keeping a sensible default view centred on the city.

### Recovery Leaflet Re-Design
The project poster summarises the main findings from our analysis and presents the key outputs of the project in a clear visual format. It brings together the evidence on deprivation, child poverty, mental health, substance-related harm, and access to community support services in Dundee. The poster was designed as a public-facing output for the final showcase and helps communicate the purpose, findings, and practical value of the project to a wider audience.  

![Figure 43](figures/figure43.png)
> *Figure 43: Final project poster summarising the Dundee deprivation, health, and community support mapping project.*


# References
Dundee City Council (2025) Dundee Poverty Profile 2025. Available at: https://www.dundeecity.gov.uk/sites/default/files/Dundee_Poverty_Profile_2025.pdf  (Accessed: 26 March 2026).   

Dundee City Council (2025) Fairness and local child poverty plan [2024/25]. Available at: https://www.dundeecity.gov.uk/sites/default/files/Final%20191-2025%20Fairness%20and%20Local%20Child%20Poverty%20Action%20Plan%20-%20Annual.pdf (Accessed: 26 March 2026). 

Dundee City Council (2020) DUNDEE CITY - SIMD2020 Version 2 Briefing Note. Available at: https://www.dundeecity.gov.uk/sites/default/files/publications/simd2020_version2_briefing.pdf (Accessed 23 May 2026).  

Dundee Health and Social Care Partnership (2026) Mental Health Services Performance Indicators 2025-26 Quarter 2, Dundeehscp.com. Available at: https://www.dundeehscp.com/mental-health-services-performance-indicators-2025-26-quarter-2 (Accessed: 19 May 2026).  

Dundee Partnership (2023) Dundee Alcohol and Drug Partnership Strategic Framework 2023-2028. Available at: https://www.dundeeadp.co.uk/sites/default/files/2023-01/ADP%20FRAMEWORK%2023.pdf (Accessed: 15 May 2026).  

Lopez, M. (2020)  Achieving fairness? Challenging poverty and social exclusion through partnership working, University of Dundee. Available at: https://discovery.dundee.ac.uk/ws/portalfiles/portal/49045628/Achieving_fairness_Final_version.pdf (Accessed 18 May 2026).  

‌National Records of Scotland (NRS) (2025) Drug-related deaths in Scotland, 2024. Available at: https://www.nrscotland.gov.uk/publications/drug-related-deaths-in-scotland-2024/ (Accessed: 16 March 2026).  

Open Government Licence (OGL v3.0) (2026) Nationalarchives.gov.uk. Available at: https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/ (Accessed: 16 March 2026).  

Parish Nursing Dundee (2026) Parishnursingdundee.org.uk. Available at: https://parishnursingdundee.org.uk/ (Accessed: 1 April 2026).  

Public Health Scotland (2024) Alcohol related hospital statistics. Available at: https://publichealthscotland.scot/publications/alcohol-related-hospital-statistics/alcohol-related-hospital-statistics-scotland-financial-year-202223/ (Accessed: 27 March 2026).  

‌Public Health Scotland (2024) Mental health inpatient activity. Available at: https://publichealthscotland.scot/publications/mental-health-inpatient-activity/mental-health-inpatient-activity-10-december-2024/data-explorer/ (Accessed: 27 March 2026).  

‌Public Health Scotland (2025) Child and Adolescent Mental Health Services (CAMHS) waiting times. Available at: https://publichealthscotland.scot/publications/child-and-adolescent-mental-health-services-camhs-waiting-times/child-and-adolescent-mental-health-services-camhs-waiting-times-quarter-ending-september-2025/ (Accessed: 26 March 2026).  

‌Public Health Scotland (2026) Drug-Related Hospital Statistics Scotland - Scottish Health and Social Care Open Data, Nhs.scot. Available at: https://www.opendata.nhs.scot/dataset/drug-related-hospital-statistics-scotland (Accessed: 16 March 2026).  

‌Public Health Scotland (2026) Completeness - Scottish Morbidity Records (SMR), Publichealthscotland.scot. Available at: https://publichealthscotland.scot/resources-and-tools/health-intelligence-and-data-management/data-management-in-secondary-care-hospital-activity/scottish-morbidity-records-smr/completeness/ (Accessed: May 15, 2026). 

‌Scotland’s Census (2022) Scotland’s Census 2022 reports. Available at: https://www.scotlandscensus.gov.uk/2022-reports/ (Accessed: 16 March 2026).  

‌Scottish Government (2025) Data Zone Boundaries 2011 © Scottish Government, contains Ordnance Survey data © Crown copyright and database right (2026), SpatialData.gov.scot. Available at: https://www.data.gov.uk/dataset/ab9f1f20-3b7f-4efa-9bd2-239acf63b540/data-zone-boundaries-2011 (Accessed: 16 March 2026).   

Stone, J. (2025) Local indicators of child poverty after housing costs, 2023/24 Estimates of child poverty after housing costs in parliamentary constituencies and local authorities. Available at: https://endchildpoverty.org.uk/wp-content/uploads/2025/05/Local-indicators-of-child-poverty-after-housing-costs_2025_final-1.pdf (Accessed: 23 May 2026).  

‌The Scottish Government (2025) Child poverty pathfinders in Dundee and Glasgow: phase two evaluation, Gov.scot. Available at: https://www.gov.scot/publications/phase-2-evaluation-child-poverty-pathfinders-dundee-glasgow/ (Accessed: 26 March 2026).  

The Scottish Government (2020) Scottish Index of Multiple Deprivation (SIMD), Gov.scot. Available at: https://www.gov.scot/collections/scottish-index-of-multiple-deprivation-2020/ (Accessed: 16 March 2026).

## Rights & Usage
Group project analysis, visualisations, and prototype outputs created during this project are attributed to the respective group members who created them.
