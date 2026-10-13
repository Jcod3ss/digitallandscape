let x = 100;
let y = 280;

let isNight = false;
let xWasPressed = false;

let sound;

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  //sound
  sound = new p5.Oscillator("sine")
  sound.freq(300);
  sound.amp(0);
  sound.start();
}

function draw(){
  
  //sky
  if (isNight){
    background(10, 15, 50);
  }else {
    background(135, 206, 250);
  }
  
  //sun and moon
  if(isNight){
    fill(255, 255, 200)
    circle(width * 0.8, height * 0.2, 65);
    
    //stars
    fill(255);
    circle(width * 0.15, height * 0,12, 4);
     circle(width * 0.35, height * 0,2, 4);
     circle(width * 0.55, height * 0,1, 4);
     circle(width * 0.7, height * 0.3, 4);
     circle(width * 0.9, height * 0,08, 4);
    
  }else{
    fill(255, 220, 80);
    circle(width * 0.8, height * 0.2, 70);
  }
  
  //mountains
  if (isNight){
    fill(45, 50, 85);
  }else{
    fill(90, 100, 170);
  }
  
  triangle(
    width * 0.05, height * 0.75,
    width * 0.3, height * 0.3,
  width * 0.55, height * 0.75);
  
  //floor
  if (isNight){
    fill(25, 75, 50);
  }else{
    fill(60, 170, 100);
  }
  rect(0, height * 0.75, width, height * 0.25);
  
  //controller
  let controllers = navigator.getGamepads();
  let controller = controllers[0];
  
  if(controller){
    
    //left stick moves bird
    if (controller.axes[0] < -0.3){
      x = x - 3;
    }
    if(controller.axes[0] > 0.3){
      x = x + 3;
    }
    if(controller.axes[1] < -0.3){
      y = y - 3;
    }
    if(controller.axes[1] > 0.3){
      y = y + 3;
    }
    
    //d pad move left and right
    if(controller.buttons[14].pressed){
      x = x - 3;
    }
    if(controller.buttons[15].pressed){
      x = x + 3;
    }
    // x button changes time of day
    let xPressed = controller.buttons[2].pressed;
    
    if(xPressed && !xWasPressed){
      isNight = !isNight;
    }
    xWasPressed = xPressed;
    
    //a button is sound
    if (controller.buttons[0].pressed){
      userStartAudio();
      
      if(isNight){
        sound.freq(800);
      }else{
        sound.freq(300);
      }
      sound.amp(0.2, 0.05);
      sound.amp(0, 0.3);
    }
  }
    // bird stays inside canvas
    x = constrain(x, 20, width - 20);
    y = constrain(y, 20, height * 0.75 - 20);
    
    //bird
    if(isNight){
      
      //bird body
      fill(100, 200, 255);
      ellipse(x, y, 40, 25);
      
      //bird head
      fill(130, 220, 255);
      circle(x + 12, y - 10, 22);
      
      //bird eye
      fill(255);
      circle(x + 18, y - 12, 4);
      
      //bird beak
      fill(255, 180, 0);
      triangle(
      x + 22, y - 8,
      x + 34, y - 4,
      x + 22, y);
      
      //wings
      fill(50, 140, 200);
      ellipse(x - 3, y, 22, 12);
    }else{
      //pink color
      fill(255, 100, 150);
      circle(x, y, 35);
    }
    
    //on screen instructions
    fill(255);
    textSize(15);
    textAlign(LEFT);
    
    text("left stick move", 15, 25);
    text("x button changes day to night", 15, 48);
    text("a button plays sound", 15, 71);
  }
  //canvas to fit window
  function windowResized(){
    reSizeCanvas(windowWidth, windowHeight);
  }
