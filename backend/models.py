#Contains Structures for the database
from sqlalchemy import Column,Integer,Float,String,Enum,DateTime
from datetime import datetime
import enum

from sqlalchemy.sql import func 



class UserInfo(Base):
    __tablename__="user"

    userid=Column(Integer,primary_key=True,autoincrement=True)
    name=Column(String(100),nullable=False)
    email=Column(String(100),nullable=False,unique=True)
    password=Column(String(20),nullable=False)
    createdat=Column(DateTime(timezone=True),server_default=func.now())
    organization=Column(String(200))
