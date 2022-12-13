class IceBall extends Balls {
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
}