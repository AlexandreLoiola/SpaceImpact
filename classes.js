//Classe-pai-para-todos-as-entidades===========================================
function Entity(ctx){
    this.ctx = ctx;
    this.sprite = [];

    this.name = 'default'
    this.x = 0;
    this.y = 0;
    this.speedX = 0;
    this.speedY = 0;
}
Entity.prototype = {
    addSprite: function(){
        //this.sprite.push();
       //Use um aço for para recortar as imagens do seu sprite sheet
    },
    update: function(){
        //Aqui você adiciona os status que serão atualizados
    },
    draw: function(){
        let ctx = this.ctx;
        ctx.save();

        ctx.drawImage();
        ctx.restore();
        //A ideia é que não seja cortado as imagens constantemente
    }
};


//Tem-função-de-animar-todos-os-elementos======================================
function Animation(ctx){
    this.ctx = ctx;
    this.sprites = [];
    this.on = false;
}
Animation.prototype = {
    newSprite: function(sprite){
        this.sprites.push(sprite);
    },
    clearScreen: function(){
        let ctx = this.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
    turnOn: function(){
        this.on = true;
        this.nextFrame();
    },
    turnOff: function(){
        this.on = false
    },
    nextFrame: function(){
        if (!this.on) return;
        this.clearScreen();

        for (let i in this.sprites)
            this.sprites[i].update();
        for (let i in this.sprites)
            this.sprites[i].draw();

        let animation = this;
        requestAnimationFrame(function(){animation.nextFrame();});
    }
};