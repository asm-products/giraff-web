# -*- coding: utf-8 -*-
import eventlet
eventlet.monkey_patch()


import os
import requests
from whitenoise import WhiteNoise
from flask.ext.mobility import Mobility
from flask import Flask, render_template, request, redirect, url_for


BASE_DIR = os.path.dirname(__file__)
API_ENDPOINT = os.getenv("API_ENDPOINT", "http://fun-api.herokuapp.com/shortcode/")


app = Flask(__name__, instance_relative_config=True)
Mobility(app)
app.wsgi_app = WhiteNoise(app.wsgi_app, root=os.path.join(BASE_DIR, "assets"), prefix="static/")


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/v/<shortcode>")
def view(shortcode):
    api_url = "%(API_ENDPOINT)s%(shortcode)s.json" % { "API_ENDPOINT": API_ENDPOINT, "shortcode": shortcode }
    data = requests.get(api_url).json()
    f = request.args.get("f") # format (video/gif)
    if not data:
        return redirect("/")
    if not f:
        if request.MOBILE:
            return redirect("%s?f=gif" % url_for("view", shortcode=shortcode))
        else:
            f = "video"
    return render_template("view.html",
                           shortcode=shortcode, data=data, f=f,
                           base_url=request.base_url, host_url=request.host_url)

@app.route("/thank-you.html")
def thank_you():
    return render_template("thank-you.html")


