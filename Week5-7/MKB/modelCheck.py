import sys

from flask import Flask, render_template, request, redirect, Response
from pymongo import MongoClient
import os
os.environ["PATH"] += os.pathsep + 'C:/Users/ruthv/graphviz-2.38/release/bin'
import pydot_ng as pydot
from keras.utils import CustomObjectScope
from keras.utils.vis_utils import plot_model
from keras.models import load_model
from bson import json_util
import random, json
#https://www.youtube.com/watch?v=k-NSNUKk1Kw


app = Flask(__name__)
#app.config['MONGO_DBNAME'] = 'db1ase'
#app.config['MONGO_URI'] = 'mongodb://ruthvic:ruthvic@ds115569.mlab.com:15569/db1ase';
client = MongoClient('mongodb://ruthvic:ruthvic@ds115569.mlab.com:15569/db1ase')
db = client.db1ase
collection = db.ruth_modelkb
#mongo = PyMongo(app)

@app.route('/')
def output():
    # In the home page, load all h5 files and write json summary to mongo
    model = load_model('models/mnistCNN.h5')
    # model.summary()
    print(model.to_json())
    response = model.to_json()
    response = json.loads(response)
    #data = json_util.loads(response)
    collection.insert_one(response)
    # serve index template
    return render_template('index.html')

@app.route('/find')
def find():
    data = collection.find_one({'Type': 'Classification'})
    return 'found this' + data['Type'] + data['Accuracy'] + data['Language']

"""
@app.route('/receiver', methods=['POST'])
def worker():
    # read json + reply
    data = request.get_json(force=True)
    result = ''

    for item in data:
        # loop over every row
        result += str(item['make']) + '\n'

    return result
"""

if __name__ == '__main__':
    # run!
    app.run(debug=True)
