import pandas as pd
import numpy as np
import time
import re
import json

from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError

from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)

# get root dir
ROOT = Path(__file__).resolve().parents[1]

# get the data folder relative to the root dir
DATA_DIR = ROOT / 'data'

CACHE_FILE = DATA_DIR /"geocode_cache.json"

INPUT_FILE = DATA_DIR /"ServiceMappingDundee.xlsx"
OUTPUT_CSV = DATA_DIR /"ServiceMappingDundee_clean.csv"
OUTPUT_JS = DATA_DIR /"DundeeRecoveryServices.json"

if not INPUT_FILE.exists():
    raise FileNotFoundError(f"Missing input file: {INPUT_FILE}")

SEMANTIC_VALUES = {"Various", "Unknown", "Afternoon"}
NA_VALUES = {"", "NA", "N/A"}

DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
DAYS_ABBR  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

SERVICE_TYPE_MAP = {
    # Health and Wellbeing variants
    "health condition": "Health and Wellbeing",
    "health & wellbeing": "Health and Wellbeing",
    "health and wellbeing": "Health and Wellbeing",
    "health wellbeing": "Health and Wellbeing",
    # Mental Health
    "mental health": "Mental Health",
    "mental wellbeing": "Mental Health",
    # Addiction
    "addiction support": "Addiction Support",
    "substance misuse": "Addiction Support",
    "alcohol & drugs": "Addiction Support",
    # Activities
    "activity based": "Activity Based",
    "physical activity": "Activity Based",
    # Food
    "food provision": "Food Resources",
    "food bank": "Food Resources",
    # Housing
    "housing support": "Housing",
}

# might need later if vals get added differntly
# SEMANTIC_TIME_MAP = {
#     "afternoon": "Afternoon",
#     "pm": "Afternoon",
#     "morning": "Morning",
#     "am": "Morning",
#     "evening": "Evening",
#     "all day": "All day",
#     "by appointment": "By appointment",
#     "appointment": "By appointment",
#     "various": "Various",
#     "unknown": "Unknown",}

# newline
NL = '\n'

time_re = re.compile(r'^(?:[01]\d|2[0-3]):[0-5]\d$')


# LOAD
def load(filepath):
    """Loads the dataset:
    - Cheacks file exists before loading
    - Checks for missing values
    - Checks for duplicate values"""
    
    # try to read CSV file, return error if file not found
    logging.info(f"Loading data from: {filepath}")
    if not Path.exists(filepath):
            logging.error(f"Input file not found: {filepath.name}")
            raise FileNotFoundError(filepath)
    df = pd.read_excel(filepath, dtype=str)
    logging.info(f"{filepath.name} loaded successfully: {df.shape[0]} rows by {df.shape[1]} cols.")

    # log missing values
    na_counts = df.isna().sum()
    cols_with_na = na_counts[na_counts > 0]
    if not cols_with_na.empty:
        logging.warning(f"Missing values found:{NL}{cols_with_na}")
        #df = df.dropna()
        #logging.info(f"Missing values successfully dropped.")
    else:
        logging.info("No missing values found.")

    # log and remove duplicate rows
    logging.info(f"Rows before cleaning: {len(df)}")
    duplicate_rows = df[df.duplicated(keep=False)]
    if not duplicate_rows.empty:
        logging.info(f"Duplicate rows found:{NL}{duplicate_rows}")
        df = df.drop_duplicates()
        logging.info(f"Duplicate values successfully dropped.")
    else:
        logging.info("No duplicate rows found.")
    return df


# CLEAN
def normalise_service_type(value: str | None) -> str | None:
    if value is None:
        return None

    key = value.strip().lower()
    return SERVICE_TYPE_MAP.get(key, value.strip())

