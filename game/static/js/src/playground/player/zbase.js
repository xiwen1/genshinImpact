class Player extends xiwenGameObject {
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
        this.base_cd = 1;
        this.fireball_cd = this.base_cd;
        this.fireball_getting_time = 0;
        this.iceball_cd = this.base_cd * 1.5;
        this.iceball_getting_time = 0;
        this.fireball_max = 3;
        this.iceball_max = 2;
        this.cur_fireball = 0;
        this.cur_iceball = 0;
        this.cur_skill = null;
        this.fireball_counter = null;
        this.iceball_counter = null;
        this.end_time = 0;
        this.damage_sum = 0;
        this.is_dead = false;
        this.dead_opponent = 0;
        this.dead_counted = false;
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
        if(this.cur_fireball < 0.99) {
            return false;
        } else {
            if(this.hitted_fireball < 2) {
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
            this.cur_fireball --;
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
        let angle_1 = angle+0.1;
        let angle_2 = angle-0.1;
        let vx_1 = Math.cos(angle_1);
        let vy_1 = Math.sin(angle_1);
        let vx_2 = Math.cos(angle_2);
        let vy_2 = Math.sin(angle_2);
        new Sentence_ball(this.playground, this, x, y, vx, vy, radius, color, speed, move_length, this.playground.height * 0.0042)
        new Sentence_ball(this.playground, this, x, y, vx_1, vy_1, radius, color, speed, move_length, this.playground.height * 0.0042)
        new Sentence_ball(this.playground, this, x, y, vx_2, vy_2, radius, color, speed, move_length, this.playground.height * 0.0042)        
    }

    shoot_iceball(tx, ty) {
        if(this.cur_iceball < 0.99){
            return false;
        } else{
            let x = this.x, y = this.y;
            let radius = this.playground.height * 0.01;
            let angle = Math.atan2(ty - this.y, tx - this.x);
            let vx = Math.cos(angle), vy = Math.sin(angle);
            let color = "orange";
            let speed = this.playground.height * 0.6;
            let move_length = this.playground.height * 2;
            new IceBall(this.playground, this, x, y, vx, vy, radius, color, speed, move_length, this.playground.height * 0.0042);
            this.cur_iceball --;
        }
        
    }

    is_attacked(angle, damage, type) {
        let damage_1 = damage;
        if(this.radius < 10) {
            this.destroy();
            return false;
        }
        this.damage_x = Math.cos(angle);
        this.damage_y = Math.sin(angle);
        this.damage_speed = damage * 90;
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

    get_one_fireball() {
        if(this.cur_fireball < this.fireball_max){
            this.fireball_getting_time += this.timedelta / 1000;
            let remainder = this.fireball_getting_time / this.fireball_cd;
            this.fireball_getting_time %= this.fireball_cd;
            this.cur_fireball += Math.floor(remainder / 1);
        } else {
            return false;
        }
        
    }

    get_one_iceball() {
        if(this.cur_iceball < this.iceball_max) {
            this.iceball_getting_time += this.timedelta / 1000;
            let remainder = this.iceball_getting_time / this.iceball_cd;
            this.iceball_getting_time %= this.iceball_cd;
            this.cur_iceball += Math.floor(remainder / 1);
        } else {
            return false;
        }
        
    }


    update() {
        this.get_one_fireball();
        this.get_one_iceball();
        this.end_time += this.timedelta / 1000;
        if(this.cur_fireball > 0.9 && this.fireball_counter === null) {
            this.fireball_counter = new SkiilCounter("fireball", this.playground);
        }
        if(this.cur_iceball > 0.9 && this.iceball_counter === null) {
            this.iceball_counter = new SkiilCounter("iceball", this.playground);
        }
        if(this.cur_fireball < this.eps && this.fireball_counter !== null) {
            this.fireball_counter.color = "black";
            this.fireball_counter.destroy();
            this.fireball_counter = null;
        }
        if(this.cur_iceball < this.eps && this.iceball_counter !== null) {
            this.iceball_counter.color = "black";
            this.iceball_counter.destroy();
            this.iceball_counter = null;
        }
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
            if(Math.random() < 1/200 && !this.is_me){
                let player = this.playground.players[0];
                let random = Math.random();
                if(random < 0.1){
                    this.shoot_fireball(player.x, player.y);
                } else if( random < 0.2){
                    this.shoot_iceball(player.x, player.y);
                } else {
                    let random_1 = Math.floor(Math.random() * this.playground.players.length);
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
            this.is_dead = true;
            if(this.is_me) {
                this.playground.hide();
                this.playground.root.score_board.show(this.end_time, this.damage_sum, "lose");
            }
            this.destroy();
            DEAD_PLAYER_NUMS ++;
        }

        if(this.radius < this.const_radius/4){
            this.x = this.playground.width*2;
            if(this.is_me) {
                this.playground.hide();
                this.playground.root.score_board.show(this.end_time, this.damage_sum, "lose");
            }
            this.destroy();
            DEAD_PLAYER_NUMS ++;
        }
        if(DEAD_PLAYER_NUMS >= this.playground.players.length-1) {
            this.playground.hide();
            this.playground.root.score_board.show(this.end_time, this.damage_sum, "win");
        }
        this.render();
        console.log(DEAD_PLAYER_NUMS);

    }

    render() { //draw a sphere
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color; //这里少加一个ctx，建议学学canvas  //每一帧涂抹一次，效果实际上是覆盖，背景颜色的涂抹是半透明的，一次可以产生模糊的效果
        this.ctx.fill();
    }
}