import datetime
Orders_list = []


class Orders:
    '''This class stores orders data'''
    increment = 0

    def __init__(self, order, location, comment, price, delivery_time):
        Orders.increment += 1
        self.id = Orders.increment
        self.order = order
        self.location = location
        self.comment = comment
        self.payment = 'On Delivery'
        current_date = str(datetime.datetime.now())
        self.date = current_date[:10]
        self.price = price
        self.delivery_time = delivery_time
        
