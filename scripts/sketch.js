let points = [];
let canvasHeight;
let canvasWidth;
let counter;

//initialize pallets
let pallets = [ ['#D78F43','#2D3950','#2D3950'],
                ['#B40C04','#B40C04','#CD6F1A','#DCA91A','#33663f','#0E4A5B'],
                ['#ffbe00','#2e7d32','#8c1c03','#d95100','#d95100','#11725f'],
                ['#D5D8DD','#5CA2BE','#135487','#135487','#1c3ffd','#febc33'],
                ['#760010','#420A1A','#A9192d','#a0183f','#c83e66','#be3b72','#7c4000','#A9192d'],
                ['#423E50','#49445C','#3C2C75','#280C8B','#2A0B95'],
                ['#332B2B','#4c6868','#9dcbe','#FAF9F5','#FAF9F5','#C0342E','#C0342E'],
                ['#A10F59','#42A910','#A0BD12','#5D002F','#206200','#5B6D00','#480F2C','# A10F59','#5D002F','#480F2C'],
                ['#CDCDCD','#A5A5A3','#8D8C7E','#5A565F','#8A8A8A'],
                ['#59002C','#A10000','#BC8B25','#77395B','#007D99','#B0CA97','#C8CAE6'],
                ['#1C1E93','#334900','#009300','#7BB04E','#680812','#E1D500','#5580D7']

]
//initalize modes
let modes = [];
modes.push(new mode('moonlight',pallets[0],33,60,40))     //0
modes.push(new mode('neo-rainbow',pallets[1],33,60,60))//1
modes.push(new mode('old berlin',pallets[2],14,60,30))//2
modes.push(new mode('blue lemon ice',pallets[3],44,60,60))//3
modes.push(new mode('lipstick',pallets[4],44,20,70))//4
modes.push(new mode('deep neon',pallets[5],44,60,60))//5
modes.push(new mode('grafitti',pallets[6],84,80,20))//6
modes.push(new mode('olives and grapes',pallets[7],40,80,20))//7
modes.push(new mode('smoke tails',pallets[8],40,20,30))//8
modes.push(new mode('sophisticated',pallets[9],40,20,30))//9
modes.push(new mode('tapenade',pallets[10],60,40,60))//10

let a = fxrand()
let index;

if ( a < 0.08){
  index = 5;
}else if (a < 0.17){
  index = 3
}else if (a < 0.24){
  index = 7
}else if (a < 0.35){
  index = 1
}else if (a < 0.45){
  index = 0;
}else if (a < 0.53){
  index = 8
}else if (a < 0.63){
  index = 2
}else if (a < 0.70){
  index = 6
}else if (a < 0.85){
  index = 10
}else{
  index = 9
}



window.$fxhashFeatures = {
  "pallet" : modes[index].name

}




//initialize modes
function setup(){

  pixelDensity(1);
  canvasHeight =min(windowWidth,windowHeight)
  canvasWidth = floor(canvasHeight * 1.50)
  console.log(canvasWidth)
  createCanvas(canvasWidth,canvasHeight)
  console.log("canvas size("+canvasWidth.toString()+','+canvasHeight.toString()+")")
  strokeCap(SQUARE);
  counter = 0



  let startX = 0;
  let startY = 100;
  let endX = 0;
  let endY = canvasHeight - 100;


  //Start by generating points to create bezier Curve
  points.push(startX); points.push(startY);   //x y of first point
  points.push(rp(startX,20)); points.push(rp(startY + 100,40));
  points.push(rp(startX,300)); points.push(rp(startY +150,40)); points.push(rp(startX,100)); points.push(rp(startY +250,40));
  points.push(rp(startX,450)); points.push(rp(startY +300,40)); points.push(rp(startX,100)); points.push(rp(startY +350,60));
  points.push(rp(startX,500)); points.push(rp(startY +400,40)); points.push(rp(startX,100)); points.push(rp(startY +450,40));
  points.push(rp(startX,350)); points.push(rp(canvasHeight - 200,40)); points.push(rp(startX,100)); points.push(rp(canvasHeight - 200,40));
  points.push(endX); points.push(endY);

//noLoop()
}

function draw(){

  background(0)
  let xpos = 200.0
  let noiseOffset = 0.01
  let offset

  while (xpos < canvasWidth - 200){
    offset = noise(noiseOffset) * 8
    push()
    translate(xpos,0,0)
    let a = modes[index].alpha()

    let c = color(modes[index].pallet[Math.floor(fxrand() * modes[index].pallet.length)])
    c.setAlpha(a)
    stroke(c)

    let w = modes[index].weight()
    console.log(w)
    strokeWeight(w)
    makeBezier(points)
      //move 3 pixels to the left, draw a thin white line
      translate(3,0,0)
      stroke(255,100)
      strokeWeight(1)
      makeBezier(points)
      //move one more picels to the left drae a black line.
      translate(1,0,0)
      stroke(0,50)
      strokeWeight(1)
      makeBezier(points)

    //showPoints(points)
    pop()
    fill(modes[index].pallet[1])
    //textSize(18)
    //text(modes[index].name,20,40)

      xpos = xpos + offset



    noiseOffset += 0.6
    updatePoints(points)

  }
  counter++
  if (counter == 2){
      fxpreview()
      noLoop()
    }


}
