let canWidth = 1000;
let canHeight = 1000;
let workingImage;
let vectors = []
let noiseLevel = getNoiseLevel()
let dispersal = getDispersalLength()

window.$fxhashFeatures = {
  "noiseLevel" : noiseLevel,
  //"dispersal" : dispersal
  "dispersal" : dispersal
 //scales the values in 2D Perlin noise. 500 is very smooth, 10 is very noisey
}
function setup() {
  createCanvas(canWidth,canHeight)
  angleMode(DEGREES)
  workingImage = createImage(canWidth,canHeight)
  workingImage.loadPixels()
  fillPerlinNoise(window.$fxhashFeatures.noiseLevel)
  workingImage.updatePixels()
  vectors = getVectorFromImageColor()
}
function draw(){
  let swapIndex;
  let iterations;
  if (window.$fxhashFeatures.noiseLevel == 700 && window.$fxhashFeatures.dispersal == 100){
    iterations = 3;
  }else {
    iterations = 2
  }

  if (frameCount < iterations){
    for (let index = 0; index < workingImage.pixels.length; index += 4){
      vectorIndex = Math.floor(index/4)
      swapIndex = indexFromXY(Math.floor(vectors[vectorIndex].x),Math.floor(vectors[vectorIndex].y))
      swapPixels(index, wrapIndex(index + swapIndex, workingImage.pixels.length))
    }
    workingImage.updatePixels()

  }
  image(workingImage,0,0)
}
function keyTyped(){
  if (key === 's') {
    let date = new Date();
    dateString = '_'+date.getFullYear().toString() +'_'+(date.getMonth()+1).toString()+'_'+date.getDate().toString()

    let num = Math.floor(Math.random()*90000) + 10000;
    let n = window.$fxhashFeatures.noiseLevel.toString();
    let d = window.$fxhashFeatures.dispersal.toString();
    let name = 'perlinswap1_'+num+'_noise'+n+'_dis'+d+dateString;
    console.log(name)
    //workingImage.save(name,'jpg')
  }
}
