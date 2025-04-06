import requests
from bs4 import BeautifulSoup
import json

# Project URLs
project_urls = [
    "https://jmellolicsw.com/",
    "https://locococostacos.com/",
    "https://www.slip14.com/",
    "https://acousineaulicsw.com/"
]

project_info = []

for url in project_urls:
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract title
            title = soup.title.text.strip() if soup.title else "Unknown Title"
            
            # Extract description
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            description = meta_desc['content'] if meta_desc and 'content' in meta_desc.attrs else ""
            
            # Get main content
            paragraphs = [p.text.strip() for p in soup.find_all('p') if p.text.strip()]
            main_content = ' '.join(paragraphs[:5])  # Get first 5 paragraphs
            
            # Extract domain for reference
            domain = url.split('//')[1].split('/')[0]
            
            project_info.append({
                "url": url,
                "domain": domain,
                "title": title,
                "description": description,
                "content_sample": main_content[:500] + "..." if len(main_content) > 500 else main_content
            })
            print(f"Successfully scraped {url}")
        else:
            print(f"Failed to retrieve {url}, status code: {response.status_code}")
    except Exception as e:
        print(f"Error processing {url}: {e}")

# Save as JSON
with open('project_data.json', 'w') as f:
    json.dump(project_info, f, indent=2)

print("Data saved to project_data.json")