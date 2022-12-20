from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.models.player.player import Player


def register(request):
    data = request.GET
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    password_confirm = data.get('password_confirm', '').strip()
    if not username or not password:
        return JsonResponse({
            'result': '用户名和密码不能为空',
        })
    if password != password_confirm:
        return JsonResponse({
            'result': '两次输入的密码不一致',
        })
    if User.objects.filter(username=username).exists():  # 检查隐忽明是否存在，filter是筛选函数
        return JsonResponse({
            'result': '用户名已存在',
        })
    user = User(username=username)
    user.set_password(password)
    user.save() # 将用户存储下来
    Player.objects.create(user=user, photo='https://moetoutiao.com/wp-content/uploads/2021/07/img_60fd3c25cbc85.jpg')
    login(request, user)
    return JsonResponse({
        'result': 'success',
    })