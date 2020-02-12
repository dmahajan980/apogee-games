const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var width = window.getComputedStyle(canvas).width;
canvas.width = Number.parseInt(width);
if(canvas.width < 800){
	canvas.height = window.innerHeight*0.8;
}

var scoreTag = document.getElementById("score");
var score = 0;
var map = {
	gap:200,
	width: 20,
	inGap: 150,
	numPillars:null,
	speed: 2,
	pillars:[],
	background: document.getElementById("background"),
	pillarImage: document.getElementById("brick")

};

var player = {
	x: 25, 
	y: canvas.height/2,
	img: document.getElementById("image"),
	acc: 1

};

function init(){
	
	map.numPillars = canvas.width/map.gap;

	for(var i=0; i< map.numPillars; i++){
		map.pillars.push({ 
							pos: canvas.width + i*map.gap,
						 	depth: Math.random()*(canvas.height-200)+100
						 });
	}


}

function drawPillar(x, depth, gap=100, color="#FF4500"){

	ctx.fillStyle = color;
	ctx.fillRect(x, 0, map.width, depth);
	ctx.fillRect(x, depth+gap, map.width, canvas.height - gap - depth);


}
function drawPlayer(){

	ctx.drawImage(player.img, player.x, player.y, 60, 60);
	player.y += player.acc;
	player.acc += 0.1;

	if(player.acc > 2.5)
		player.img = document.getElementById("image");

}

function playerCollision(){

	if(player.y > canvas.height || player.y + 70 < 0)
		return true;
	var gutter = 20;

	if( Math.abs( player.x + 30   - (map.pillars[0].pos + map.width/2) ) < 40 ) {
		if(player.y +gutter < map.pillars[0].depth || player.y +60 -gutter> map.pillars[0].depth + map.inGap)
			return true;
		return false;

	
	}
}

function playerJump(){

	player.acc = -3;
	player.img = document.getElementById("rotatedImage");

}

function draw(){
	//map

	ctx.drawImage(map.background, 0, 0, canvas.width, canvas.height);

	for(var i=0; i<map.pillars.length; i++){

		drawPillar(map.pillars[i].pos , map.pillars[i].depth, map.inGap, "#841F27");
		map.pillars[i].pos -= map.speed;
	}

	if(map.pillars[0].pos < 0 - map.width){
		map.pillars[0].pos = canvas.width;
		map.pillars[0].depth = Math.random()*(canvas.height-400)+200;
		map.pillars.push(map.pillars.shift());

	}

	//player
	drawPlayer();
}

function reset(){

	player.x = 25;
	player.y = canvas.height/2;
	player.acc = 1;
	score = 0;
	map.speed = 2;

	for(var i=0; i<map.numPillars; i++){
		map.pillars[i].pos = canvas.width + i*map.gap;
		map.pillars[i].depth = Math.random()*(canvas.height-400)+200;

	}

}

init();


window.onkeydown = function(event) {

	if(event.keyCode === 32){
		playerJump();
	}
}

window.addEventListener('click', playerJump, false);

var lastTime = 0, cutOffTime=0;
function gameLoop(time=0){
	var deltaTime = time - lastTime;
	lastTime = time;
	cutOffTime += deltaTime;
	if(cutOffTime>1000){
		score++;
		map.speed += 0.1;
		cutOffTime = 0;
	}

	draw();


	if(playerCollision()){
		reset();

	}

	scoreTag.innerHTML = "Score:" + score;
	requestAnimationFrame(gameLoop);
}

gameLoop();
