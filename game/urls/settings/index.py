from django.urls import path
from game.views.settings.getinfo import getinfo
from game.views.settings.login import signin
from game.views.settings.logout import signout
from game.views.settings.register import register
from game.views.settings.change_photo import change_photo

urlpatterns = [
    path('getinfo/', getinfo, name='settings_getinfo'),
    path('login/', signin, name='settings_login'),
    path('logout/', signout, name='settings_logout'),
    path('register/', register, name='settings_register'),
    path('change_photo/', change_photo, name='settings_change_photo'),
]