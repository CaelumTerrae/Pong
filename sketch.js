//Pong
var isPaused = false;
var bounceCount = 0;
var paddleLeft = {
	length: 0,
	x:80,
	y:0,
	thickness:30,
	direction:0,
	score:0
};

var paddleRight = {
	length: 0,
	x:80,
	y:0,
	thickness:30,
	direction:0,
	score:0
};

var ball = {
	x:0,
	y:0,
	speed: 10,
	xSpeed: -6,
	ySpeed: 8,
	radius:10
};



function setup() {
	angleMode(DEGREES);
	createCanvas(windowWidth,windowHeight);
	paddleLeft.length = windowHeight/5.0;
	paddleRight.length = paddleLeft.length;
	paddleLeft.y = windowHeight/2.0 - length/2.0;
	paddleRight.y = paddleLeft.y;
	paddleRight.x = windowWidth - 80 - paddleRight.thickness;
	ball.x = windowWidth/2.0;
	ball.y = windowHeight/2.0;
	randomSeed(70);
	var degree = random(30,61);
	ball.xSpeed = cos(degree) * ball.speed;
	ball.ySpeed = sin(degree) * ball.speed;
}

function draw() {
	background(0);
	stroke(255);
	strokeWeight(4);


	if(!isPaused){
	if((paddleLeft.direction < 0 && paddleLeft.y >=0) || (paddleLeft.direction > 0 && paddleLeft.y + paddleLeft.length < windowHeight)){
		paddleLeft.y+= paddleLeft.direction;
	}
	
	if((paddleRight.direction < 0 && paddleRight.y >=0) || (paddleRight.direction > 0 && paddleRight.y + paddleRight.length < windowHeight)){
		paddleRight.y+= paddleRight.direction;
	}
	ball.x+=ball.xSpeed;
	ball.y+=ball.ySpeed;

	if(ball.y > windowHeight){
		ball.y = windowHeight;
		ball.ySpeed *= -1;
	}

	if(ball.y < 0){
		ball.y =0;
		ball.ySpeed *= -1;
	}

	if((ball.x + ball.radius > paddleLeft.x && ball.x - ball.radius < paddleLeft.x + paddleLeft.thickness) && ball.y > paddleLeft.y  && ball.y < paddleLeft.y+ paddleLeft.length){
		var degree = -1 * ((paddleLeft.y + paddleLeft.length/2) - ball.y) / (paddleLeft.length/2) * 60;//Calculates distance from the middle of the paddle and maps it on value 0-60.
		if(degree > -10 && degree < 10){
			ball.speed *= 2.4;
		}
		ball.xSpeed = ball.speed * cos(degree);
		ball.ySpeed = ball.speed * sin(degree);
		bounceCount++;
	}


	if(ball.x + ball.radius > paddleRight.x && ball.x - ball.radius < paddleRight.x + paddleRight.thickness && ball.y > paddleRight.y  && ball.y < paddleRight.y+ paddleRight.length){
		var degree = -1 * ((paddleRight.y + paddleRight.length/2) - ball.y) / (paddleRight.length/2) * 60;//Calculates distance from the middle of the paddle and maps it on value 0-60.
		if(degree > -10 && degree < 10){
			ball.speed *= 2.4;
		}
		ball.xSpeed = -1 * ball.speed * cos(degree);
		ball.ySpeed = ball.speed * sin(degree);


		bounceCount++;
	}

	if(bounceCount === 5){
		ball.speed *= 1.2;
		bounceCount = 0;
	}

	if(ball.x - ball.radius/2 > windowWidth){
		paddleLeft.score +=1;
		ball.x = windowWidth/2;
		ball.y = windowHeight/2
		ball.speed = 10;
		var degree = random(-60,61);
		var leftRight = random(0,2);
		ball.xSpeed = cos(degree) * ball.speed * -1;
		ball.ySpeed = sin(degree) * ball.speed;
		
	}

	if(ball.x + ball.radius/2 < 0){
		paddleRight.score +=1;
		ball.x = windowWidth/2;
		ball.y = windowHeight/2;
		ball.speed = 10;
		var degree = random(-60,61);
		ball.xSpeed = cos(degree) * ball.speed;
		ball.ySpeed = sin(degree) * ball.speed;
	}
}

	rect(paddleLeft.x, paddleLeft.y, paddleLeft.thickness, paddleLeft.length);
	rect(paddleRight.x, paddleRight.y, paddleRight.thickness, paddleRight.length);
	ellipse(ball.x,ball.y,ball.radius,ball.radius);
	fill('rgba(100%,0%,100%,0.5)');
	rect(paddleRight.x,paddleRight.y + paddleRight.length/2 - paddleRight.length/12, paddleRight.thickness, paddleRight.length/6);
	rect(paddleLeft.x,paddleLeft.y + paddleLeft.length/2 - paddleLeft.length/12, paddleLeft.thickness, paddleLeft.length/6);
	textSize(32);
	textAlign(LEFT);
	text("Player 1: " + paddleLeft.score , 0,50);
	textAlign(RIGHT)
	text("Player 2: " + paddleRight.score, windowWidth,50)

	


}

function keyPressed() {
  if (keyIsDown(87)) {
    paddleLeft.direction = -9;
  } 
  else if (keyIsDown(83)) {
    paddleLeft.direction = 9;
  }
  if(keyIsDown(73)){
  	paddleRight.direction = -9;
  }
  else if(keyIsDown(75)){
  	paddleRight.direction = 9;
  }

  if(keyCode == 32){
  	if(isPaused){
  		isPaused = false;
  	}else{
  		isPaused = true;
  	}
  }
  return false; // prevent default
}

function keyReleased(){
	if(!keyIsDown(87) && !keyIsDown(83)){
		paddleLeft.direction = 0;
	}

	if(!keyIsDown(73) && !keyIsDown(75)){
		paddleRight.direction = 0;
	}
	
}
