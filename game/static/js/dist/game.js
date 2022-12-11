class xiwenGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="xiwen-game-menu">
<h1 style="text-align: center; color: white">zkw's咒术回战</h1>
<a href="whu"><h3 style="text-align: center; color: green">ad:点此进入武大传送门，欢迎报考武汉大学！</h3></a>
</div>
        `)
        this.root.$xiwen_game.append(this.$menu);
    }
}class xiwenGame {
    constructor(id) {
        this.id = id; 
        this.$xiwen_game = $("#" + id);
        this.menu = new xiwenGameMenu(this);
    }
}