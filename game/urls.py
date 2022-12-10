from django.urls import path
from django.contrib import admin
from game.views import index, index2
urlpatterns = [ # 这个app的url还需要写到总url中
    path("", index, name="index"), # 如果url中后面什么都没有就会返回index这个函数
    path("whu", index2, name="index2")
]