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

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)

    