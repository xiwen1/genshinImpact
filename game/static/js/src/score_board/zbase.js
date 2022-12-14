class ScoreBoard {
    constructor(root) {
        this.root = root;
        this.board_header = "<div class='xiwen-game-board'><div class='xiwen-game-score-board'>"
        this.board_tail = "</div></div>"
        this.board_title = "<div class='xiwen-game-score-board-title'>" + this.win_lose + "</div>"
        this.board_time = "<div class='xiwen-game-score-board-item'> 花费时间：" + this.time + "s </div>";
        this.board_damage_sum = "<div class='xiwen-game-score-board-item'> 造成总伤害：" + this.damage_sum + "</div>";
        this.$score_board = $(this.board_header + this.board_title + this.board_time + this.board_damage_sum + this.board_tail);

        this.start();
    }

    start() {

    }

    show(time, damage_sum, win_lose) {
        this.$score_board.show();
        this.time = Math.floor(time);
        this.win_lose = win_lose;
        this.damage_sum = Math.floor(damage_sum);
        this.board_header = "<div class='xiwen-game-board'><div class='xiwen-game-score-board'>"
        this.board_tail = "</div></div>"
        this.board_title = "<div class='xiwen-game-score-board-title'>" + this.win_lose + "</div>"
        this.board_time = "<div class='xiwen-game-score-board-item'> 花费时间：" + this.time + "s </div>";
        this.board_damage_sum = "<div class='xiwen-game-score-board-item'> 造成总伤害：" + this.damage_sum + "</div>";
        this.$score_board = $(this.board_header + this.board_title + this.board_time + this.board_damage_sum + this.board_tail);
        this.root.$xiwen_game.append(this.$score_board);
    }

    hide() {
        this.$score_board.hide();
    }
}