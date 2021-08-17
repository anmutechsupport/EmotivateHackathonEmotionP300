import numpy as np
import pandas as pd
from tqdm import tqdm 

from pywt import wavedec
from brainflow.data_filter import DataFilter, FilterTypes, NoiseTypes
from antropy import hjorth_params, app_entropy, svd_entropy

#screw python warnings
import warnings
warnings.filterwarnings("ignore")

import concurrent.futures
import functools

def flatten(l):
    for item in l:
        try:
            yield from flatten(item)
        except TypeError:
            yield item


def filtered(data, fs):

    data = data.astype('float64')

    DataFilter.perform_bandpass(data, fs, 12.6491106, 36.0, 4,
                            FilterTypes.BESSEL.value, 0)
    DataFilter.remove_environmental_noise(data, fs, NoiseTypes.SIXTY.value)

    return data

def calc_stats(coeff):
  return [svd_entropy(coeff), hjorth_params(coeff), np.amin(coeff), np.mean(np.square(coeff)), np.var(coeff), np.std(coeff), pd.Series(coeff).mad(), app_entropy(coeff), np.amax(coeff)]
  

def featurize_parralel(batches, level=4):

  sep_inp = [electrode for electrode in batches.T]

  with concurrent.futures.ProcessPoolExecutor() as executor:
    coeffs = list(executor.map(functools.partial(wavedec, wavelet='db2', mode='zero', level=level), sep_inp))
    coeffs = np.array(coeffs).flatten()

    return list(executor.map(calc_stats, coeffs))

def collect_batches(epoched, fs):
    with concurrent.futures.ProcessPoolExecutor() as executor:
        return [batchn for batchn in tqdm(executor.map(functools.partial(featurize, fs=fs), [batches for batches in epoched], chunksize=1))]

def featurize(batches, fs, level=4):
  # for electrode in range(batches.shape[1]-1):
  #   for coeff in (wavedec(filtered(batches[:, electrode]), 'db2', 'zero', level=level)):
  #     # print(coeff.shape)
  #     yield [dom_frequency(coeff), hjorth_params(coeff), num_zerocross(coeff), spectral_entropy(coeff, 128, nperseg=128), pd.Series(coeff).mad(), hurst_rs(coeff), app_entropy(coeff), lyap_r(coeff, emb_dim=2), svd_entropy(coeff), corr_dim(coeff, emb_dim=2), sample_entropy(coeff), np.amin(coeff), np.amax(coeff), np.mean([np.amin(coeff), np.amax(coeff)]), np.mean(np.square(coeff)), np.mean(coeff), np.var(coeff), np.std(coeff)]

  return [[[svd_entropy(coeff), hjorth_params(coeff), np.amin(coeff), np.mean(np.square(coeff)), np.var(coeff), np.std(coeff), pd.Series(coeff).mad(), app_entropy(coeff), np.amax(coeff)] for coeff in wavedec(filtered(batches[:, electrode], fs), 'db2', 'zero', level=level)] for electrode in range(batches.shape[1])]


# if __name__ == '__main__':
#     from fastai.tabular.all import *
#     import pathlib
#     temp = pathlib.PosixPath
#     pathlib.PosixPath = pathlib.WindowsPath
    
#     with open('mockdata\museeeg.pkl', 'rb') as f: # mockdata/museeeg.pkl
#         data = pickle.load(f)

#     fs = int(data["fs"])
#     batch = 5*fs

#     load_data = np.array(data["finalData"]).T
#     elec_count = load_data.shape[1]

#     epoched = np.array(np.array_split(load_data[:int(len(load_data)/batch)*batch], int((len(load_data)/batch))))
#     print(epoched.shape)

#     relevant_trim = collect_batches(epoched, fs)

#     outputArr = pd.DataFrame(np.array([[list(flatten(coeff)) for coeff in batch] for batch in tqdm(relevant_trim)]).reshape(len(relevant_trim), elec_count*-1))
#     print(outputArr.shape)

#     preds = gen_predict(outputArr)

#     pathlib.PosixPath = temp












