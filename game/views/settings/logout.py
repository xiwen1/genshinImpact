from django.http import JsonResponse
from django.contrib.auth import logout

def signout(request):
    user = request.user;
    if not user.is_authenticated:
        return JsonResponse({
            'result': 'success',
        })
    logout(request)  # 登出只需要一个参数，只要将cookie删除即可
    return JsonResponse({
        'result': 'success',
    })