from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Item(db.Model):
    __tablename__ = "items"
    item_id = db.Column(db.Integer, primary_key=True)
    item_brand = db.Column(db.String)
    item_description = db.Column(db.String)
    item_img = db.Column(db.String)
    item_price = db.Column(db.Integer)
    item_size = db.Column(db.Text)
    item_condition = db.Column(db.Text)
    item_favorite = db.Column(db.Text)

    orders = db.relationship('Order', backref="item", lazy=True)

    def to_dict(self):
        return {
            'item_id': self.item_id,
            'item_brand': self.item_brand,
            'item_description': self.item_description,
            'item_img': self.item_img,
            'item_price': self.item_price,
            'item_size': self.item_size,
            'item_condition': self.item_condition,
            'item_favorite': self.item_favorite
        }

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String)

    orders = db.relationship('Order', backref="user", lazy=True)

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'user_name': self.user_name
        }


class Order(db.Model):
    __tablename__ = 'orders'
    order_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.item_id'))

    def to_dict(self):
        return {
            'order_id': self.order_id,
            'user_id': self.user_id,
            'item_id': self.item_id
        }

    