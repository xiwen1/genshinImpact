class xiwenGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="xiwen-game-menu">
        <br>
    <h1 style="text-align: center; color: #D971CB; font-size:8vh">zkw's原神大乱斗</h1>
    <a href="whu"><h3 style="text-align: center; color: #CD5ABD">ad:点此进入武大传送门，欢迎报考武汉大学！</h3></a>
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
        //this.$menu.hide();
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
            outer.root.playground.show();
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
}