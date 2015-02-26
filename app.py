# -*- coding: utf-8 -*-
import eventlet
eventlet.monkey_patch()


import os
import requests
from whitenoise import WhiteNoise
from flask import Flask, render_template, request, redirect


BASE_DIR = os.path.dirname(__file__)
API_ENDPOINT = os.getenv("API_ENDPOINT", "http://fun-api.herokuapp.com/shortcode/")


app = Flask(__name__, instance_relative_config=True)
app.wsgi_app = WhiteNoise(app.wsgi_app, root=os.path.join(BASE_DIR, "assets"), prefix="static/")


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/v/<shortcode>")
def view(shortcode):
    api_url = "%(API_ENDPOINT)s%(shortcode)s.json" % { "API_ENDPOINT": API_ENDPOINT, "shortcode": shortcode }
    data = requests.get(api_url).json()
    if not data:
        return redirect("/")
    return render_template("view.html", shortcode=shortcode, data=data,
                           base_url=request.base_url, host_url=request.host_url)

@app.route("/thank-you.html")
def thank_you():
    return render_template("thank-you.html")


