//shouzimu must be a to cpmpress in first place
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