def clean(df):
    """Cleans and normalises dataset:
        - Strips whitespace
        - Normalises time columns
        - Builds Time Range
        - Standardises names
        - Fills optional fields"""
    df = df.copy()
    #df = df.apply(lambda col: col.str.strip() if col.dtype == "object" else col)
    # strip whitespace from all string columns
    str_cols = df.select_dtypes(include="object").columns
    df[str_cols] = df[str_cols].apply(lambda col: col.str.strip())
    logging.info(f"Whitespace stripped from {len(str_cols)} string columns.")

    # normalise columns
    TITLE_CASE_COLS = ["Council Area","Organisation","Session Name","Support Type","Delivery Type","Age Group","Activity Status","Cost Type","Day",]
    title_cased_cols = []
    changed_counts = {}
    
    for col in TITLE_CASE_COLS:
        if col in df.columns:
            before = df[col].copy()
            df[col] = df[col].str.title()
    
            changed = (before != df[col]) & before.notna()
            num_changed = changed.sum()
    
            if num_changed > 0:
                title_cased_cols.append(col)
                changed_counts[col] = num_changed
    
    if title_cased_cols:
        logging.info("Title-case normalisation applied to columns: " + ", ".join(f"{col} ({changed_counts[col]} changes)" for col in title_cased_cols))
    else:
        logging.info("Title-case normalisation applied: no changes detected.")
   
    # ensure correct service type mapping
    df["Category"] = df["Support Type"]
    df["Category"] = df["Category"].apply(normalise_service_type)
    
    # make sure that postcode is uppercase
    df["Postcode"] = df["Postcode"].str.upper()

    # standardise Yes / No values
    df["Self Referral"] = df["Self Referral"].str.strip().str.title()
    df["Self Referral"] = df["Self Referral"].replace({"Yes": "Yes","Y": "Yes","No": "No","N": "No"})
    
    # normalise times
    logging.info("Normalising Start / End time columns.")
    # replace common mistakes first
    
    df["Start"] = df["Start"].str.replace(";", ":", regex=False)
    df["End"] = df["End"].str.replace(";", ":", regex=False)
    
    # capture semantic values directly from original columns
    start_semantic = df["Start"].where(df["Start"].isin(SEMANTIC_VALUES))
    end_semantic = df["End"].where(df["End"].isin(SEMANTIC_VALUES))
    
    # build machine-usable time columns (exact only)
    df["Start Time"] = df["Start"].replace(list(SEMANTIC_VALUES | NA_VALUES), pd.NA)
    df["End Time"] = df["End"].replace(list(SEMANTIC_VALUES | NA_VALUES), pd.NA)
    
    # strip seconds (Excel HH:MM:SS → HH:MM)
    df["Start Time"] = df["Start Time"].str.slice(0, 5)
    df["End Time"] = df["End Time"].str.slice(0, 5)
    
    df["Start Time"] = pd.to_datetime(df["Start Time"], format="%H:%M", errors="coerce").dt.strftime("%H:%M")
    df["End Time"] = pd.to_datetime(df["End Time"], format="%H:%M", errors="coerce").dt.strftime("%H:%M")
    
    logging.info(
        f"Exact times parsed: "
        f"Start Time: {df['Start Time'].notna().sum()}, "
        f"End Time: {df['End Time'].notna().sum()}")


    # time range to combine start-end if known
    df["Time Range"] = pd.NA

    mask_both = df["Start Time"].notna() & df["End Time"].notna()
    mask_start_only = df["Start Time"].notna() & end_semantic.notna()
    mask_end_only = start_semantic.notna() & df["End Time"].notna()
    
    df.loc[mask_both, "Time Range"] = (df.loc[mask_both, "Start Time"] + "-" + df.loc[mask_both, "End Time"])
    
    df.loc[mask_start_only, "Time Range"] = (df.loc[mask_start_only, "Start Time"] + "-" + end_semantic[mask_start_only])
    
    df.loc[mask_end_only, "Time Range"] = (start_semantic[mask_end_only] + "-" + df.loc[mask_end_only, "End Time"])
    
    # fallback: fully semantic
    df.loc[df["Time Range"].isna(), "Time Range"] = (start_semantic.combine_first(end_semantic))
    
    logging.info(
        "Time Range construction summary: "
        f"Exact ranges: {mask_both.sum()}, "
        f"Partial ranges: {(mask_start_only | mask_end_only).sum()}, "
        f"Semantic only: {(df['Time Range'].isin(SEMANTIC_VALUES)).sum()}")

    # full address column if needed
    df["Full Address"] = df["Address"] + ", " + df["Postcode"] + ", Scotland"
    logging.info("Full Address column created.")

    # fill optional colums
    optional_cols = ["Session Name", "Phone", "Email", "Website", "Cost Amount", "Eligibility", "Postcode", "Additional Notes"]
    filled_cols = []
    
    for col in optional_cols:
        if col in df.columns:
            missing_before = df[col].isna().sum()
            df[col] = df[col].fillna("").astype(str).str.strip()
            if missing_before > 0:
                filled_cols.append(f"{col} ({missing_before}).")

    if filled_cols:
        logging.info(f"Filled missing values in optional columns: {', '.join(filled_cols)}")

    
    logging.info(f"After cleaning: {len(df)} rows remain.")
    return df

