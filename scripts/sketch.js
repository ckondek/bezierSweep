let points = [];
let canvasHeight;
let canvasWidth;

//initialize pallets
//'#F0F4EE'
let pallets = [
                ['#D78F43','#2D3950'],
                ['#ffffff','#900E10','#000000'],
                ['#ffbe00','#2e7d32','#8c1c03','#d95100','#d95100'],
                ['#D5D8DD','#5CA2BE','#135487','#135487','#1c3ffd','#febc33'],
                ['#4D493A','#918773','#918773','#420A1A','#420A1A','#4D493A','#a0183f'],
                ['#423E50','#49445C','#3C2C75','#280C8B','#2A0B95']

              ]
//initalize modes
let modes = [];
modes.push(new mode('smoke trails',pallets[2],3,60,60))
modes.push(new mode('ice blue',pallets[4],14,60,40))
modes.push(new mode('soft neon blue',pallets[5],44,60,60))
let index = 0

//initialize modes

function setup(){

  pixelDensity(1);
  canvasHeight =min(windowWidth,windowHeight)
  canvasWidth = floor(canvasHeight * 1.50)
  console.log(canvasWidth)
  createCanvas(canvasWidth,canvasHeight)
  console.log("canvas size("+canvasWidth.toString()+','+canvasHeight.toString()+")")
  strokeCap(SQUARE);



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

noLoop()
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
    textSize(18)
    text(modes[index].name,20,40)
    xpos = xpos + offset
    noiseOffset += 0.6
    updatePoints(points)

  }

}
