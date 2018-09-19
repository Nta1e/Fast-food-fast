from flask import jsonify, request
import json
from ..models.orders import Orders, Orders_list


def create_order():
    '''This function handles creating of a new order by passing in requested json
    data as instance variables into the Orders class and appending the Orders
    class namespace into the Orders_list.'''
    data = request.json
    given_data = {
        'order': data.get('order'),
        'location': data.get('location'),
        'comment': data.get('comment'),
        'price': data.get('price'),
        'delivery_time': data.get('delivery_time')
    }
    if not all(
        [data.get('order'),
         data.get('location'),
         data.get('comment'),
         data.get('price'),
         data.get('delivery_time')]
    ):
        return jsonify({'error': 'Missing field/s'}), 400
    else:
        new_order = Orders(
            given_data['order'],
            given_data['location'],
            given_data['comment'],
            given_data['price'],
            given_data['delivery_time']
        )
        Orders_list.append(new_order.__dict__)
        return jsonify({'Message': 'New order created'}), 201


def get_one(order_id):
    '''This function handles returning of a specific orders by id by passing
     in the order_id as the arguement'''
    try:
        temp_list = [
            each for each in Orders_list if each['id'] == order_id]
        return jsonify({'Order {}'.format(order_id): temp_list[0]}), 200

    except IndexError:
        return jsonify({'error': 'Not found!'}), 404


def edit_one(order_id):
    '''This function handles the updating of a particular order by id by 
    passing in the order_id as the arguement'''
    try:
        data = request.json
        temp_list = [
            each for each in Orders_list if each['id'] == order_id]
        temp_list[0]['order'] = data.get('order')
        temp_list[0]['location'] = data.get('location')
        temp_list[0]['comment'] = data.get('comment')
        temp_list[0]['price'] = data.get('price')
        temp_list[0]['delivery_time'] = data.get('delivery_time')
        return jsonify({'Message': 'Order Updated'}), 201

    except IndexError:
        return jsonify({'error': 'Not found!'}), 404
