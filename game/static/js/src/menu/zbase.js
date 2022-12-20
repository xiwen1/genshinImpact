class xiwenGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="xiwen-game-menu">
        <br>
    <h1 style="text-align: center; color:#E24B0D; font-size:8vh">zkw's原神大乱斗</h1>
    <a href="whu"><h3 style="text-align: center; color: #CD5ABD">ad:点此进入武大传送门，欢迎报考武汉大学！</h3></a>
    <div class="xiwen-game-menu-field">
        <div class="xiwen-game-menu-item xiwen-game-menu-item-single-mode">
            单人模式
        </div><br>
        <div class="xiwen-game-menu-item xiwen-game-menu-item-multi-mode">
            多人模式
        </div><br>
        <div class="xiwen-game-menu-item xiwen-game-menu-item-settings">
            设置(退出登录)
        </div><br>
        <div class="xiwen-game-menu-item xiwen-game-menu-item-change-photo">
            修改头像
        </div>
    </div>
    <div class="xiwen-game-change-photo">
        <input type="text" placeholder="此处填写你心仪头像的网页链接(不填写则使用默认绫华头像)">
        <div class="change-photo-submit"><button>确认</button></div>
    </div>
</div>
        `)
        //this.$menu.hide();
        this.root.$xiwen_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.xiwen-game-menu-item-single-mode');
        this.$multi_mode = this.$menu.find('.xiwen-game-menu-item-multi-mode');
        this.$settings = this.$menu.find('.xiwen-game-menu-item-settings');
        this.$change_photo = this.$menu.find('.xiwen-game-menu-item-change-photo');
        this.$change_photo_links = this.$menu.find('.xiwen-game-change-photo');
        this.$menu_field = this.$menu.find('.xiwen-game-menu-field');
        this.$photo_link = this.$menu.find('.xiwen-game-change-photo input')
        this.$change_photo_submit = this.$menu.find('.change-photo-submit');
        this.start();
        this.hide();
    }
    
    start() {
        this.add_listening_events(); //添加监听函数（监听鼠标操作）
        this.$menu.show();
        this.$change_photo_links.hide();
    }

    add_listening_events() {
        let outer = this; //保存一下Menu对象
        this.$single_mode.click(function() {
            outer.hide();
            outer.root.playground.show();
        });
        this.$multi_mode.click(function(){
            outer.hide();
            outer.root.playground.show("multi mode");
        })
        this.$settings.click(function(){
            console.log("click settings");
            outer.root.settings.logout_on_remote();
        })
        this.$change_photo.click(function() {
            outer.$menu_field.hide();
            outer.$change_photo_links.show();
            outer.add_listening_events_photo();
        })
        
        
    }

    add_listening_events_photo() {
        let outer = this;
        this.$change_photo_submit.click(function() {
            outer.change_photo();
        })
    }

    change_photo() {
        let outer = this;
        let photo = this.$photo_link.val();
        $.ajax({
            url: "https://app4220.acapp.acwing.com.cn/settings/change_photo/",
            type: "GET",
            data: {
                photo: photo,
            },
            success: function(resp) {
                console.log(resp);
                if(resp.result === "default") {
                    setTimeout(function() {
                        window.location.reload();
                    }, 2000);
                    window.alert("将使用默认头像，2秒后自动刷新")
                } else {
                    setTimeout(function() {
                        window.location.reload();
                    }, 2000);
                    window.alert("修改成功，将于两秒后自动刷新")
                }
            }
        })
    }


    show() {
        this.$menu.show();
    }

    hide() {
        this.$menu.hide();
    }
}