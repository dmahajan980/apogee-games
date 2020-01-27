var ball;
var vh = window.innerHeight;
var vw = window.innerWidth;
var vel = 8;
var velx = vel, vely = vel;
var pitchwidth = 0.8*vw;
var pitchheight = 0.5*vh;
var x1 = (1/2)*pitchwidth*Math.random();


function startGame(){
    ball = new component( 30, 30, "../assets/images/ball.svg", pitchwidth, 0.4*pitchheight);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = pitchwidth;
        this.canvas.height = pitchheight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }   
}

function component(width, height, sr, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = sr;
    this.update = function(){
        ctx=myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

function updateGameArea(){
    myGameArea.clear();
    var theta = Math.atan(0.6*pitchheight/(pitchwidth-x1));
    if(myGameArea.canvas.height < ball.y + ball.height)
    {   ball.y = myGameArea.canvas.height - ball.height;
        vely = -vely;  } 
    ball.x = ball.x - velx*Math.cos(theta);
    ball.y = ball.y + vely*Math.sin(theta);
    ball.update();
}

