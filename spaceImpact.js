
/*=============================================================================
    Projeto criado em parcia dos estudantes: Alexandre Loiola e Edgar Sá, ambos 
do Instituto Federal de Sergipe.

                    Estudo de caso: Jogo Space Impact
===============================================================================*/

//Recebndo imagens---------------------------------------------------
const backgroundImage = new Image();
backgroundImage.src = "./background.jpeg";

const shipImage = new Image();
shipImage.src = "./nave_sprite_sheet.png";

const zoiudaoImage = new Image();
zoiudaoImage.src = "./zoiudo_sprirte_sheet.png"
//-------------------------------------------------------------------

var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39, shot = 32;
let ship = {
    x: 10,
    y: 10,
    imageWidth: 96,
    imageHeight: 96,
    imgStateX: [0, 96],
    imgStateY: [96],
    iX: 0,
    iY:0,
    speed: 20,

    move: function (e){
        let key = e.keyCode;
        if(key === LEFT){
            ship.x-=ship.speed;
        }
        else if(key === UP){
            ship.y-=ship.speed;
        }
        else if(key === DOWN){
            ship.y+=ship.speed;
        }
        else if(key === RIGHT){
            ship.x+=ship.speed;
        } else if (key == shot){
            shot.x += ship.speed;
        }},

    draw: function () {
        ctx.drawImage(shipImage,
            this.imgStateX[Math.trunc(this.iX)],this.imgStateY[this.iY],
            this.imageWidth, this.imageHeight,
            this.x, this.y,
            this.imageWidth, this.imageHeight);
    },

    update: function () {
        this.iX > 1 ? this.iX = 0 : this.iX += 0.05
    }
}
//Inimigo----------------------------------------------------------------------
let zoiudao = {
    x: 700,
    y: 40,
    imageWidth: 144,
    imageHeight: 108,
    imgStateX: [0, 144, 288],
    imgStateY: [0, 108, 216],
    iX: 0,
    iY:0,
    speed: 4,

    move: function() {
        this.y += this.speed;
        if (this.y > cnv.height - 110 || this.y < 0) {
            this.speed *= -1;
        }},

    draw: function () {
        ctx.drawImage(
            zoiudaoImage,
            this.imgStateX[Math.trunc(this.iX)], this.imgStateY[this.iY],
            this.imageWidth, this.imageHeight, 
            this.x, this.y, 
            this.imageWidth, this.imageHeight);
    }, 

    update: function () {
        if (this.iX >= 2) {
            this.iX = 0 
            this.iY > 3 ? this.iY = 0 : this.iY++
        } else {                        
           this.iX += 0.05
        }
    }};
//Cenário-------------------------------------------------------------------------
let background = {
    x: 0,
    y: 0,
    imageWidth: 900,
    imageHeight: 420,
    speed: 10,

    move: function () {
        this.x -= this.speed;
        if (this.x < -880) {
            this.x = 0;
        }
    },
    draw: function () {
        ctx.drawImage(
            backgroundImage,
            background.x, 0,
            this.imageWidth, this.imageHeight
        );
        ctx.drawImage(
            backgroundImage,
            background.x + 894, 0,
            this.imageWidth, this.imageHeight
        );
    },

    update: function() {
        console.log(frame)
    }};


//FASES DO JOGO================================================================
function main () {
    cnv = document.createElement("canvas");
    cnv.width = 850;
    cnv.height = 420;
    cnv.style.border = "1px solid #000";
    document.body.appendChild(cnv);
    ctx = cnv.getContext("2d");
    //Canvas---------------------------------------------------------

    document.addEventListener("keydown", ship.move);
    
    mainUpdate();
}

//Camada de apresentação=======================================================
function render() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    background.draw();
    ship.draw();
    zoiudao.draw();
}

//Função de loop===============================================================
function mainUpdate() {
    zoiudao.move();
    background.move();

    ship.update()
    zoiudao.update()
    render();
    
    window.requestAnimationFrame(mainUpdate);
}
main();