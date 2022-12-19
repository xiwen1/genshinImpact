export class xiwenGame {
    constructor(id, AcGameOS) {
        this.id = id; 
        this.$xiwen_game = $("#" + id);
        this.settings = new Settings(this);
        this.menu = new xiwenGameMenu(this);
        this.AcGameOS = AcGameOS;
        this.playground = new xiwenGamePlayground(this);
        this.score_board = new ScoreBoard(this); 

        this.start();
    }

    start() {

    }
}
