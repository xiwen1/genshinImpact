from django.http import JsonResponse
from django.contrib.auth.models import User
from game.models.player.player import Player

def change_photo(request):
    data = request.GET
    user = request.user
    photo_new = data.get('photo', '').strip()
    if not photo_new:
        return JsonResponse({
            'result': 'default',
        })
    player = Player.objects.get(user=user)
    player.photo = photo_new
    player.save()
    print(player.photo)
    print(photo_new)
    return JsonResponse({
        'result': 'success',
        'photo': player.photo,
    })

