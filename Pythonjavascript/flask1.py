import sys
from flask import Flask,render_template,request, redirect, Response
import random, json

app = Flask(__name__)

@app.route("/")
def output():
    # serve index template
	#return "Hello World!"
    return render_template('index.html',name ='Joe')


@app.route('/receiver', methods = ['GET','POST'])
def worker():
	# read json + reply
	data = request.get_json(force=True)
	result = ''


	for item in data:
		# loop over every row
		result += str(item['make'])


	return result

if __name__ == "__main__":
    app.run(debug=True)
