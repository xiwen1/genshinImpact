class SkiilCounter extends xiwenGameObject {
    constructor(type, playground) {
        super();
        this.type = type;
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.color = "#F67D39";
        this.radius = this.playground.height * 0.02;
        if(this.type === "iceball") {
            this.color = "#68D4D8";
            this.x = this.playground.width * 0.46;
            this.y = this.playground.height * 0.95;
        }
        if(this.type === "fireball") {
            this.color = "#F67D39";
            this.x = this.playground.width * 0.54;
            this.y = this.playground.height * 0.95;
        }
        
    }

    update() {
        // this.render();
    }

    hide() {
        this.hide();
    }
    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 1, Math.PI * 2-1, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill(); 
    }

}