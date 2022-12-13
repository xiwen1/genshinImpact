class xiwenGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="xiwen-game-menu">
        <br>
    <h1 style="text-align: center; color: white">zkw's咒术回战</h1>
    <a href="whu"><h3 style="text-align: center; color: olive">ad:点此进入武大传送门，欢迎报考武汉大学！</h3></a>
    <div class="xiwen-game-menu-field">
        <div class="xiwen-game-menu-item xiwen-game-menu-item-single-mode">
            单人模式
        </div><br>
        <div class="xiwen-game-menu-item xiwen-game-menu-item-multi-mode">
            多人模式
        </div><br>
        <div class="xiwen-game-menu-item xiwen-game-menu-item-settings">
            设置
        </div>
    </div>
</div>
        `)
        //this.$menu.hide();
        this.root.$xiwen_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.xiwen-game-menu-item-single-mode');
        this.$multi_mode = this.$menu.find('.xiwen-game-menu-item-multi-mode');
        this.$settings = this.$menu.find('.xiwen-game-menu-item-settings');
        this.start();
    }
    
    start() {
        this.add_listening_events(); //添加监听函数（监听鼠标操作）
        this.$menu.show();
    }

    add_listening_events() {
        let outer = this; //保存一下Menu对象
        this.$single_mode.click(function() {
            outer.hide();
            outer.root.playground.show();
        });
        this.$multi_mode.click(function(){
            outer.hide();
            outer.root.playground.show("multi mode");
        })
        this.$settings.click(function(){
            outer.hide();
            outer.root.settings.show();
        })
    }

    show() {
        this.$menu.show();
    }

    hide() {
        this.$menu.hide();
    }
}//shouzimu must be a to cpmpress in first place
let XIWEN_GAME_OBJECT = []; //将创建实例添加到全局变量中

class xiwenGameObject {
    constructor() {
        XIWEN_GAME_OBJECT.push(this);

        this.has_called_start = false;  //是否执行过start函数
        this.timedelta = 0;  //当前帧距离上一帧的时间间隔，因为不以定每个浏览器都会调用60帧 
    }

    start() { //只会在第一帧执行一次

    }

    update() { //每一帧执行一次

    }

    on_destroy() {
        
    }

    destroy() { //删掉该物体
        this.on_destroy();
        for(let i=0; i<XIWEN_GAME_OBJECT.length; i++) {
            if(XIWEN_GAME_OBJECT[i] === this) {
                XIWEN_GAME_OBJECT.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;
let XIWEN_GAME_ANIMATION = function(timestamp) { //时间戳
    for(let i=0; i<XIWEN_GAME_OBJECT.length; i++) {
        let obj = XIWEN_GAME_OBJECT[i];
        if(!obj.has_called_start){
            obj.start();
            obj.has_called_start = true;
        }
        else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;

    requestAnimationFrame(XIWEN_GAME_ANIMATION);//递归使每一帧都调用一次
}


requestAnimationFrame(XIWEN_GAME_ANIMATION);  //提供的api，设置60帧，作用为会在传入的参数函数设置的当前帧的下一帧再次执行该函数

class GameMap extends xiwenGameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');//you can check the api of canvas
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);
    }

    start() {

    }

    update() {
        this.render();
    }

    render() {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}class Particle extends xiwenGameObject {
    constructor(x, y, vx, vy, color, radius, speed, move_length) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.radius = radius;
        this.speed = speed;
        this.move_length = move_length;
        this.eps = 1;
        this.friction = 0.95;
    }
    
    
}class Balls extends xiwenGameObject {
    constructor(playground, player, x, y, vx, vy, radius, color, speed, move_length, damage) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.player = player;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.speed = speed;
        this.radius = radius;
        this.damage = damage;
        this.move_length = move_length;
        this.eps = 0.1;
        this.type = "fireball";
    }

    is_collision(player) {
        let distance = this.get_dist(this.x, player.x, this.y, player.y);
        if(distance < this.radius + player.radius) {
            return true;
        }
        return false;
    }

    attack(player) {
        let angle = Math.atan2(player.y - this.y, player.x - this.x);
        player.is_attacked(angle, this.damage, this.type);
        this.destroy();
    }

    get_dist(x1, x2, y1, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx*dx+dy*dy);
    }

    start() {

    }

    update() {
        if(this.move_length < this.eps){
            this.destroy();
            return false;
        }

        let moved = Math.min(this.move_length, this.speed*this.timedelta/1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.move_length -= moved;

        for(let i=0; i<this.playground.players.length; i++){
            let player = this.playground.players[i];
            if(this.player !== player && this.is_collision(player)){
                this.attack(player);
            }
        }
        this.render();
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill(); 
    }
}class FireBall extends Balls {
    constructor(playground, player, x, y, vx, vy, radius, color, speed, move_length, damage) {
        super(playground, player, x, y, vx, vy, radius, color, speed, move_length, damage);
        this.color = "orange";
        this.speed *= 1;
        this.radius = radius;
        this.damage *= 0.9;
        this.type = "fireball";
        this.player = player;
    }

    attack(player) {
        let angle = Math.atan2(player.y - this.y, player.x - this.x);
        player.is_attacked(angle, this.damage, this.type);
        player.get_fire_attached();
        this.player.hitted_fireball++;
        this.destroy();
    }


}class IceBall extends Balls {
    constructor(playground, player, x, y, vx, vy, radius, color, speed, move_length, damage) {
        super(playground, player, x, y, vx, vy, radius, color, speed, move_length, damage);
        this.color = "#00FFFF";
        this.speed *= 1.4;
        this.radius = radius * 1.3;
        this.damage *= 1.2;
        this.type = "iceball";
    }

    attack(player) {
        let angle = Math.atan2(player.y - this.y, player.x - this.x);
        player.is_attacked(angle, this.damage);
        player.get_ice_attached();
        this.destroy();
    }
}class Sentence_ball extends Balls {
    constructor(playground, player, x, y, vx, vy, radius, color, speed, move_length, damage) {
        super(playground, player, x, y, vx, vy, radius, color, speed, move_length, damage);
        this.color = "orange";
        this.speed *= 1;
        this.radius = radius*2;
        this.damage *= 1.4;
        this.type = "fireball";
    }

    attack(player) {
        let angle = Math.atan2(player.y - this.y, player.x - this.x);
        player.is_attacked(angle, this.damage, this.type);
        player.get_fire_attached();
        this.destroy();
    }
}class Player extends xiwenGameObject {
    constructor(playground, x, y, radius, color, speed, is_me) {
        super(); //register in the quanjushuzu
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.damage_x = 0;
        this.damage_y = 0;
        this.damage_speed = 0;
        this.friction = 0.96;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.is_me = is_me;
        this.move_length = 0; //最好需要预先定义！！！
        this.eps = 0.1; //float less than 0.1 is considered as 0;
        this.ice_attached = 0;
        this.fire_attached = 0;
        this.water_attached = 0;
        this.iced_up = 0;
        this.iced_speed = this.speed * 0.6;
        this.const_speed = this.speed;
        this.const_color = this.color;
        this.const_radius = this.radius;
        this.hitted_fireball = 0;

        this.cur_skill = null;
    }

    start() {
        if(this.is_me) {
            this.add_listening_events();
        } else {
            let tx = Math.random() * this.playground.width;
            let ty = Math.random() * this.playground.height;
            this.move_to(tx, ty);
        }
    }

    add_listening_events() {
        let outer = this;
        this.playground.game_map.$canvas.on("contextmenu", function() {
            return false;
        });
        this.playground.game_map.$canvas.mousedown(function(e) {
            if (e.which === 3) {//1:left 2:center 3:right
                outer.move_to(e.clientX, e.clientY); //each stand for the position division
            } else if (e.which === 1) {
                if(outer.cur_skill === "fireball") {
                    outer.shoot_fireball(e.clientX, e.clientY);
                }
                else if(outer.cur_skill === "iceball") {
                    outer.shoot_iceball(e.clientX, e.clientY);
                }
                outer.cur_skill = null;
            }
        })

        $(window).keydown(function(e) { //catch the button player press
            if (e.which === 70) { //f
                outer.cur_skill = "fireball";
            }
            if (e.which === 68) { //d
                outer.cur_skill = "iceball";
            }
        })
    }

    shoot_fireball(tx, ty) {
        console.log(this.hitted_fireball);
        if(this.hitted_fireball <= 2) {
            let x = this.x, y = this.y;
            let radius = this.playground.height * 0.01;
            let angle = Math.atan2(ty - this.y, tx - this.x);
            let vx = Math.cos(angle), vy = Math.sin(angle);
            let color = "orange";
            let speed = this.playground.height * 0.6;
            let move_length = this.playground.height * 1.5;
            new FireBall(this.playground, this, x, y, vx, vy, radius, color, speed, move_length, this.playground.height * 0.0042 );
        } else {
            this.hitted_fireball = 0;
            this.shoot_sentence_ball(tx, ty);
            
        }
    }

    shoot_sentence_ball(tx, ty) {
        let x = this.x, y = this.y;
        let radius = this.playground.height * 0.01;
        let angle = Math.atan2(ty - this.y, tx - this.x);
        let vx = Math.cos(angle), vy = Math.sin(angle);
        let color = "orange";
        let speed = this.playground.height * 0.8;
        let move_length = this.playground.height * 1.8;
        let angle_1 = angle*1.1;
        let angle_2 = angle*0.9;
        let vx_1 = Math.cos(angle_1);
        let vy_1 = Math.sin(angle_1);
        let vx_2 = Math.cos(angle_2);
        let vy_2 = Math.sin(angle_2);
        new Sentence_ball(this.playground, this, x, y, vx, vy, radius, color, speed, move_length, this.playground.height * 0.0042)
        new Sentence_ball(this.playground, this, x, y, vx_1, vy_1, radius, color, speed, move_length, this.playground.height * 0.0042)
        new Sentence_ball(this.playground, this, x, y, vx_2, vy_2, radius, color, speed, move_length, this.playground.height * 0.0042)        
    }

    shoot_iceball(tx, ty) {
        let x = this.x, y = this.y;
        let radius = this.playground.height * 0.01;
        let angle = Math.atan2(ty - this.y, tx - this.x);
        let vx = Math.cos(angle), vy = Math.sin(angle);
        let color = "orange";
        let speed = this.playground.height * 0.6;
        let move_length = this.playground.height * 2;
        new IceBall(this.playground, this, x, y, vx, vy, radius, color, speed, move_length, this.playground.height * 0.0042);
    }

    is_attacked(angle, damage, type) {
        let damage_1 = damage;
        if(this.radius < 10) {
            this.destroy();
            return false;
        }
        this.damage_x = Math.cos(angle);
        this.damage_y = Math.sin(angle);
        this.damage_speed = damage * 120;
        this.speed *= 1.1;
        if(type === "fireball" && this.ice_attached > this.eps) {
            this.damage_speed *= 2;
            damage_1 = damage * 2;
            this.ice_attached = 0;
            this.fire_attached = 0;
        }
        this.radius -= damage_1;
    }

    get_fire_attached() {
        this.fire_attached = 3;
    }

    get_ice_attached() {
        this.ice_attached = 3;
    }

    get_water_attached() {
        this.water_attached = 3;
    }

    get_iced_up() {
        this.iced_up = 2;
    }

    get_dist(x1, x2, y1, y2){
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx*dx + dy*dy);
    }

    move_to(tx, ty) {
        this.move_length = this.get_dist(tx, this.x, ty, this.y);
        this.angle = Math.atan2(ty - this.y, tx - this.x);
        this.vx = Math.cos(this.angle);
        this.vy = Math.sin(this.angle);
    }

    update() {
        this.color = this.const_color;
        this.speed = this.const_speed;
        if(this.fire_attached > this.eps) {
            this.color = "orange";
            if(this.is_me){
                this.color = "#FFFF99"
            }
            this.fire_attached -= this.timedelta/1000;
        } else if(this.ice_attached > this.eps) {
            this.color = "#00FFFF";
            if(this.is_me) {
                this.color = "#CCFFFF";
            }
            this.ice_attached -= this.timedelta/1000;
            this.speed = this.iced_speed;
        } else if(this.water_attached > this.eps) {
            this.color = "blue";
            if(this.is_me) {
                this.color = "#99CCFF";
            }
            this.water_attached -= this.timedelta/1000;
        }
        if(this.damage_speed > this.eps*30) {
            this.vx = this.vy = 0;
            this.move_length = 0;
            this.x += this.damage_x * this.damage_speed * this.timedelta / 1000*1.5;
            this.y += this.damage_y * this.damage_speed * this.timedelta / 1000*1.5;
            this.damage_speed *= this.friction;
        } else{
            if(Math.random() < 1/300 && !this.is_me){
                let player = this.playground.players[0];
                let random = Math.random();
                if(random < 0.2){
                    this.shoot_fireball(player.x, player.y);
                } else if( random < 0.4){
                    this.shoot_iceball(player.x, player.y);
                } else {
                    let random_1 = Math.floor(Math.random() * 4);
                    let random_2 = Math.random();
                    if(random_2 > 0.5){
                    this.shoot_fireball(this.playground.players[random_1].x, this.playground.players[random_1].y);
                    } else {
                    this.shoot_iceball(this.playground.players[random_1].x, this.playground.players[random_1].y);
                    }
                }
                
            }
            if(this.move_length < this.eps){
                this.move_length = 0;
                this.vx = 0;
                this.vy = 0;
                if(!this.is_me) {
                    let tx = Math.random() * this.playground.width;
                    let ty = Math.random() * this.playground.height;
                    this.move_to(tx, ty);
                }
            } else {
                let unit = this.speed*this.timedelta / 1000;
                let moved = Math.min(this.move_length, unit);
                this.x += this.vx*moved;
                this.y += this.vy*moved;
                this.move_length -= moved;
            }
        }
        //修复出界问题
        if(this.x <= 0 || this.x >= this.playground.width || this.y <= 0 || this.y >= this.playground.height) {
            this.vx = -this.vx;
            this.vy = -this.vy;
            this.damage_speed = 0;

        }
        if(this.radius < this.const_radius/3){
            this.destroy();
        }
        
        this.render();
    }

    render() { //draw a sphere
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color; //这里少加一个ctx，建议学学canvas  //每一帧涂抹一次，效果实际上是覆盖，背景颜色的涂抹是半透明的，一次可以产生模糊的效果
        this.ctx.fill();
    }
}class xiwenGamePlayground {
    constructor(root) {
        this.root = root;

        this.$playground = $(`<div class="xiwen-game-playground"></div>`);

        this.hide();
        this.root.$xiwen_game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.players = [];
        this.players.push(new Player(this, this.width/2, this.height/2, this.height*0.05, "white", this.height*0.35, true));
        let robot_nums = 3;
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

export class xiwenGame {
    constructor(id) {
        this.id = id; 
        this.$xiwen_game = $("#" + id);
        this.menu = new xiwenGameMenu(this);
        this.playground = new xiwenGamePlayground(this);
        // this.settings = new this.xiwenGameSettings(this);

        this.start();
    }

    start() {

    }
}
