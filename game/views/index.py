from django.shortcuts import render


def index(request):
    return render(request, "mutliends/web.html") # 总函数，整个游戏就着一个链接
