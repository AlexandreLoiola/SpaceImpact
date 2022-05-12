function Background(ctx, img){
    this.ctx = ctx;
    this.img = img;
    this.x = 0;
    this.y = 0;
    this.speed = 10;

    this.sheet = new SpriteSheet(this.ctx, this.img, 1, 1, 120);
}
Background.prototype = {
    update: function() {
        this.x -= this.speed;
        if (this.x < -400) {
            this.x = 0;
        }
    },
    draw: function() {
        this.ctx.save()
        this.ctx.drawImage(
            this.img,
            this.x, this.y,
            this.img.width, this.img.height
        )
        this.ctx.drawImage(
            this.img,
            this.x + this.img.width, this.y,
            this.img.width, this.img.height
        )
        this.ctx.restore()
    }
}
