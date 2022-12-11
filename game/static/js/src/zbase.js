class xiwenGame {
    constructor(id) {
        this.id = id; 
        this.$xiwen_game = $("#" + id);
        this.menu = new xiwenGameMenu(this);
    }
}