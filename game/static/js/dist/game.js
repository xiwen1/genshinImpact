class xiwenGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="xiwen-game-menu">
    <h1 style="text-align: center; color: white">zkw's咒术回战</h1>
    <a href="whu"><h3 style="text-align: center; color: olive">ad:点此进入武大传送门，欢迎报考武汉大学！</h3></a>
    <div class="xiwen-game-menu-field">
        <div class="xiwen-game-menu-item xiwen-game-menu-item-single-mode">
            单人模式
        </div><br>
        <div class="xiwen-game-menu-item xiwen-game-menu-item-multi-mode">
            多人模式
        </div><br>
        <div class="xiwen-game-menu-item xiwen-game-menu-item-settings">
            设置
        </div>
    </div>
</div>
        `)
        this.$menu.hide();
        this.root.$xiwen_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.xiwen-game-menu-item-single-mode');
        this.$multi_mode = this.$menu.find('.xiwen-game-menu-item-multi-mode');
        this.$settings = this.$menu.find('.xiwen-game-menu-item-settings');
        this.start();
    }
    
    start() {
        this.add_listening_events(); //添加监听函数（监听鼠标操作）
        this.$menu.show();
    }

    add_listening_events() {
        let outer = this; //保存一下Menu对象
        this.$single_mode.click(function() {
            outer.hide();
            outer.root.playground.show("single mode");
        });
        this.$multi_mode.click(function(){
            outer.hide();
            outer.root.playground.show("multi mode");
        })
        this.$settings.click(function(){
            outer.hide();
            outer.root.settings.show();
        })
    }

    show() {
        this.$menu.show();
    }

    hide() {
        this.$menu.hide();
    }
}class xiwenGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="xiwen-game-playground">single mode</div>`);

        this.hide();
        this.root.$xiwen_game.append(this.$playground);

        this.start(); //start() is the waiyan of constructor
    }

    start() {
        let outer = this;
    }

    show() {
        this.$playground.show();
    }

    hide() {
        this.$playground.hide();
    }
}class xiwenGame {
    constructor(id) {
        this.id = id; 
        this.$xiwen_game = $("#" + id);
        this.menu = new xiwenGameMenu(this);
        this.playground = new this.xiwenGamePlayground(this);
        // this.settings = new this.xiwenGameSettings(this);

        this.start();
    }

    start() {

    }
}