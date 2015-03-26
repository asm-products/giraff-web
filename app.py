# -*- coding: utf-8 -*-
import eventlet
eventlet.monkey_patch()


import os
import base64
import requests
from whitenoise import WhiteNoise
from flask.ext.mobility import Mobility
from flask import Flask, render_template, request, redirect, url_for


BASE_DIR = os.path.dirname(__file__)
API_ENDPOINT = os.getenv("API_ENDPOINT", "http://fun-api.herokuapp.com/shortcode/")


app = Flask(__name__, instance_relative_config=True)
Mobility(app)
app.wsgi_app = WhiteNoise(app.wsgi_app, root=os.path.join(BASE_DIR, "assets"), prefix="static/")


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file_obj = request.files["file"]
        if file_obj and file_obj.mimetype in ["image/gif"]:
            # upload process
            file_data = file_obj.stream.read()
            b64_data = base64.b64encode(file_data)
            payload = \
            {
                "image":
                {
                    "name": "dunno",
                    "original_source": "dunno",
                    "bytes": len(file_data),
                    "shortcode":"dunno",
                    "file":
                    {
                        "filename": file_obj.filename,
                        "content": b64_data,
                        "content_type": file_obj.mimetype
                    }
                }
            }
            requests.post(API_ENDPOINT, data=payload)
            return redirect("/?uploaded=yes")
        return redirect("/?uploaded=no")
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


