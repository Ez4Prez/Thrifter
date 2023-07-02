#!/usr/bin/env python3

import ipdb

from flask import Flask, make_response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS

from models import db, Item, User, Order

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hotels.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

CORS(app)

api = Api(app)

class Items(Resource):

    def get(self):
        items = Item.query.all()

        response_body = []

        for item in items:
            response_body.append(item.to_dict())

        return make_response(jsonify(response_body), 200)

    def post(self):
        try:
            new_item = Item(
                item_brand=request.get_json().get('brand'), 
                item_description=request.get_json().get('description'), 
                item_img=request.get_json().get('image'),
                item_price=request.get_json().get('price'),
                item_size=request.get_json().get('size'),
                item_condition=request.get_json().get('condition')
                )
            db.session.add(new_item)
            db.session.commit()

            response_body = new_item.to_dict()
            
            return make_response(jsonify(response_body), 201)
        except ValueError as error:
            response_body = {
                "error": error.args
            }
            return make_response(jsonify(response_body), 422)


api.add_resource(Items, '/items')

class ItemById(Resource):

    def get(self, id):
        item = Item.query.filter(Item.id == id).first()

        if not item:
            response_body = {
                "error": "Hotel not found"
            }
            status = 404

        else:
            response_body = item.to_dict()
            # customer_list = []
            # for customer in list(set(hotel.customers)):
            #     customer_list.append({
            #         "id": customer.id,
            #         "first_name": customer.first_name,
            #         "last_name": customer.last_name
            #     })
            # response_body.update({"customers": customer_list})
            # status = 200

        return make_response(jsonify(response_body), status)
    
    def patch(self, id):
        item = Item.query.filter(Item.id == id).first()

        if not item:
            response_body = {
                "error": "Item not found"
            }
            return make_response(jsonify(response_body), 404)

        else:
            try:
                json_data = request.get_json()
                for key in json_data:
                    setattr(item, key, json_data.get(key))
                db.session.commit()

                response_body = item.to_dict()
                return make_response(jsonify(response_body), 200)
            
            except ValueError as error:
                
                response_body = {
                    "error": error.args
                }
                
                return make_response(jsonify(response_body), 422)
    
    def delete(self, id):
        item = Item.query.filter(Item.id == id).first()

        if not item:
            response_body = {
                "error": "Item not found"
            }
            status = 404

        else:
            db.session.delete(item)
            db.session.commit()

            response_body = {}
            status = 204

        return make_response(jsonify(response_body), status)


api.add_resource(ItemById, '/items/<int:id>')

class OrdersResource(Resource):

    def get(self):
        orders = Order.query.all()

        response_body = []
        for order in orders:
            response_body.append(order.to_dict())
        
        return make_response(jsonify(response_body), 200)
    
    def post(self):
        try:
            new_order = Order(user_id=request.get_json().get('user_id'), item_id=request.get_json().get('item_id'))

            db.session.add(new_order)
            db.session.commit()
            
            return make_response(jsonify(new_order.to_dict()), 201)
        except ValueError as error:
            response_body = {
                "error": error.args
            }
            return make_response(jsonify(response_body), 422)

api.add_resource(OrdersResource, '/orders')

class OrderById(Resource):

    def get(self, id):
        order = Order.query.filter(Order.id == id).first()

        if not order:
            response_body = {
                "error": "Customer not found"
            }
            status = 404
        else:
            response_body = order.to_dict()
            status = 200

        return make_response(jsonify(response_body), status)
    
    def patch(self, id):
        order = Order.query.filter(Order.id == id).first()

        if not order:
            response_body = {
                "error": "Customer not found"
            }
            return make_response(jsonify(response_body), 404)
        else:
            try:
                json_data = request.get_json()
                
                for key in json_data:
                    setattr(order, key, json_data.get(key))

                db.session.commit()

                response_body = order.to_dict()

                return make_response(jsonify(response_body), 200)
            except ValueError as error:
                response_body = {
                    "error": error.args
                }
                return make_response(jsonify(response_body), 422)
    
    def delete(self, id):
        order = Order.query.filter(Order.id == id).first()
        
        if not order:

            response_body = {
                "error": "Order not found"
            }
            status = 404
        
        else:
            
            db.session.delete(order)
            db.session.commit()

            response_body = {}
            status = 204

        return make_response(jsonify(response_body), status)

api.add_resource(OrderById, '/orders/<int:id>')

class Users(Resource):

    def get(self):
        users = User.query.all()

        response_body = []

        for user in users:
            response_body.append(user.to_dict())

        return make_response(jsonify(response_body), 200)
    
    def post(self):
        json_data = request.get_json()
        new_user = User(user_name=json_data.get('user_name'))
        db.session.add(new_user)
        db.session.commit()

        response_body = new_user.to_dict()
        
        return make_response(jsonify(response_body), 201)
    
api.add_resource(Users, '/users')

class UserById(Resource):

    def get(self, id):
        user = User.query.filter(User.id == id).first()

        if not user:
            response_body = {
                "error": "User not found"
            }
            status = 404
        else:
            response_body = user.to_dict()
            status = 200

        return make_response(jsonify(response_body), status)
    
    def patch(self, id):
        user = User.query.filter(User.id == id).first()

        if not user:
            response_body = {
                "error": "User not found"
            }
            status = 404
        else:
            json_data = request.get_json()

            for key in json_data:
                setattr(user, key, json_data.get(key))

            db.session.commit()

            response_body = user.to_dict()
            status = 200

        return make_response(jsonify(response_body), status)
    
    def delete(self, id):
        review = User.query.filter(User.id == id).first()
        
        if not review:

            response_body = {
                "error": "Review not found"
            }
            status = 404
        
        else:
            
            db.session.delete(review)
            db.session.commit()

            response_body = {}
            status = 204

        return make_response(jsonify(response_body), status)

api.add_resource(UserById, '/users/<int:id>')

if __name__ == '__main__':
    app.run(port=7000, debug=True)