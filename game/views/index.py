import os

from django.shortcuts import render
from django.http import HttpResponse
from app.settings import BASE_DIR


file_path = os.path.join(BASE_DIR, 'game/templates/multiends/index.html')



def whu(request):
    return render(request, "multiends/index.html")


def index(request):
    return render(request, "multiends/web.html") # 总函数，整个游戏就着一个链接
