import json
import requests
import os

# Assuming 'x.json' is the name of your JSON file
filename = 'x.json'

# Create the directory if it doesn't exist
os.makedirs('son/ex_questions', exist_ok=True)

# Open the file and read its content
with open(filename, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Iterate through the data
for i in range(7,8):
    try:
        # Extract the image URL
        image_url = data[i]['data']['msg']['sound_quest_ara']
        full_url = f'https://www.codepermis.net/{image_url}'
        #print(f"Downloading image from: {full_url}")

        # Send a GET request to the image URL
        response = requests.get(full_url, stream=True,verify=False)

        # Check if the request was successful
        if response.status_code == 200:
            # Extract the image file name
            image_file_name = image_url.split('/')[-1]

            # Define the path where the image will be saved
            save_path = f'son/ex_questions/{image_file_name}'

            # Open the file in binary write mode and save the image
            with open(save_path, 'wb') as file:
                file.write(response.content)
            print(f"Image saved to: {save_path}")
        else:
            print(f"Failed to download image from: {full_url}")
    except Exception as e:
        print(f"Error downloading image at index {i}: {e}")
