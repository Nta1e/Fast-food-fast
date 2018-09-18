from flask import Flask, jsonify, Blueprint, request
from ..controllers import orders_controller
from ..models.orders import Orders, Orders_list
JSON_MIME_TYPE = 'application/json'

Fast_food = Blueprint('Fast_food', __name__)


@Fast_food.route('/', methods=['GET'])
def index():
    return jsonify({'Message': 'Welcome to Fast-food-fast!!!'})


@Fast_food.route('/orders', methods=['POST'])
def create_new():
    '''This route creates a new order'''
    if request.content_type != JSON_MIME_TYPE:
        return jsonify({'error': 'Invalid Content Type'}), 406
    return orders_controller.create_order()


