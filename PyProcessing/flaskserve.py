# import main Flask class and request object
from flask import Flask, request, jsonify, send_file, abort, send_from_directory
from flask_cors import CORS
import json
import pickle
from preprocessing import *
from tqdm import tqdm 
from flask_socketio import SocketIO
from model import * # quick fix, check later
from statistics import mode
        
# create the Flask app
app = Flask(__name__) # static_url_path=('/Users/anush/AppData/Local/Temp')
CORS(app)
# socketio = SocketIO(app)

@app.route('/emotions', methods=['POST', 'GET'])
def pred_serve():
    if request.method == 'POST':

        request_data = request.get_json()
        # eeg = request_data["data"]
        # timestamps = request_data["timestamps"]

        # print("elapsed time: {}".format(int(int(timestamps["stop"])-int(timestamps["start"]))/1000))

        print(len(request_data))
    
        # with open('mockdata\openbci_updated5.pkl', 'rb') as f: # mockdata/museeeg.pkl
        #     data = pickle.load(f)

        fs = int(request_data["fs"])
        batch = 5*fs

        load_data = np.array(request_data["finalData"]).T
        print(load_data.shape)
        elec_count = load_data.shape[1]

        epoched = np.array(np.array_split(load_data[:int(len(load_data)/batch)*batch], int((len(load_data)/batch))))
        print(epoched.shape)

        relevant_trim = collect_batches(epoched, fs)

        outputArr = pd.DataFrame(np.array([[list(flatten(coeff)) for coeff in batch] for batch in tqdm(relevant_trim)]).reshape(len(relevant_trim), elec_count*-1))
        print(outputArr.shape)

        preds = model.gen_predict(outputArr, elec_count)

        # Note: when the request objects are saved, page refreshes
        # Note: file.read() returns bin, file.stream returns a spooledtempfile

        # with open(f"openbci_updated5.pkl", "wb") as outfile:
        #     pickle.dump(request_data, outfile)
        
        # with open(f"musetimestamps.pkl", "wb") as outfile:
        #     pickle.dump(timestamps, outfile)
                
        # features = [1,0,1,0]

        return json.dumps(preds) # list(preds)

    return 'Classifying emotions'

@app.route('/emotionshack', methods=['POST', 'GET'])
def pred_servehack():
    if request.method == 'POST':

        request_data = request.get_json()

        # print(request_data)

        # data = [row["pow"] for row in request_data["finalData"]]
        data = []
        for row in request_data["finalData"]:
            try:
                data.append(row["pow"])
            except:
                print("probably a keyword error")

        print(len(data))

        batches = []
        for x in range(int(len(data)/40)):
            batches.append(np.mean(data[x*40:x*40+40], axis=0))

        df_batches = pd.DataFrame(batches)
        print(df_batches)

        preds = model.emotiv_pred(df_batches)

        if type(preds) == list:
            preds = mode(preds)

        return json.dumps(preds) # list(preds)

    return 'Classifying emotions'

@app.route('/p300', methods=['POST', 'GET'])
def p300():
    
    if request.method == 'POST':

        request_data = request.get_json()

        labels = request_data["labels"]
        data = request_data["data"]

        
        pow_data = []
        data_timestamps = []
        for row in data:
            try:
                pow_data.append(row["pow"])
                data_timestamps.append(row["time"]*1000)
            except:
                print("probably a keyword error")

        # print(pow_data)

        char_dataPairs = []
        for label in labels:
            psdMatch = []
            p300_offset = label[1]+200
            # print(p300_offset)
            for ind, timestamp in enumerate(data_timestamps):
                # print(timestamp)
                if timestamp >= p300_offset and timestamp <= p300_offset+300:
                    print("in")
                    psdMatch.append(pow_data[ind])

            # print(len(psdMatch))
            if len(psdMatch) > 1:
                char_dataPairs.append([label[0], np.mean(psdMatch, axis=0)])
            elif len(psdMatch) == 0:
                break
            else:
                char_dataPairs.append([label[0], psdMatch[0]])
            
        print(char_dataPairs)
        inp_arr = pd.DataFrame([x[1] for x in char_dataPairs])
        print(inp_arr)
        preds = model.P300_pred(inp_arr)
        
        pred_char = pd.DataFrame([list(l) for l in zip([x[0] for x in char_dataPairs], preds)])
        pos_preds = pred_char.loc[pred_char[1] == 1]

        char = mode(pos_preds[0])

        
        return json.dumps(char) # list(preds)

    return 'p300'

if __name__ == '__main__':
    # run app in debug mode on port 5000
    import model 
    app.run(debug=True, port=5000)
#     socketio.run(app, port=5000)
