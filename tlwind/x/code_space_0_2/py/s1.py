import json
import os

filename = 'x.json'

# Load the JSON data from the file
with open(filename, 'r', encoding='utf-8') as file:
    data = json.load(file)

all_data = []
for i in range(1):
    try:
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
            'quez_h': '',
            'quez_resp_sound': ''
        }
        all_data.append(item)
    except Exception as e:
        print(e)

# Prepare the JavaScript content
js_content = 'export default quezs={'+'\n'+'"Q_A":' + json.dumps(all_data, ensure_ascii=False, indent=2) +"}"

# Add require statements for images and sounds
js_content = js_content.replace('"quez_sound": "', '"quez_sound": require("./')
js_content = js_content.replace('"quez_imag": "', '"quez_imag": require("./')
js_content = js_content.replace('.mp3"', '.mp3")')
try:
    js_content = js_content.replace('.gif"', '.gif")')
    js_content = js_content.replace('.jpg"', '.jpg")')
except:
    pass
    
# Write the JavaScript content to a file
with open('xrftn11.js', 'w', encoding='utf-8') as file:
    file.write(js_content)
