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
                    <div class="xiwen-game-settings-title">登录</div>
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
                        <img width="30" src="https://app4286.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
                        <div>
                            Acwing一键登录
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
                    <div class="xiwen-game-settings-password xiwen-game-settings-password-first">
                        <div class="xiwen-game-settings-item">
                            <input type="password" placeholder="密码">
                        </div>
                    </div>
                    <div class="xiwen-game-settings-password xiwen-game-settings-password-second">
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
                        <img width="30" src="https://app4286.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
                        <div>
                            Acwing一键登录
                        </div>
                    </div>
                </div>
            </div>
        `);
        this.root.$xiwen_game.append(this.$settings);
        this.$login = this.$settings.find(".xiwen-game-settings-login");
        this.$login_username = this.$login.find(".xiwen-game-settings-username input");
        this.$login_password = this.$login.find(".xiwen-game-settings-password input");
        this.$login_submit = this.$login.find(".xiwen-game-settings-submit button");
        this.$login_error_message = this.$login.find(".xiwen-game-settings-error-message");
        this.$login_register = this.$login.find(".xiwen-game-settings-goto-register");
        this.$login.hide();
        this.$register = this.$settings.find(".xiwen-game-settings-register");
        this.$register_username = this.$register.find(".xiwen-game-settings-username input");
        this.$register_password = this.$register.find(".xiwen-game-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".xiwen-game-settings-password-second input");
        this.$register_error_message = this.$register.find(".xiwen-game-settings-error-message");
        this.$register_submit = this.$register.find(".xiwen-game-settings-submit");
        this.$register_login = this.$register.find(".xiwen-game-settings-goto-register");
        this.$register.hide();
        this.start();
    }

    start() {
        this.getinfo();
        this.add_listening_events();
    }

    add_listening_events() { //绑定监听函数
        this.add_listening_events_login();
        this.add_listening_events_register();
    }

    add_listening_events_login() {
        let outer = this;

        this.$login_register.click(function() {
            outer.register();
        })

        this.$login_submit.click(function() {
            outer.login_on_remote();
        })
    }

    add_listening_events_register() {
        let outer = this;

        this.$register_login.click(function() {
            outer.login();
        });
        this.$register_submit.click(function() {
            outer.register_on_remote();
        });
    }

    login_on_remote() { //在远程服务器上登录
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();

        $.ajax({
            url: "https://app4286.acapp.acwing.com.cn/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp) {
                console.log(resp);
                if(resp.result === "success") {
                    location.reload();  //刷新页面
                } else {
                    outer.$login_error_message.html(resp.result);
                }
            }
        });
    }

    register_on_remote() { //在远程服务器上注册
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$register_error_message.empty();

        $.ajax({
            url: "https://app4286.acapp.acwing.com.cn/settings/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success: function(resp) {
                console.log(resp);
                if(resp.result === "success") {
                    location.reload();
                } else {
                    outer.$register_error_message.html(resp.result);
                }
            }
        })
    }

    logout_on_remote() { //在远程服务器上登出
        if(this.platform === "acapp") return false;

        $.ajax({
            url: "https://app4286.acapp.acwing.com.cn/settings/logout/",
            type: "GET",
            success: function(resp) {
                console.log(resp);
                if(resp.result === "success") {
                    location.reload();
                }
            }
        });
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
            url: "https://app4286.acapp.acwing.com.cn/settings/getinfo/",
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
                    outer.login();
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