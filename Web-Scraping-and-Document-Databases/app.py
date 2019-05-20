from flask import Flask, render_template, redirect
from flask_pymongo import pymongo
import scrape_mars

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.mars_db
collection = db.mars_facts


@app.route("/")
def home():
    mars = list(db.collection.find())
    return render_template("index.html", mars = mars)

@app.route("/scrape")
def web_scrape():
    db.collection.remove({})
    mars = scrape_mars.scrape()
    db.collection.insert_one(mars)
    return  render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)

