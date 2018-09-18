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


@Fast_food.route('/orders', methods=['GET'])
def return_all():
    '''This route fetches all the orders made'''
    return jsonify({'Orders': Orders_list})


@Fast_food.route('/orders/<int:order_id>', methods=['GET'])
def return_one(order_id):
    '''This route fetches a specific order by id'''
    specific = orders_controller.get_one(order_id)
    return specific


@Fast_food.route('/orders/<int:order_id>', methods=['PUT'])
def update_one(order_id):
    '''This order updates a specific order by id'''
    specific = orders_controller.edit_one(order_id)
    return specific
