from django.urls import path, include
from game.views.index import index, whu

urlpatterns = [
    path("", index, name="index"),
    path("menu", include("game.urls.menu.index")), # 将其他文件中的映射添加进来
    path("playground", include('game.urls.playground.index')),
    path('settings', include('game.urls.settings.index')),
    path('whu', whu, name='whu'),
]