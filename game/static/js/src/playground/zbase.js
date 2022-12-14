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
        this.players.push(new Player(this, this.width/2, this.height/2, this.height*0.05, "white", this.height*0.35, true));
        let robot_nums = 4;
        for(let i=1; i<robot_nums+1; i++){
            this.players[i] = new Player(this, this.width/2, this.height/2, this.height*0.05, "yellow", this.height*0.30, false);
        }

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

