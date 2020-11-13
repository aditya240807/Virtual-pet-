//Create variables here
var dog, happyDog, database, foodS, foodStock
var dogIMG, happyDogImg
var milk
var gameState,bedroom,garden,washroom
function preload() {
  dogIMG = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
  milkIMG = loadImage("images/Milk.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(370, 200, 30, 30)
  dog.addImage(dogIMG)
  dog.scale = 0.2
  
  bedroom = loadImage("Bed Room.png")
  garden = loadImage("Garden.png")
  washroom = loadImage("Wash Room.png")

  gameState = database.ref('gameState')
  

  milk = createSprite(200, 170, 30, 30)
  milk.addImage(milkIMG)
  milk.scale = 0.1

  addFood = createSprite(270, 50, 180, 40)
  addFood.visible = false

  feed = createSprite(450, 50, 90, 40)
  feed.visible = false

  database = firebase.database()
  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
  
  
  
}


function draw() {
  
  background(46,139,86)
  changebackground()
  drawSprites();
  textSize(20)
  fill("red")
  stroke("black")
  text("remaining food :" + foodS, 240, 20)
  textSize(20)
  fill("white")
  stroke("red")
  text("Add Food", 270, 50)
  text("Feed", 450, 50)
  
  console.log(World.frameCount)
  
  //add styles here
  fill(255, 255, 254);
  textSize(15)

  if (mousePressedOver(addFood)) {
    addStock(foodS);
    dog.addImage(happyDogImg)
    milk.visible = true;
  }
  if (mousePressedOver(feed)) {
    writeStock(foodS)
    dog.addImage(happyDogImg)
    milk.visible = false;
  }
  if(gameState!=="hungry"){
    background(garden)
    
  }
 if(World .frameCount>=400 ||  World.frameCount>=1400 || World.frameCount>=2400){
   gameState = "not hungry"
 }else{
   gameState="hungry"
 }
 if(World.frameCount>=1000 && World.frameCount<=1399 || World.frameCount>=2000&&World.frameCount<=2399){
  
  gameState = "hungry"
 }
 

 
feed.visible = true
addFood.visible=true
 
}

function changebackground(){
  
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1
  }
  database.ref('/').update({
    Food: x
  })
}

function addStock(y) {
  if (y <= 0) {
    y = y + 1;
  } else {
    y = y + 1
  }
  database.ref('/').update({
    Food: y
  })
}





