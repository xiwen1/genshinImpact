class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "web";
        this.username = "";
        this.photo = "";
        if(this.root.AcWingOS) this.platform = "acapp";
        this.$settings = $(`
            <div class="xiwen-game-settings">
                <div class="xiwen-game-settings-login">
                    <div class="xiwen-game-settings-title">登陆</div>
                    <div class="xiwen-game-settings-username">
                        <div class="xiwen-game-settings-item">
                            <input type="text" placeholder="用户名">
                        </div>
                    </div>
                    <div class="xiwen-game-settings-password">
                        <div class="xiwen-game-settings-item">
                            <input type="password" placeholder="密码">
                        </div>
                    </div>
                    <div class="xiwen-game-settings-submit">
                        <div class="xiwen-game-settings-item">
                            <button>开启提瓦特之旅</button>
                        </div>
                    </div>
                    <div class="xiwen-game-settings-error-message">
                    </div>
                    <div class="xiwen-game-settings-goto-register">
                        注册
                    </div>
                    <br>
                    <div class="xiwen-game-settings-acwing">
                        <img width="30" src="https://app4220.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
                        <div>
                            Acwing一键登陆
                        </div>
                    </div>
                </div>
                <div class="xiwen-game-settings-register">
                    <div class="xiwen-game-settings-title">注册</div>
                    <div class="xiwen-game-settings-username">
                        <div class="xiwen-game-settings-item">
                            <input type="text" placeholder="用户名">
                        </div>
                    </div>
                    <div class="xiwen-game-settings-password">
                        <div class="xiwen-game-settings-item">
                            <input type="password" placeholder="密码">
                        </div>
                    </div>
                    <div class="xiwen-game-settings-password">
                        <div class="xiwen-game-settings-item">
                            <input type="password" placeholder="确认密码">
                        </div>
                    </div>
                    <div class="xiwen-game-settings-submit">
                        <div class="xiwen-game-settings-item">
                            <button>降临未知的世界</button>
                        </div>
                    </div>
                    <div class="xiwen-game-settings-error-message">
                    </div>
                    <div class="xiwen-game-settings-goto-register">
                        登陆
                    </div>
                    <br>
                    <div class="xiwen-game-settings-acwing">
                        <img width="30" src="https://app4220.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
                        <div>
                            Acwing一键登陆
                        </div>
                    </div>
                </div>
            </div>
        `);
        this.root.$xiwen_game.append(this.$settings);
        this.$login = this.$settings.find(".xiwen-game-settings-login");
        this.$login.hide();
        this.$register = this.$settings.find(".xiwen-game-settings-register");
        this.$register.show();
        this.start();
    }

    start() {
        this.getinfo();
    }
    login() { //打开登陆界面
        this.$register.hide();
        this.$login.show();
    }

    register() {// 打开注册界面
        this.$login.hide();
        this.$register.show();
    }

    getinfo() {
        let outer = this;
        $.ajax({
            url: "https://app4220.acapp.acwing.com.cn/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp) {
                console.log(resp);
                if(resp.result === "success") {
                    outer.hide();
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.root.menu.show();
                } else {
                    outer.register();
                }
            }
        });
    }

    hide() {
        this.$settings.hide();
    }

    show() {
        this.$settings.show();
    }
}