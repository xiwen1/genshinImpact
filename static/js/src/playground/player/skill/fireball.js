class FireBall extends Balls {
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
        this.player.damage_sum += this.damage;
        this.player.hitted_fireball++;
        this.destroy();
    }


}