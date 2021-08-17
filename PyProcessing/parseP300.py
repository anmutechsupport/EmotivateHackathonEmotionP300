import pickle
import numpy as np 
import pandas as pd 
import model 
from statistics import mode

with open('mockdata\sample_p300.pkl', 'rb') as f: #/content/drive/MyDrive/datasets/bery_important.pkl
    dataX = pickle.load(f)

print(dataX.keys())

# starttime = dataX["starttime"]
# stoptime = dataX["stoptime"]
labels = dataX["labels"]
data = dataX["data"]

pow_data = []
data_timestamps = []
for row in data:
    pow_data.append(row["pow"])
    data_timestamps.append(row["time"]*1000)

print(np.array(pow_data).shape)

# print("time in seconds: "+str((stoptime-starttime)/1000))
# print(labels)

char_dataPairs = []
for label in labels:
    psdMatch = []
    p300_offset = label[1]+200
    # print(p300_offset)
    for ind, timestamp in enumerate(data_timestamps):
        # print(timestamp)
        if timestamp >= p300_offset and timestamp <= p300_offset+300:
            psdMatch.append(pow_data[ind])

    # print(len(psdMatch))
    if len(psdMatch) > 1:
        char_dataPairs.append([label[0], np.mean(psdMatch, axis=0)])
    elif len(psdMatch) == 0:
        break
    else:
       char_dataPairs.append([label[0], psdMatch[0]]) 

print(len(char_dataPairs[0][1]))

# for x in char_dataPairs:
#     print(len(x[1]))
print(len(labels))

inp_arr = pd.DataFrame([x[1] for x in char_dataPairs])

print(inp_arr.shape)

preds = model.P300_pred(inp_arr)
print(preds)

print(len(preds))

pred_char = pd.DataFrame([list(l) for l in zip([x[0] for x in char_dataPairs], preds)])
pos_preds = pred_char.loc[pred_char[1] == 1]

print(mode(pos_preds[0]))