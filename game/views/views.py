from django.shortcuts import render
from django.http import HttpResponse
import os
from app.settings import BASE_DIR
file_path = os.path.join(BASE_DIR, 'game/templates/multiends/index.html')


f = open(file_path, 'r')
context1 = f.read()
print(context1)


context2 = '''
<h1 style="text-align: center">我是武汉大学张可为 qq：1597083201</h1>
<a href="/lzkuainan"><h1 style="text-align: center">凌志快男</h1></a>
<a href="/whu"><h1 style="text-align: center">武大传送门</h1></a>


'''

context3 = '''
<h1 style="text-align: center; font-family: 宋体">凌志快男</h1>
'''


def index(request):
    return HttpResponse(context2) # 返回的实际上就是字符串

def index2(request):
    return HttpResponse(context1)

def ding(request):
    return HttpResponse(context3)


