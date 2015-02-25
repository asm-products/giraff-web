# -*- coding: utf-8 -*-
import eventlet
eventlet.monkey_patch()


import os
from whitenoise import WhiteNoise
from flask import Flask, render_template


BASE_DIR = os.path.dirname(__file__)


app = Flask(__name__, instance_relative_config=True)
app.wsgi_app = WhiteNoise(app.wsgi_app, root=os.path.join(BASE_DIR, "assets"), prefix="static/")


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/thank-you.html")
def thank_you():
    return render_template("thank-you.html")


