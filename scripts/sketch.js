let canWidth;
let canHeight;
let workingImage;
let vectors = []
let noiseLevel = getNoiseLevel()
let dispersal = getDispersalLength()
let counter;
let iterations

window.$fxhashFeatures = {
  "noiseLevel" : noiseLevel,
  "dispersal" : dispersal
}

function setup() {
  counter = 0
  //canWidth =min(windowWidth -100,windowHeight-50)
//  canHeight = canWidth
canWidth =4000
canHeight = 4000
  createCanvas(canWidth,canHeight)
  angleMode(DEGREES)
  workingImage = createImage(canWidth,canHeight)
  workingImage.loadPixels()
  fillPerlinNoise(window.$fxhashFeatures.noiseLevel)
  workingImage.updatePixels()
  vectors = getVectorFromImageColor()
  if (window.$fxhashFeatures.noiseLevel == 700 && window.$fxhashFeatures.dispersal == 100){
    iterations = 2;
  }else {
    iterations = 1
  }
  console.log("drawing params-noise/dispersal/iter:",window.$fxhashFeatures.noiseLevel,window.$fxhashFeatures.dispersal,iterations)

}
function draw(){
  let swapIndex;
  if (counter < iterations){
    for (let index = 0; index < workingImage.pixels.length; index += 4){
      vectorIndex = Math.floor(index/4)
      swapIndex = indexFromXY(Math.floor(vectors[vectorIndex].x),Math.floor(vectors[vectorIndex].y))
      swapPixels(index, wrapIndex(index + swapIndex, workingImage.pixels.length))
    }
    workingImage.updatePixels()

  }
  image(workingImage,0,0)
  counter +=1

}
function keyTyped(){
  if (key === 's') {
    let date = new Date();
    let dateString = '_'+date.getFullYear().toString() +'_'+(date.getMonth()+1).toString()+'_'+date.getDate().toString()

    let num = Math.floor(Math.random()*90000) + 10000;
    let n = window.$fxhashFeatures.noiseLevel.toString();
    let d = window.$fxhashFeatures.dispersal.toString();
    let name = 'perlinswap1_'+num+'_noise'+n+'_dis'+d+'_iter_'+iterations+dateString;
    saveCanvas(name,'jpg')
    console.log('Saving: '+name+'.jpg')
  }
}
function windowResized(){
  setup()
  console.log("resizing")
}
