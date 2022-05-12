function Zoiudao(ctx, img, x, y){
    this.ctx = ctx;
    this.img = img;

    this.x = x;
    this.y = y;
    this.speed = 4;
    this.lifePoints = 5;

    this.sheet = new SpriteSheet(this.ctx, this.img, 3, 3, 180);
}
Zoiudao.prototype = {
    update: function() {
        if (this.y > this.ctx.canvas.height - 100|| this.y < 0) {
            this.speed *= -1;
        }

        this.y -= this.speed;

        this.sheet.nextFrame();
    },
    draw: function() {
        this.sheet.draw(this.x, this.y)
    },
    boundingBox: function() {
        let box = [
            {x: this.x - 30 , y: this.y, width: 30 + this.img.width /3, height: this.img.height/3}];

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
        this.lifePoints -= 1;
        if (this.lifePoints == 0){
            this.animation.deleteSprite(this);
            this.colisor.deleteSprite(this);

            callToGuys(5);
        }

    }
}

//Aguoso======================================================================
function Aguoso(ctx, img, x, y){
    this.ctx = ctx;
    this.img = img;
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.lifePoints = 10;

    this.sheet = new SpriteSheet(this.ctx, this.img, 1, 9, 180);
}
Aguoso.prototype = {
    update: function() {
        this.x -= this.speed;

        this.sheet.nextFrame();
    },
    draw: function() {
        this.sheet.draw(this.x, this.y)
    },
    boundingBox: function() {
        let box = [
            {x: this.x - 30 , y: this.y, width: 30 + this.img.width /9, height: this.img.height}];

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
        this.lifePoints -= 1;
        if (this.lifePoints == 0){
            this.animation.deleteSprite(this);
            this.colisor.deleteSprite(this);
        }
        this.x += 20;
    }
}
//=============================================================================
function Pato(ctx, img, x, y){
    this.ctx = ctx;
    this.img = img;

    this.x = x;
    this.y = y;
    this.speed = 4;
    this.lifePoints = 5;

    this.sheet = new SpriteSheet(this.ctx, this.img, 3, 3, 180);
}
Pato.prototype = {
    update: function() {
        if (this.y > this.ctx.canvas.height - 100|| this.y < 0) {
            this.speed *= -1;
        }

        this.y -= this.speed;

        this.sheet.nextFrame();
    },
    draw: function() {
        this.sheet.draw(this.x, this.y)
    },
    boundingBox: function() {
        let box = [
            {x: this.x - 30 , y: this.y, width: 30 + this.img.width /3, height: this.img.height/3}];

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
        this.lifePoints -= 1;
        if (this.lifePoints == 0){
            this.animation.deleteSprite(this);
            this.colisor.deleteSprite(this);

            callToGuys(5)
            
        }

    }
}

//=============================================================================
function callToGuys(n) {
    background.speed = 10;  
    for (let i=0; i < n; i++){
        let aguoso = new Aguoso(ctx, aguosoImg, 1000+i*100 ,i*120);
        animation.newSprite(aguoso);
        colisor.newSprite(aguoso);
    }
}