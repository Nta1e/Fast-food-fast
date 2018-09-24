from flask import Flask
from .views.views import fast_food

app = Flask(__name__)
# Registering the Blueprint
app.register_blueprint(fast_food, url_prefix='/api/v1')
