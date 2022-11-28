function swapPixels(i,j){

  let c0 = workingImage.pixels[i];
  let c1 = workingImage.pixels[i+1];
  let c2 = workingImage.pixels[i+2];

  workingImage.pixels[i] = workingImage.pixels[j]
  workingImage.pixels[i+1] = workingImage.pixels[j+1]
  workingImage.pixels[i+2] = workingImage.pixels[j+2]

  workingImage.pixels[j] = c0
  workingImage.pixels[j+1] = c1
  workingImage.pixels[j+2] = c2
}
function indexFromXY (x,y){
  let index = (x * 4) + (y * workingImage.width * 4)

  return index
}
function fillPerlinNoise(noiseLevel){

  let value1;
  let value2;
  let value3;
  noiseSeed(fxrand() * 9999999)
  
  for (index = 0; index < workingImage.pixels.length; index+=4){
    value1 = noise( (XYfromIndex(index)[0] / (noiseLevel * 4)), (XYfromIndex(index)[1] / noiseLevel)) * 20 - 10
    value1 = 1 /(1 + Math.exp(- value1))
    value1 = map(value1,0,1,0,255)

    value2 = noise( (XYfromIndex(index)[0] / (noiseLevel * 4) + 100),(XYfromIndex(index)[1] / noiseLevel) +100) * 20 - 10
    value2 = 1 /(1 + Math.exp(- value2))
    value2 = map(value2,0,1,0,255)

    value3 = noise( (XYfromIndex(index)[0] / (noiseLevel * 4) + 234),(XYfromIndex(index)[1] / noiseLevel) +234) * 20 - 10
    value3 = 1 /(1 + Math.exp(- value3))
    value3 = map(value3,0,1,0,255 )

    workingImage.pixels[index] = value1;
    workingImage.pixels[index + 1] = value2;
    workingImage.pixels[index + 2] = value3;
    workingImage.pixels[index + 3] = 255;
  }
}
function getVectorFromImageColor(){
  let vectorArray = [];
  let direction
  let value
  for (index = 0; index < workingImage.pixels.length; index+=4){
    direction = createVector(window.$fxhashFeatures.dispersal,0);
    let r = workingImage.pixels[index]
    let g = workingImage.pixels[index + 1]
    let b = workingImage.pixels[index + 2]
    let brightness = (r + r+ b + g + g + g)/6    //get brighness value following formula.(R+R+B+G+G+G)/6
    let rotation = map(brightness,0,255,0,360)
    direction.setHeading(rotation)
    vectorArray.push(direction)

  }
  return vectorArray
}
function XYfromIndex (index){
  let x;
  let y;

  x = index % (workingImage.width * 4)
  y = Math.floor(index / (workingImage.width * 4))

  return [x,y]
}
function wrapIndex(num,length){
  if(num < 0){
    num = length - num
  } else if (num > length - 1) {
    num = num - length
  } else {

  }
  return num
}
function getNoiseLevel(){
  let level;
  let t = fxrand() * 100
  if (t < 30){
    level = 700
  }else if (t < 80){
    level = 300
  }else {
    level = 150
  }
  return level
}
function getDispersalLength(){
  let level;
  let t = fxrand() * 100
  if (t < 30){
    level = 100
  }else if (t < 80){
    level = 300
  }else {
    level = 700
  }
  return level
}
