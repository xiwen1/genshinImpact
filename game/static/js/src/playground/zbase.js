class xiwenGamePlayground {
    constructor(root) {
        this.root = root;

        this.$playground = $(`<div class="xiwen-game-playground"></div>`);

        this.hide();
        this.root.$xiwen_game.append(this.$playground);

        this.start(); //start() is the waiyan of constructor
    }

    start() {
        let outer = this;
        this.resize();
        $(window).resize(function() { // &(windows).resize是一个事件, 当用户调整窗口大小时就会被触发
            outer.resize();
        })
    } 

    resize() {
        // this.width = this.$playground.width();
        // this.height =  this.$playground.height();
        let unit = Math.min(this.$playground.width() / 16, this.$playground.height() / 9);
        this.width = unit * 16;
        this.height = unit * 9;
        this.scale = this.height;

        if(this.game_map) this.game_map.resize();
    }

    show() { //打开playground界面
        this.$playground.show();
        // this.width = this.$playground.width();
        // this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.players = [];
        this.players.push(new Player(this, this.width/2/this.scale, 0.5, 0.05, "rgba(0, 0, 0, 0)", 0.35, true));
        let robot_nums = 5;
        for(let i=1; i<robot_nums+1; i++){
            this.players[i] = new Player(this, this.width/2/this.scale, 0.5, 0.05, "yellow", 0.30, false);
        }
    }

    hide() {
        this.$playground.hide();
    }
}

