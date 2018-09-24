from flask import Flask, jsonify, Blueprint, request
from ..controllers import orders_controller
from ..models.orders import Orders, orders_list
JSON_MIME_TYPE = 'application/json'

fast_food = Blueprint('fast_food', __name__)


@fast_food.route('/', methods=['GET'])
def index():
    return jsonify({'Message': 'Welcome to Fast-food-fast!!!'})


@fast_food.route('/orders', methods=['POST'])
def create_new():
    '''This route creates a new order'''
    if request.content_type != JSON_MIME_TYPE:
        return jsonify({'error': 'Invalid Content Type'}), 406
    return orders_controller.create_order()


@fast_food.route('/orders', methods=['GET'])
def return_all():
    '''This route fetches all the orders made'''
    return jsonify({'Orders': orders_list})


@fast_food.route('/orders/<int:order_id>', methods=['GET'])
def return_one(order_id):
    '''This route fetches a specific order by id.'''
    specific_order = orders_controller.get_one(order_id)
    return specific_order


@fast_food.route('/orders/<int:order_id>', methods=['PUT'])
def update_one(order_id):
    '''This order updates a specific order by id.'''
    specific_order = orders_controller.edit_one(order_id)
    return specific_order
