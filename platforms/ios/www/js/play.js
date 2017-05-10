
// document.addEventListener("deviceready", onDeviceReady, false);
var bg;
var start=false;
var stopped=false;
var enemiesA=[];
var enemies;
var lives =3;
var score=0;
var w;
var playerSpeed=5;
var robo;
var edge=false;
var shipAni;
var enemyAni;
var enemyAni2;
var paused;
var playerR=0;
var clicks=0;
var lines;
var loadingCount=0;
var col;
var beep;
var zap;
var paused;
var enemyLowSpeed=1;
var enemyHighSpeed=2;
var multiplyer=1;
var powerGot=false;
var powerStr="";
var right=true;
var play=false;

var playWidth;
var playHeight;

function preload()
{
  // var i=0;

  // robo=loadFont("assets/ROBO.ttf");
  col= new Audio('assets/sounds/Cologne_1983.mp3');
  beep= new Audio("assets/sounds/beep.wav");
  zap= new Audio("assets/sounds/zap.wav"); 

  
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function playerUpdates()
{
  edge=false;
  for(x=0;x<enemiesA.length;x++)
  {
    if(player1.overlap(enemiesA[x]))
    {
      collision(enemiesA[x]);
    }
  }
  if(player1.rotation>30)
  {
    player1.rotation=30;
  }
  if(player1.rotation<-30)
  {
    player1.rotation=-30;
  }

 if(player1.overlap(powerup))
    {
      collisionP(powerup);
    }

  if(player1.position.x>playWidth-25)
  {
    player1.position.x=playWidth-25;
    edge=true;
    player1.rotation=-30;
  }

  if(player1.position.x<25)
  {
  	player1.rotation=30;
  	edge=true;
    player1.position.x=25;
  }

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function enemyUpdates()
{
    for(x=0;x<enemiesA.length;x++)
    {
      if(stopped==true)
        {
          enemies[x].changeAnimation("pause");
        }

      if(enemiesA[x].position.y>playHeight+40)
      {
        if(stopped==false)
        {
          score+=100*multiplyer;
        }
        enemiesA[x].position.y=-20;
        enemiesA[x].position.x=random(0,playWidth+100);
        enemiesA[x].velocity.y=random(enemyLowSpeed,enemyHighSpeed);
        enemiesA[x].scale=random(enemyScaleMin,enemyScaleMax);
      }
    }  
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var player1;
var playerScale=0.6;
var enemyScaleMin=0.5;
var enemyScaleMax=1.5;
var fontSizeSmall=20;
var fontSizeLrg=50;
function setup() 
{	
  var interval = setInterval(function()
            {
                if(i<6)
                {
                  if(lives>0)
                  {
                  enemy = createSprite(random(0,playWidth), -40);
                  enemyAni=enemy.addAnimation("base","assets/sprites/enemy/enemy1.png","assets/sprites/enemy/enemy1.png","assets/sprites/enemy/enemy2.png","assets/sprites/enemy/enemy2.png","assets/sprites/enemy/enemy3.png","assets/sprites/enemy/enemy3.png","assets/sprites/enemy/enemy4.png","assets/sprites/enemy/enemy4.png");
                  enemyAni2=enemy.addAnimation("pause","assets/sprites/enemy/enemy1.png");
                  enemy.velocity.y=random(enemyLowSpeed,enemyHighSpeed);
                  enemies.add(enemy);
                  enemiesA.push(enemy);
                  enemy.scale=random(enemyScaleMin,enemyScaleMax);
                  i++;
                   }
                }
            },7000); 
  col.play();

  if(windowWidth>500)
  {
    playWidth=320;
    playHeight=568;
    createCanvas(320,568);
  }
  else if(windowWidth<500)
  {
      createCanvas(windowWidth, windowHeight);
      playWidth=windowWidth;
      playHeight=windowHeight;
  }


  var interval2=setInterval(function()
  {
    console.log("speed Increase"); 
    enemyLowSpeed+=0.5;
    enemyHighSpeed+=0.5;
  },8000);


	lines=createSprite(playWidth/2,playHeight/2);
  var linesImg=loadImage("assets/noiseBgTwo.png");
  lines.addImage(linesImg);
  lines.velocity.y=0.5;

  enemies = new Group();
  powerups = new Group();
  var i=1;
    
  var powerImg=loadImage("assets/power.png");
  powerup = createSprite(random(0,playWidth), -20);
  setTimeout(function(){ powerup.velocity.y=3; }, random(5000,10000));
  powerup.addImage(powerImg);

  paused = createSprite(50,50);
  var pauseImg=loadImage("assets/pause.png");
  paused.addImage(pauseImg);
  player1 = createSprite(playWidth/2, playHeight/1.2);
  shipAni=player1.addAnimation("shipAni","assets/sprites/ship/ship1.png","assets/sprites/ship/ship1.png", "assets/sprites/ship/ship2.png","assets/sprites/ship/ship2.png","assets/sprites/ship/ship3.png","assets/sprites/ship/ship3.png");
  player1.scale=playerScale;
}



function collision(enemy)
{
  zap.play();
  if(stopped==false)
  {
    lives-=1;
    enemy.position.y=-40;
    enemy.position.x=(random(-20,playWidth));
  }
  if(stopped==true)
  {
      player1.velocity.x=0;
      stopped=true;
      shipAni.stop();      
  }
}

function collisionP(obj)
{

  beep.play();
  obj.position.y=-40;
  obj.velocity.y=0;
  obj.position.x=random(0,playWidth);
  var sel=random(1,3);
  sel=Math.round(sel);
  if(sel==1)
  {
    lives+=1;
    powerStr="extra life";
  }
  else if(sel==2)
  {
    player1.scale=playerScale/2;
    setTimeout(function(){   player1.scale=playerScale;playerSpeed=5; }, 10000);
    powerStr="shrink";

  }
  else if(sel==3)
  {
    multiplyer=2;
    setTimeout(function(){   multiplyer=1; }, 10000);
    powerStr="x2";
  }
  powerGot=true;
  setTimeout(function(){ powerGot=false; }, 2000);
  setTimeout(function(){ powerup.velocity.y=3; }, random(10000,20000));

}

function pause()
{
  paused=true;
}

function keyPressed()
{
  if(keyCode==RIGHT_ARROW)
  {
    player1.velocity.x=playerSpeed;
    playerR=-1;

  }
  if(keyCode==LEFT_ARROW)
  {
    player1.velocity.x=playerSpeed*-1;
              playerR=1;

  }
  if(stopped==true)
  {
    if(keyCode==32)
    {
      location.reload();
    }
  }
}

function touchStarted() 
{
  // if(play==false)
  // {
  //     col.play();
  //     play=true;
  // }
  //////RESUME GAME
  if(paused==true)
  {
    if(mouseY>playHeight/2)
    {
      paused=false;
      for(var i=0;i<enemiesA.length;i++)
      {
        enemiesA[i].changeAnimation("base");
        enemiesA[i].velocity.y=random(enemyLowSpeed,enemyHighSpeed);
      }
      shipAni.play();
      powerup.velocity.y=3;
    }
  }
  ////// END GAME
	if(stopped==true)
	{
		clicks++;
		if(clicks>1)
		{
		  location.reload();
		}
	}
  //////
  if(stopped==false)
  {
    //PAUSE GAME 
  	if(mouseX>25&&mouseX<75)
  	{
  		if(mouseY>25&&mouseY<75)
  		{
			 pause(); 	
		  } 	
  	}
      //MOVEMENT 
      if(mouseX>playWidth/2)
	    {
	       // RIGHT
	       player1.velocity.x=playerSpeed;
	       if(edge==true)
	       {
	    	  playerR=-1;
	       }
	       else
	       {
	    	  playerR=-1;
		      }
	   }
	   else if(mouseX<playWidth/2)
	   {
      // LEFT
	    player1.velocity.x=playerSpeed*-1;
	    if(edge==true)
	    {
	    	playerR=1;
	    }
	    else
	    {
	    	playerR=1;
		  }
	  }

  }
}

function draw() 
{
  if(lines.position.y>playHeight)
  {
  	lines.position.y=playHeight/2;
  }

  player1.rotation+=playerR;

  if(stopped==true)
  {
  	playerR=0;
    player1.velocity.x=0;

    for(x=0;x<enemiesA.length;x++)
    {
      enemiesA[x].velocity.y=0;
    }
    powerup.velocity.y=0;
  }

  if(paused==true)
  {
    playerR=0;
    player1.velocity.x=0;
    powerup.velocity.y=0;
    for(x=0;x<enemiesA.length;x++)
    {
      enemiesA[x].velocity.y=0;
      enemies[x].changeAnimation("pause");
      shipAni.stop()
    }
  }

  background(20,20,20);
  drawSprites();
  playerUpdates();
  enemyUpdates();

  if(powerGot==true)
  {
    console.log(powerGot);

    // textFont(robo);
    textAlign(CENTER);
    textSize(fontSizeSmall);
    fill("#00ffff");
    text(powerStr, playWidth/2-1,playHeight/2);

    textAlign(CENTER);
    textSize(fontSizeSmall);
    fill("#ffff00");
    text(powerStr, playWidth/2+1, playHeight/2);

    textAlign(CENTER);
    textSize(fontSizeSmall);
    fill("#bf40ff");
    text(powerStr, playWidth/2, playHeight/2+1);

    textAlign(CENTER);
    textSize(fontSizeSmall);
    fill(255);
    text(powerStr, playWidth/2, playHeight/2);
  }

  //score text
  // textFont(robo);
  textAlign(CENTER);
  textSize(fontSizeSmall);
  fill("#00ffff");
  text(score, playWidth/2-1, 40);
  fill("#ffff00");
  text(score, playWidth/2+1, 41);
  fill(255);
  text(score, playWidth/2, 40);

  //lives text
  textSize(fontSizeLrg);
  fill("#00ffff");
  text(lives,playWidth-53,70);
  fill("#bf40ff");
  text(lives,playWidth-49,70);
  fill(255);
  text(lives,playWidth-50,70);

  //POWERUP
  if(powerup.position.y>playHeight)
  {
    powerup.position.y=-40;
    powerup.velocity.y=0;
    powerup.position.x=random(0,playWidth);
    setTimeout(function(){ powerup.velocity.y=3; }, random(10000,20000));
  }

  if(lives<1)
  {
    stopped=true;
    shipAni.stop();
  }

}



