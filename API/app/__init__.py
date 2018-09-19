from flask import Flask
from .views.views import Fast_food

app = Flask(__name__)
# Registering the Blueprint
app.register_blueprint(Fast_food, url_prefix='/api/v1')

