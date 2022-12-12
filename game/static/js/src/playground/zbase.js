class xiwenGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="xiwen-game-playground"></div>`);

        //this.hide();
        this.root.$xiwen_game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.players = [];
        this.players.push(new Player(this, this.width/2, this.height/2, this.height*0.045, "white", this.height*0.25, true));

        this.start(); //start() is the waiyan of constructor
    }

    start() {
    } 

    show() {
        this.$playground.show();
    }

    hide() {
        this.$playground.hide();
    }
}

