from flask import Flask
from flask_wtf.csrf import CsrfProtect
from app.config import Config


app = Flask(__name__)
csrf = CsrfProtect(app)

app.config.from_object(Config)

from app import views
