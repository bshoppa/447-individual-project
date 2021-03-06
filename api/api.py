import time
from flask import Flask

from flask import request

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker

import json

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    marks = Column(Integer)
    def __repr__(self):
        return "<User(name='%s', marks='%i')>" % (
                        self.name, self.marks)

engine = create_engine('sqlite:///:memory:?check_same_thread=False', echo=True)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

a_user = User(name='Joe', id = 21, marks = 90)
session.add_all([
a_user,
User(name='Jian', id = 22, marks = 92),
User(name='Chris', id = 23, marks = 90),
User(name='Sai', id = 24, marks = 95),
User(name='Andrew', id = 25, marks = 100),
User(name='Lynn', id = 26, marks = 90),
User(name='Robert', id = 27, marks = 85)
])

print(a_user, a_user.id)

print(session.dirty)
print(session.commit())

print(a_user.id)

app = Flask(__name__)

@app.route('/pythondb', methods = ['POST', 'GET'])
def interact():
    print(request.data)
    Data = json.loads(request.data)
    if request.method == 'POST':
        if Data['type'] == "read":
            Query = session.query(User)
            list = Query.filter(User.id == Data['id'])
            if list.count() > 0:
                dictionary = {
                    'name' : list[0].name,
                    'id' : list[0].id,
                    'marks' : list[0].marks
                }
                return dictionary
            return {"result": "failure"}
        if Data['type'] == "create":
            this_user = User(name = Data['name'], id = Data['id'], marks = Data['marks'])
            session.add(this_user)
            return {"result": "done"}
        if Data['type'] == "delete":
            Query = session.query(User)
            list = Query.filter(User.id == Data['id'])
            if list.count() > 0:
                session.delete(list[0])
                print("success?")
                return {"result": "done"}
            return {"result": "failure"}
        if Data['type'] == "update":
            Query = session.query(User)
            list = Query.filter(User.id == Data['id'])
            if list.count() > 0:
                user = list[0]
                user.name = Data['name']
                # do not set id because the id is primary key
                user.marks = Data['marks']
                return {"result": "done"}
            return {"result": "failure"}
    if request.method == "DELETE":
        request.form['id']
    if request.method == "GET":
        pass
    return {'time': sqlalchemy.__version__}
