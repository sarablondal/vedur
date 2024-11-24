import requests
from bs4 import BeautifulSoup
import json

# URL of the page with weather stations
url = "https://www.vedur.is/vedur/stodvar/?t=3"

# Send an HTTP request to the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the page content with BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all station entries
    stations = soup.find_all('tr')
    
    # Check if stations were found
    if not stations:
        print("Engar stöðvar fundust. Vinsamlegast skoðið HTML uppsetningu og gögn sem eru valin.")
    
    # Create a list to store the results
    station_list = []
    
    # Loop through the stations and extract name and station number
    for station in stations:
        # Find all <td> elements in the row
        tds = station.find_all('td')
        for td in tds:
            name = td.get_text(strip=True)
            # Remove unwanted text
            for unwanted in ['(sj)ASRU', '(sj)AU', '(sk)ASRU', '(sk)ASRU', '(sm)ASRU']:
                name = name.replace(unwanted, '').strip()
            # Find the station ID in the <a> tag
            station_link = td.find('a', href=True)
            if station_link and 'station=' in station_link['href']:
                station_id = station_link['href'].split('station=')[1]
                station_list.append({"name": name, "value": station_id})
    
    # Write the results to a JSON file
    with open('stations.json', 'w', encoding='utf-8') as file:
        json.dump(station_list, file, ensure_ascii=False, indent=4)
else:
    print(f"Failed to retrieve the data. Status code: {response.status_code}")