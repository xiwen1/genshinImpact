export class xiwenGame {
    constructor(id) {
        this.id = id; 
        this.$xiwen_game = $("#" + id);
        // this.menu = new xiwenGameMenu(this);
        this.playground = new xiwenGamePlayground(this);
        // this.settings = new this.xiwenGameSettings(this);

        this.start();
    }

    start() {

    }
}
