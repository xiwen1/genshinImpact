class xiwenGamePlayground {
    constructor(root) {
        this.root = root;

        this.$playground = $(`<div class="xiwen-game-playground"></div>`);

        this.hide();
        

        this.start(); //start() is the waiyan of constructor
    }

    start() {
    } 

    show() {
        this.$playground.show();
        this.root.$xiwen_game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.players = [];
        this.players.push(new Player(this, this.width/2, this.height/2, this.height*0.05, "rgba(0, 0, 0, 0)", this.height*0.35, true));
        let robot_nums = 5;
        for(let i=1; i<robot_nums+1; i++){
            this.players[i] = new Player(this, this.width/2, this.height/2, this.height*0.05, "yellow", this.height*0.30, false);
        }
    }

    hide() {
        this.$playground.hide();
    }
}

