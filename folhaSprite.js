function SpriteSheet(ctx, img, numRow, numColumn, fps) {
    this.ctx = ctx;
    this.img = img;
    this.numRow = numRow;
    this.numColumn = numColumn;
    this.fps = fps;

    this.row = 0;
    this.column = 0;
}
SpriteSheet.prototype = {
    nextFrame: function() {
        let now = new Date().getTime();
        if (!this.lastTime) {
            this.lastTime = now;
        }
        if (now - this.lastTime < this.fps) return;

        if (this.column < this.numColumn - 1) {
            this.column++
        }
        else {
            this.column = 0;
            if (this.row < this.numRow - 1) {
                this.row++;
            }
            else {
                this.row = 0;
            }
        }
        this.lastTime = now;
    },
    draw: function(x, y) {
        let width = this.img.width / this.numColumn;
        let height = this.img.height / this.numRow;

        this.ctx.drawImage(
            this.img,
            width * this.column, height * this.row,
            width, height,
            x, y,
            width, height)
    }
}