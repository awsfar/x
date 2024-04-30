import json
import string
import re
import os

os.chdir("/workspaces/react_ui_KFH/py_x/")
print(os.listdir())
filename = 'x.json'

# Load the JSON data from the file
with open(filename, 'r', encoding='utf-8') as file:
    data = json.load(file)

all_data = []
for i in range(len(data)):
    try:
        clean_text = re.sub('<.*?>', '', data[i]['data']['msg']['correction'])

# Save the cleaned text in a variable
        my_text = clean_text
        ex_reponses = data[i].get('data', {}).get('msg')['ex_reponses']
        r = ["green" if i["correcte"] == 1 else "red" for i in ex_reponses]
        index_true=r.index("green")
        print(index_true)
        r1=["black" for i in ex_reponses]
        
        item = {
            'quez': data[i]['data']['msg']['name'],
            'resp_list': [resp['name'] for resp in data[i]['data']['msg']['ex_reponses']],
            "true_resp": r,
            "index_true":index_true,
            "org":r1,
            'quez_sound': data[i]['data']['msg']['sound_quest_ara'],
            'quez_imag': data[i]['data']['msg']['image'],
            'quez_h': my_text,
            'quez_resp_sound': ''
        }
        all_data.append(item)
    except Exception as e:
        print(e)

# Divide the data into chunks of 30 items
chunk_size = 30
data_chunks = [all_data[i:i+chunk_size] for i in range(0, len(all_data), chunk_size)]

# Create a dictionary with keys from Q_A to Q_P
# Each key corresponds to one chunk of data
data_dict = {}
alphabet = 'ABCDEFGHIJKLMNOP'
for i, chunk in enumerate(data_chunks):
    key = f'Q_{alphabet[i]}'
    data_dict[key] = chunk

# Prepare the JavaScript content
js_content = 'export default quezs=' + json.dumps(data_dict, ensure_ascii=False, indent=2)

# Add require statements for images and sounds
js_content = js_content.replace('"quez_sound": "', '"quez_sound": require("./')
js_content = js_content.replace('"quez_imag": "', '"quez_imag": require("./')
js_content = js_content.replace('.mp3"', '.mp3")')
js_content = js_content.replace('.gif"', '.gif")')
js_content = js_content.replace('.jpg"', '.jpg")')

# Write the JavaScript content to a file
with open('xrftn17.js', 'w', encoding='utf-8') as file:
    file.write(js_content)
