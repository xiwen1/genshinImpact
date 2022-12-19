from django.db import models
from django.contrib.auth.models import User
# 写完记得注册到admin

# 需要执行python3 manage.py makemigrations和Python3 manage.py migrate将自定义类迁移到自带数据库中
# 启动nginx服务： sudo /etc/init.d/nginx start

class Player(models.Model): # 每一个models中的类都需要Model这个东西
    user = models.OneToOneField(User, on_delete=models.CASCADE) # 将player与user中的类一一对应，同时跟随user的删除
    photo = models.URLField(max_length=256, blank=True)

    def __str__(self):
        return str(self.user) # 数据界面显示的名字

