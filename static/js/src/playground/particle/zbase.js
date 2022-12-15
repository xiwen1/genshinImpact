class Particle extends xiwenGameObject {
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
    
    
}