var score = 0;
var fighter_plane;
var missile;
var asteroid_image_1,asteroid_image_2,asteroid_image_3,asteroid_image_4;
var space_background;
var fighterPlaneImg,missileImg,asteroidImg_1,asteroidImg_2,asteroidImg_3,asteroidImg_4,spaceImg;
var asteroidGroup;

var life = 1;
var score = 0
var gameState = 1;

function preload(){
fighterPlaneImg = loadImage("./assets/fighterPlane.png");
missileImg = loadImage("./assets/missile.png");
asteroidImg_1 = loadImage("./assets/asteroid_1.png");
asteroidImg_2 = loadImage("./assets/asteroid_2.png");
asteroidImg_3 = loadImage("./assets/asteroid_3.png");
asteroidImg_4 = loadImage("./assets/asteroid_4.png");
spaceImg = loadImage("./assets/space.jpg");

}



function setup(){
    createCanvas(windowWidth,windowHeight);

    space_background = createSprite(800,300,1200,1200);
    space_background.addImage(spaceImg);
    space_background.scale = 0.9;

    fighter_plane = createSprite(780,630,200,200);
    fighter_plane.addImage(fighterPlaneImg);
    fighter_plane.scale = 0.35;

    heading= createElement("h1");
    scoreboard= createElement("h1");

    asteroidGroup = createGroup();
    
    




}

function draw(){

    background(0);

    heading.html("Life: "+life)
    heading.style('color:red'); 
    heading.position(150,20)
  
    scoreboard.html("Score: "+score)
    scoreboard.style('color:red'); 
    scoreboard.position(width-200,20)
  

     var select_sprites = Math.round(random(1,4));

   if(gameState === 1){
    fighter_plane.x = World.mouseX;

    if(keyDown("space")){
       shootMissile();
    }

    if(frameCount % 60 === 0){
        asteroid_1();
    }

    if(frameCount % 160 === 0){
        asteroid_2();
    }

    if(frameCount % 260 === 0){
        asteroid_3();
    }

    if(frameCount % 360 === 0){
        asteroid_4();
    }

    if (asteroidGroup.collide(missile)){
         handleAsteroidCollision(asteroidGroup);
       }
      
       if (fighter_plane.isTouching(fighter_plane)) {
         handleAsteroidCollision(fighter_plane);
       }

       if (fighter_plane.isTouching(fighter_plane)){
         handleAsteroidCollision(fighter_plane);
      }
      
       if (asteroidGroup.collide(fighter_plane)) {
         handleGameOver(fighter_plane);
    }

    drawSprites();
    
}

function asteroid_1(){
asteroid_image_1 = createSprite(random(300,1350),10,10,20);
asteroid_image_1.addImage(asteroidImg_1);
asteroid_image_1.scale = 0.1;
asteroid_image_1.velocityY = 2.5;
asteroid_image_1.lifetime = 400;
asteroidGroup.add(asteroid_image_1);


}

function asteroid_2(){
 asteroid_image_2 = createSprite(random(300,1350),10,10,20);
 asteroid_image_2.addImage(asteroidImg_2);
 asteroid_image_2.scale = 0.1;
 asteroid_image_2.velocityY = 2;
 asteroid_image_2.lifetime = 400;
 asteroidGroup.add(asteroid_image_2);

}

function asteroid_3(){
    asteroid_image_3 = createSprite(random(300,1350),10,10,20);
    asteroid_image_3.addImage(asteroidImg_3);
    asteroid_image_3.scale = 0.1;
    asteroid_image_3.velocityY = 3;
    asteroid_image_3.lifetime = 400;
    asteroidGroup.add(asteroid_image_3);
   
   }

   function asteroid_4(){
    asteroid_image_4 = createSprite(random(300,1350),10,10,20);
    asteroid_image_4.addImage(asteroidImg_4);
    asteroid_image_4.scale = 0.1;
    asteroid_image_4.velocityY = 1.5;
    asteroid_image_4.lifetime = 400;
    asteroidGroup.add(asteroid_image_4);
   
   }

   function shootMissile(){
    missile = createSprite(150, width/2, 50,20);
    missile.x = fighter_plane.x;
    missile.addImage(missileImg);
    missile.scale = 0.03
    missile.velocityY = -10;
  
   }

   function handleAsteroidCollision(asteroidGroup){
    if (life > 0) {
       score=score+1;
       asteroidGroup.destroyEach();
    }
  }

  function handleGameOver(fighter_plane){

    if (life === 0) {
        gameState=2
        life=0;
        fighter_plane.destroyEach();
      
        
        swal({
          title: `Game Over`,
          text: "Oops you lost the game....!!!",
          text: "Your Score is " + score,
          imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
          imageSize: "100x100",
          confirmButtonText: "Thanks For Playing"
        });
      }
  }
  
}