# GEOCODING
def geocode_address(geocoder, address, postcode):
    """Attempts to geocode a single address using Nominatim.
    Tries three progressively simpler queries:
      1. Full address + postcode (most precise)
      2. Address without postcode
      3. Postcode only (fallback)
    Returns (lat, lng) tuple or (None, None) if all fail."""

    queries = [
        f"{address}, {postcode}, Dundee, Scotland",
        f"{address}, Dundee, Scotland",
        f"{postcode}, Scotland",
    ]
    # prevents requests like ", Dundee, Scotland"
    for query in queries:
        if not query.strip() or query.startswith(","):
            continue
        try:
            # geocode call
            location = geocoder.geocode(query, timeout=10)
            if location:
                return round(location.latitude, 6), round(location.longitude, 6)
            time.sleep(3)   # Nominatim rate limit: 1 request/second, 3 to be safe against timeout
        except (GeocoderTimedOut, GeocoderServiceError) as e:
            logging.error(f"Geocoder error for '{query}': {e}")
            time.sleep(2)

    return None, None


def geocode_all(df):
    """
    Geocodes each unique Address+Postcode combination.
    Caches results so each address is only looked up once,
    even if it appears in many rows.
    """
    if CACHE_FILE.exists():
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            coord_cache = json.load(f)
        logging.info(f"Loaded {len(coord_cache)} cached geocodes from disk.")
    else:
        coord_cache = {}
        logging.info("No geocode cache found. Starting fresh.")
        
    logging.info("Geocoding addresses using Nominatim (OpenStreetMap)...")

    # Nominatim requires a unique user agent string
    geocoder = Nominatim(user_agent="dundee_recovery_map_v1")

    # build lookup of unique addresses to geocode, so that same venue/building is not geocoded multipel times
    df["_addr_key"] = df["Address"].astype(str) + "|" + df["Postcode"].astype(str)
    unique_addrs = df[["_addr_key", "Address", "Postcode"]].drop_duplicates("_addr_key")

    #coord_cache = {}   # addr_key to (lat, lng)

    for _, row in unique_addrs.iterrows():
        key = row["_addr_key"]
        addr = str(row["Address"])
        post = str(row["Postcode"])

        if key in coord_cache:
            lat, lng = coord_cache[key]
            logging.info(f"Cached {addr[:50]} > {lat}, {lng}")
            continue

        logging.info(f"Geocoding: {addr[:50]}...")
        lat, lng = geocode_address(geocoder, addr, post)

        if lat:
            logging.info(f" > {lat}, {lng}")
        else:
            logging.info(f" > FAILED - add coordinates manually.")
            
        # stores success or failure (None, None)
        coord_cache[key] = (lat, lng)
        with open(CACHE_FILE, "w") as f:
            json.dump(coord_cache, f)

    # map coordinates back onto all rows in df
    df["lat"] = df["_addr_key"].map(lambda k: coord_cache[k][0])
    df["lng"] = df["_addr_key"].map(lambda k: coord_cache[k][1])

    missing = df["lat"].isna().sum()
    if missing:
        logging.warning(f"WARNING: {missing} rows have no coordinates.")
        logging.info("Edit services_clean.csv and add lat/lng manually for")
        for addr in df[df["lat"].isna()]["Address"].unique():
            logging.info(f" - {addr}")

    return df

# SAVE
def save_clean_csv(df, filepath):
    """Saves the cleaned row-per-session data."""
    df.drop(columns=["_addr_key"], errors="ignore", inplace=True)
    df.to_csv(filepath, index=False)
    logging.info(f"Saved cleaned CSV: {filepath}")
    logging.info("Review this file and check missing coordinates.")

def save_json(df: pd.DataFrame, filepath: Path):
    df = df.where(pd.notna(df), None)
    records = df.to_dict(orient="records")
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(records, f, indent=2)
    logging.info(f"Saved JSON to {filepath}")


# MAIN
def main():
    df = load(INPUT_FILE)
    df = clean(df)
    df = geocode_all(df)
    save_clean_csv(df.copy(), OUTPUT_CSV)
    save_json(df, OUTPUT_JS)

if __name__ == "__main__":
    main()