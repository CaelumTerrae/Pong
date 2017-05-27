//Pong
var isPaused = false;
var paddleSpeed = 9;
var bounceCount = 0;   
		var boostMeter1 = 0;	// My intelligence level
		var boostMeter2 = 0;	// isn't high enough
		var boostCount1 = 0;	// to find a simplar solution.
		var boostCount2 = 0;	// Gotta wait for my next level up and use my points much more wisely.
var paddleLeft = {
	length: 0,
	x:80,
	y:0,
	thickness:30,
	direction:0,
	score:0,
	level:0,
	boostOn:false
};

var paddleRight = {
	length: 0,
	x:80,
	y:0,
	thickness:30,
	direction:0,
	score:0,
	level:0,
	boostOn:false
};

var ball = {
	x:0,
	y:0,
	speed: 10,
	xSpeed: -6,
	ySpeed: 8,
	radius:11
};




function setup() {
	angleMode(DEGREES);
	createCanvas(windowWidth,windowHeight);
	paddleLeft.length = windowHeight/5.0;
	paddleRight.length = paddleLeft.length;
	paddleLeft.y = windowHeight/2.0 - 70;
	paddleRight.y = paddleLeft.y;
	paddleRight.x = windowWidth - 80 - paddleRight.thickness;
	ball.x = windowWidth/2.0;
	ball.y = windowHeight/2.0;
	randomSeed(70);
	var degree = random(30,61);
	ball.xSpeed = cos(degree) * ball.speed;
	ball.ySpeed = sin(degree) * ball.speed;
	isPaused = true;
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
		if(paddleLeft.boostOn == true){			//The sweet spot is now achieved by getting your Boost Percent higher
			if(degree > -10 && degree < 10){	//The player will only have 1 try to get that shot. Totally not being lazy or anything.
				ball.speed *= 1.5;
			}
			paddleLeft.boostOn = false;
		}
		ball.xSpeed = ball.speed * cos(degree);
		ball.ySpeed = ball.speed * sin(degree);
		boostCount1++;
		bounceCount++;
	}


	if(ball.x + ball.radius > paddleRight.x && ball.x - ball.radius < paddleRight.x + paddleRight.thickness && ball.y > paddleRight.y  && ball.y < paddleRight.y+ paddleRight.length){
		var degree = -1 * ((paddleRight.y + paddleRight.length/2) - ball.y) / (paddleRight.length/2) * 60;//Calculates distance from the middle of the paddle and maps it on value 0-60.
		if(paddleRight.boostOn == true){		//The sweet spot is now achieved by getting your Boost Percent higher
			if(degree > -10 && degree < 10){
				ball.speed *= 1.5;
			}
			paddleRight.boostOn = false;
		}
		ball.xSpeed = -1 * ball.speed * cos(degree);
		ball.ySpeed = ball.speed * sin(degree);

		boostCount2++;
		bounceCount++;
	}

	if(bounceCount === 5){
		ball.speed *= 1.19;				//Played around with the value, I think this is suitable
		paddleSpeed *= 1.05;			//Having the paddle move a lil faster gets fun!
		bounceCount = 0;
	}
	
	if(boostCount1 === 5){
		
		boostCount1 = 0;
		if(paddleLeft.level < 100){		//Makes sure it doesn't exceeds over 100.
			paddleLeft.level += 5;		//Every 5 hits will give 5 percent for the boost
		}
	}
	if(boostCount2 === 5){				//Take a wild guess
		boostCount2 = 0;
		if(paddleRight.level < 100){
			paddleRight.level += 5;
		}
	}
	
	

	if(ball.x - ball.radius/2 > windowWidth){
		paddleLeft.score +=1;					
		paddleLeft.level += 12;						//The meter will jump up 12 points
		ball.x = windowWidth/2;
		ball.y = windowHeight/2
		ball.speed = 10;
		paddleSpeed = 9;						//Reset the Paddle Speed
		paddleLeft.y = (windowHeight/2) - 70;	//Changed the starting position so the Paddle lines up with the ball
		paddleRight.y = paddleLeft.y;
		var degree = random(-60,61);
		var leftRight = random(0,2);
		ball.xSpeed = cos(degree) * ball.speed * -1;
		ball.ySpeed = sin(degree) * ball.speed;
		
		if(paddleLeft.level > 100){					//Meter will remain 100
		paddleLeft.level = 100;
		}
		
		isPaused = true;						//Paused the game for every score
	}

	if(ball.x + ball.radius/2 < 0){
		paddleRight.score +=1;							
		paddleRight.level += 12;				//The meter will jump up 12 points
		ball.x = windowWidth/2;
		ball.y = windowHeight/2;
		ball.speed = 10;
		paddleSpeed = 9;						//Reset the Paddle Speed
		paddleLeft.y = (windowHeight/2) - 70;	//Changed the starting position so the Paddle lines up with the ball
		paddleRight.y = paddleLeft.y;
		var degree = random(-60,61);
		ball.xSpeed = cos(degree) * ball.speed;
		ball.ySpeed = sin(degree) * ball.speed;
		
		if(paddleRight.level > 100){					//Meter will remain at 100
		
		paddleRight.level = 100;
		}
		
		isPaused = true;						//Paused the game for every score
	}
}

	rect(paddleLeft.x, paddleLeft.y, paddleLeft.thickness, paddleLeft.length);
	fill('rgba(100%,0%,0%,0.5)');			
	rect(paddleRight.x, paddleRight.y, paddleRight.thickness, paddleRight.length);//Changed this to red Paddle
	ellipse(ball.x,ball.y,ball.radius,ball.radius);
	fill('rgba(100%,100%,0%,0.5)');		//Yellow in the middle for Red
	rect(paddleRight.x,paddleRight.y + paddleRight.length/2 - paddleRight.length/12, paddleRight.thickness, paddleRight.length/6);
	fill('rgba(0%,100%,0%,0.5)');		//Green in the middle for the Blue
	rect(paddleLeft.x,paddleLeft.y + paddleLeft.length/2 - paddleLeft.length/12, paddleLeft.thickness, paddleLeft.length/6);
	fill('rgba(0%,0%,100%,0.5)');		//This is the blue baddle!
	textSize(32);
	textAlign(LEFT);
	text("Player 1: " + paddleLeft.score , 0,50);
	text("Boost%: " + paddleLeft.level, 0,110);
	rect(10, 120, paddleLeft.level, 2);	//Boost Meter (LEFT)
	textAlign(RIGHT)
	text("Player 2: " + paddleRight.score, windowWidth,50)
	text("Boost%: " + paddleRight.level, windowWidth,110);
	rect(windowWidth - 220, 120, paddleRight.level, 2);	//Boost Meter (RIGHT)
	
	
	


}

function keyPressed() {										//Noticed when holding W, S won't work until you let go of W.
  if (keyIsDown(87)) {										//But You can hold S and go up right away by pressing W
    paddleLeft.direction = -paddleSpeed;					//But when you let go of W while still holding S, you still go up
  } 														//I think we might need to use a different way for checkin the controls xd
  else if (keyIsDown(83)) {
    paddleLeft.direction = paddleSpeed;
  }
  if(keyIsDown(73)){
  	paddleRight.direction = -paddleSpeed;
  }
  else if(keyIsDown(75)){
  	paddleRight.direction = paddleSpeed;
  }
    if(keyCode == 88){				//In the future, this can activate tht sweet spot.
	  if(paddleLeft.level >= 100){	//Just incase paddleLeft.level somehow goes above 100.
			paddleLeft.level = 0;	
			paddleLeft.boostOn = true;
	  }
	}
	
	if(keyCode == 188){
		if(paddleRight.level >= 100){
			paddleRight.level = 0;
			paddleRight.boostOn = true;
		}
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
