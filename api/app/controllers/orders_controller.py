from flask import jsonify, request
import json
from ..models.orders import Orders, orders_list


def create_order():
    '''This function handles creating of a new order by passing in requested json
    data as instance variables into the Orders class and appending the Orders
    class namespace into the orders_list.'''
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
        orders_list.append(new_order.__dict__)
        return jsonify({'Message': 'New order created',
                        "order": new_order.__dict__}), 201


def get_one(order_id):
    '''This function handles returning of a specific orders by id by passing
     in the order_id as the arguement'''
    try:
        updated_order = [
            each for each in orders_list if each['id'] == order_id]
        return jsonify({'Order {}'.format(order_id): updated_order[0]}), 200

    except IndexError:
        return jsonify({'error': 'Not found!'}), 404


def edit_one(order_id):
    '''This function handles the updating of a particular order by id by
    passing in the order_id as the arguement'''
    try:
        data = request.json
        updated_order = [
            each for each in orders_list if each['id'] == order_id]
        updated_order[0]['order'] = data.get('order')
        updated_order[0]['location'] = data.get('location')
        updated_order[0]['comment'] = data.get('comment')
        updated_order[0]['price'] = data.get('price')
        updated_order[0]['delivery_time'] = data.get('delivery_time')
        return jsonify({'Message': 'Order Updated',
                        "order": updated_order}), 201

    except IndexError:
        return jsonify({'error': 'Not found!'}), 404
