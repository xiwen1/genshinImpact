export class xiwenGame {
    constructor(id) {
        this.id = id; 
        this.$xiwen_game = $("#" + id);
        this.menu = new xiwenGameMenu(this);
        this.playground = new xiwenGamePlayground(this);
        //this.settings = new xiwenGameSettings(this);
        this.score_board = new ScoreBoard(this); 

        this.start();
    }

    start() {

    }
}
