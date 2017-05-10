var space;
var ryder;
var bg;
var cover;
var grid;
var noise;
var star;
var count=0;
var bool=false;
var music;

var playWidth;
var playHeight;

function preload()
{
    // music=loadSound("assets/sounds/First_In_Line.mp3");
    music=new Audio('assets/sounds/First_In_Line.mp3');
}

document.addEventListener("DOMContentLoaded", function(event)
 {    
}); 

function setup() 
{
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

    music.play();
    noise=createSprite(playWidth/2,playHeight/2);
    var noiseImg=loadImage("assets/noiseBgTwo.png");
    noise.addImage(noiseImg);
    noise.velocity.y=0.5;

    space = createSprite(playWidth/2,playHeight/2-18);
    var spaceImg=loadImage("assets/sprites/title/spaceTitle.png");
    space.addImage(spaceImg);

    ryder = createSprite(playWidth/2,playHeight/2+18);
    var ryderImg=loadImage("assets/sprites/title/ryderTitle.png");
    ryder.addImage(ryderImg);
    space.scale=0;
    ryder.scale=0;

    star = createSprite(playWidth/2+50,playHeight/2);
    var starImg=loadImage("assets/starShine.png");
    star.addImage(starImg);
    star.scale=0;

}

function draw()
{

if(noise.position.y>playHeight)
{
    noise.position.y=playHeight/2;
}

 background(20,20,20);
 drawSprites();

 if(space.scale<1)
 {
    space.scale+=0.04;
    ryder.scale+=0.04;
 }  

if(space.scale>0.99)
 {
    star.scale+=0.6;
    star.rotation+=4;
    count++;
 }

 if(star.scale>1.1)
 {
    star.scale=1;
 }

 if(count>12)
 {
    star.scale-=0.7;
 }


if(star.scale<0)
{
    star.scale=0;
}

}

function touchStarted() 
{
    // alert("hello");
    window.location.href = "play.html";
}