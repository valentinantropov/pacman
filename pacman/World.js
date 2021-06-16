var canvas;
var ctx;
var Pacman;
var Blinky;
var Pinky;
var Inky;
var Clyde;

var score  = 0;

const MAX      = 196;//196
const FPS      = 60;
const cellSize = 35;

const WALL   = new Image();
//Left looking pacman
const LPACMAN = new Image();
//Up looking pacman
const UPACMAN = new Image();
//Right looking pacman
const RPACMAN = new Image();
//Down looking pacman
const DPACMAN = new Image();
const BLINKY  = new Image();
const PINKY   = new Image();
const INKY    = new Image();
const CLYDE   = new Image();
const POINT   = new Image();
const MENU    = new Image();
const MRPR    = new Image();

MENU.src    = "assets/menu.png";
WALL.src    = "assets/wall.png";
POINT.src   = "assets/point.png";
LPACMAN.src = "assets/lpacman.png";
UPACMAN.src = "assets/upacman.png";
RPACMAN.src = "assets/rpacman.png";
DPACMAN.src = "assets/dpacman.png";
BLINKY.src  = "assets/blinky.png";
PINKY.src   = "assets/pinky.png";
INKY.src    = "assets/inky.png";
CLYDE.src   = "assets/clyde.png";

canvas = document.getElementById("Canvas");
ctx    = canvas.getContext("2d");

var map = [ 
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 0, 1, 1, 2, 1, 2, 2, 2, 1, 1, 1],
    [1, 1, 1, 1, 2, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 2, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 2, 1, 1, 1, 1],
    [1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1],
    [1, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
    
function init(){
    ctx.drawImage(MENU, 15 * cellSize, 10 * cellSize, 800, 600);

    Pacman  = new Pacman; 
    Blinky  = new Enemy; Blinky.x  = 1;  Blinky.y = 1;  Blinky.imageSource = BLINKY;
    Pinky   = new Enemy; Pinky.x   = 1;  Pinky.y  = 19; Pinky.imageSource  = PINKY;
    Inky    = new Enemy; Inky.x    = 17; Inky.y   = 19; Inky.imageSource   = INKY;
    Clyde   = new Enemy; Clyde.x   = 17; Clyde.y  = 1;  Clyde.imageSource  = CLYDE;

    for(var i = 0; i < map.length; i++ ){
        for(var j = 0; j < map[i].length; j++){
            if (map[i][j] == 1)  {
                ctx.drawImage(WALL, i * cellSize, j * cellSize, cellSize, cellSize);            
            }
            else if (map[i][j] == 2){
                // POINT
                ctx.drawImage(POINT, i * cellSize, j * cellSize, cellSize, cellSize);            
            }               
        }
    }
    Pacman.draw();
    Blinky.draw();
    Pinky.draw();
    Inky.draw();
    Clyde.draw();
}

function updateScreen(x, y){
    ctx.clearRect(x * cellSize, y * cellSize, cellSize, cellSize);
}

function Pacman(){
    this.x = 10;
    this.y = 10;
    this.currentStance = LPACMAN;
}

Pacman.prototype = {

    draw: function() {
        map[this.x][this.y] = 4;
        ctx.drawImage(this.currentStance, this.x * cellSize, this.y * cellSize, cellSize, cellSize);
    },

    move: function(x, y){
        if(map[x][y] == 2){
            score++;
        }
        updateScreen(this.x, this.y);
        map[this.x][this.y] = 0;
        this.x = x;
        this.y = y;
        this.draw();
    },

    isWall: function(x, y){
        if(map[x][y] == 1){
            return true;
        }
        else{
            return false;
        }
    },

    end: function(event){
        if (score == MAX){
            console.log("max");
            
            document.onkeydown = function (event){
            }
        
            /*document.removeEventListener('keydown', event);
            document.removeEventListener('click', event);*/
        }
        if ((this.x == Blinky.x && this.y == Blinky.y) || (this.x == Pinky.x && this.y == Pinky.y) ||  (this.x == Inky.x && this.y == Inky.y) ||  (this.x == Clyde.x && this.y == Clyde.y))
        {
            console.log("crash");
            document.onkeydown = function (event){
            }
        }

    }

};

function Enemy(){
    this.x = 8;
    this.y = 10;
    this.imageSource = new Image();
}

Enemy.prototype = { 

    draw: function(){
        //map[this.x][this.y] = 3;
        ctx.drawImage(this.imageSource, this.x * cellSize, this.y * cellSize, cellSize, cellSize);
    },

    isWall: function(x, y){
        if(map[x][y] == 1){
            return true;
        }
        else{
            return false;
        }
    },

    move: function(x, y){
        var previous = map[this.x][this.y];

        if(previous == 2){
            updateScreen(this.x, this.y);
            ctx.drawImage(POINT, this.x * cellSize, this.y * cellSize, cellSize, cellSize);            
        }
        if(previous == 0){
            updateScreen(this.x, this.y);
        }


        this.x = x;
        this.y = y;
        this.draw();
    },

    randGo: function(){
        var direction = Math.floor(Math.random() * (5 - 1)) + 1;
        switch(direction){
            case 1://up
                if(!this.isWall(this.x, this.y - 1))
                    this.move(this.x, this.y - 1);
                    //console.log("up");
                    break;
            case 2://left
                if(!this.isWall(this.x - 1, this.y))
                    this.move(this.x - 1, this.y);
                    //console.log("left");    
                    break;
            case 3://down
                if(!this.isWall(this.x, this.y + 1))
                    this.move(this.x, this.y + 1);
                    //console.log("down");
                    break;
            case 4://right
                if(!this.isWall(this.x + 1, this.y))
                    this.move(this.x + 1, this.y);
                    //console.log("right");
                    break;
        }
    }

};

window.onload = function(){
    init();
};

document.onkeydown = function(event){
    const W = 87; 
	const A = 65;
	const S = 83;
	const D = 68;
	const ARROW_KEY_LEFT = 37;
	const ARROW_KEY_UP = 38;
	const ARROW_KEY_RIGHT = 39;
	const ARROW_KEY_DOWN = 40;   
    var key = event.keyCode;
    console.log(key);

    switch(key){
    	case ARROW_KEY_UP:
        case W:
            if(!Pacman.isWall(Pacman.x, Pacman.y - 1)){
               Pacman.currentStance = UPACMAN;             
               Pacman.move(Pacman.x, Pacman.y - 1);
            }
            break;
        case ARROW_KEY_LEFT:
        case A:
            if(!Pacman.isWall(Pacman.x - 1, Pacman.y)){
               Pacman.currentStance = LPACMAN;
               Pacman.move(Pacman.x - 1, Pacman.y);
            }
            break;
        case ARROW_KEY_DOWN:
        case S:            
            if(!Pacman.isWall(Pacman.x, Pacman.y + 1)){
               Pacman.currentStance = DPACMAN;
               Pacman.move(Pacman.x, Pacman.y + 1);
            }
            break;
        case ARROW_KEY_RIGHT:
        case D:
            if(!Pacman.isWall(Pacman.x + 1, Pacman.y)){
               Pacman.currentStance = RPACMAN;
               Pacman.move(Pacman.x + 1, Pacman.y);
            }
            break;
    }

    Pacman.end(document.onkeydown);
    Blinky.randGo();
    Pinky.randGo();
    Inky.randGo();
    Clyde.randGo();
    Pacman.end(document.onkeydown);

    console.log(score);
}
