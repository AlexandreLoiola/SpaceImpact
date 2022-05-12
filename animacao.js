function Animation(ctx) {
    this.ctx = ctx;
    this.sprites = [];
    this.on = false;

    this.processes = [];
    this.deleteSprites = [];
    this.deleteProcesses = [];          
}
Animation.prototype = {
    newSprite: function(sprite) {
        this.sprites.push(sprite); 
        sprite.animation = this;
    },
    deleteSprite: function(sprite) {
        this.deleteSprites.push(sprite);
    },
    newProcess: function(process) {
        this.processes.push(process)
        process.animation = this;
    },
    deleteProcess: function(process) {
        this.deleteProcesses.push(process);
    },
    processDeletions: function() {
        let newArraySprites = [];
        let newArrayProcesses = [];

        for (let i in this.sprites) {
            if (this.deleteSprites.indexOf(this.sprites[i]) == -1)
                newArraySprites.push(this.sprites[i]);
            };

        for (let i in this.processes){
            if (this.deleteProcesses.indexOf(this.processes[i]) == -1)
                newArrayProcesses.push(this.processes[i])
        }

        this.deleteSprites = [];
        this.deleteProcesses = []; 
        this.sprites = newArraySprites;
        this.processes = newArrayProcesses;
    },
    clearScreen: function() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    },
    turnOn: function() {
        this.on = true;
        this.nextFrame();
    },
    turnOff: function(){
        this.on = false;
    },
    nextFrame: function() {
        if (!this.on) return;
        this.clearScreen();
        
        for (let i in this.sprites)
            this.sprites[i].draw();
        for (let i in this.sprites)
            this.sprites[i].update();
        for (let i in this.processes)
            this.processes[i].processor();
        
        this.processDeletions();

        let animation = this;
        requestAnimationFrame(function(){animation.nextFrame();});
    }
}

//=============================================================================
let loading = 0;
function loaded() {
    loading++;
    if (loading == 4) {init();}
}
function init() {
    ctx.fillText("Pressione 'enter' para retomar", 140, 300);
    animation.turnOn();
} 

//Função para pausar o game====================================================function pause() {
function pause() {
    if (animation.on) {
        animation.turnOff()
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'black';
        ctx.font = '130px sans-serif';
        ctx.fillText("Pausado", 160, 200);
        ctx.strokeText("Pausado", 160, 200);
        ctx.font = '40px sans-serif';
        ctx.fillText("Pressione 'enter' para retomar", 140, 300);
        ctx.strokeText("Pressione 'enter' para retomar", 140, 300);
        ctx.restore();
    }
    else {
        animation.turnOn();
    }
}