const upKey = 38;
const leftKey = 37;
const rightKey = 39;
const downKey = 40;
const space = 32;
const enter = 13;

const directionL = 0;
const directionR = 1 ;

function Hero(ctx, animation,keyboard, img){
    this.ctx = ctx;
    this.animation = animation;
    this.keyboard = keyboard;
    this.img = img;

    this.x = 10;
    this.y = 100;
    this.speed = 8;
    this.lifePoints = 10;

    this.sheet = new SpriteSheet(this.ctx, this.img, 1, 10, 120);
}
Hero.prototype = {
    update: function(){ 
        this.boundingBox()

        if (this.keyboard.pressed[upKey] && this.y > + 10){
            this.y -= this.speed;
        }
        if (this.keyboard.pressed[downKey] && this.y < this.ctx.canvas.height - 50){
            this.y += this.speed;
        }
        if (this.keyboard.pressed[leftKey] && this.x > -30){
            this.x -= this.speed;
        }
        if (this.keyboard.pressed[rightKey] && this.x < this.ctx.canvas.width - 50){
            this.x += this.speed;
        }
        this.direction = directionL;
        this.moving = false;
        this.sheet.nextFrame();
        if (this.x > 0) this.x -= 4;
    },
    shoot: function(){
        let shot = new Ball(this.ctx, 
        this.x + this.img.width / 9,
        this.y + this.img.height / 2);

        shot.speedX = 20;
        shot.speedY = 0;
        this.animation.newSprite(shot);
        colisor.newSprite(shot);

    },
    draw: function(){
        this.sheet.draw(this.x, this.y);

        for (let i=0; i < this.lifePoints; i++){
            this.ctx.fillStyle = 'pink';
            this.ctx.fillRect( 10 + 15 * i, 15, 10, 10);
        }
    },
    boundingBox: function() {
        let box =  [{x: this.x, y: this.y, width: this.img.width /9, height: this.img.height}]

        let ctx = this.ctx;
        for (let i in box) {
            ctx.save();
            ctx.strokeStyle = 'red';
            ctx.strokeRect(box[i].x, box[i].y, box[i].width, box[i].height);
            ctx.restore();
        }
        
        return box;
        
    },
    iCollided: function(sprite) {
        this.x -= 30;
        this.lifePoints -= 1;
        if (this.lifePoints == 0){
            this.animation.turnOff()
            alert('GAME OVER!')
        }
    }
}

//Classe do disparo============================================================
function Ball(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.width = 16;
    this.height = 6;
    this.color = '#C71585';
}
Ball.prototype = {
    update: function(){
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.ctx.canvas.width) {
            this.animation.deleteSprite(this);
            this.colisor.deleteSprite(this);
        }
    },
    draw: function(){
        this.ctx.save();
    
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    },
    boundingBox: function() {
        let box = [
            {x: this.x, y: this.y, width: 16, height: 6}
        ];

        let ctx = this.ctx;
        for (let i in box) {
            ctx.save();
            ctx.strokeStyle = 'red';
            ctx.strokeRect(box[i].x, box[i].y, box[i].width, box[i].height);
            ctx.restore();
        }
        
        return box;
    },
    iCollided: function(sprite) {
        this.animation.deleteSprite(this);
        this.colisor.deleteSprite(this);
    }
}
