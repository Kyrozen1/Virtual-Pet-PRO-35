//Create variables here
var dog;
var database, foodS, foodStock;
var dogImg, happydogImg;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  happydogImg = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250, 350, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock)
}


function draw() {  
  background(46,139,87)

  textSize(20)
  fill("black")
  text("Food remaining:"+foodS, 170, 240)

  textSize(15)
  fill("black")
  text("Note: Press UP_ARROW Key To Feed Her Milk", 90, 50)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogImg)
    dog.scale = 0.2;
  }
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}