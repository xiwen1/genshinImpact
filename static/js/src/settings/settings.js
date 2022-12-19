class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "web";
        this.username = "";
        this.photo = "";
        if(this.root.AcWingOS) this.platform = "acapp";

        this.start();
    }

    start() {
        this.getinfo();
    }
    login() { //打开登陆界面

    }

    register() {// 打开注册界面

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
                    outer.login();
                }
            }
        });
    }

    hide() {
        
    }

    show() {

    }
}