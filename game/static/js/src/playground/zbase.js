class xiwenGamePlayground {
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
}