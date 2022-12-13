


function mode(name,pallet,weightRange,alphaRange, alphaFloor){
  this.name = name;
  this.pallet = pallet;
  this.weightRange = weightRange;
  this.alphaRange = alphaRange;
  this.alphaFloor = alphaFloor;
  this.alpha = function(){
                            return fxrand() * this.alphaRange  + this.alphaFloor;
                          }
  this.weight = function(){
                              return fxrand() * this.weightRange;
                            }

}



function makeBezier(points){
    noFill();
    beginShape();
      vertex(points[0],points[1])
      vertex(points[2], points[3]);
      quadraticVertex(points[4], points[5], points[6], points[7]);
      quadraticVertex(points[8], points[9], points[10], points[11]);
      quadraticVertex(points[12], points[13], points[14], points[15]);
      quadraticVertex(points[16], points[17], points[18], points[19]);
      vertex(points[20], points[21]);
    endShape();
}

function showPoints(points){
  fill(255,0,0)
  ellipse(points[0],points[1],5,5)
  ellipse(points[2],points[3],5,5)
  ellipse(points[6],points[7],5,5)
  ellipse(points[10],points[11],5,5)
  ellipse(points[14],points[15],5,5)
  ellipse(points[18],points[19],5,5)
  ellipse(points[20],points[21],5,5)

  fill(255,255,0)
  ellipse(points[4],points[5],5,5)
  ellipse(points[8],points[9],5,5)
  ellipse(points[12],points[13],5,5)
  ellipse(points[16],points[17],5,5)



}

function rp(center,range){
  return center + (fxrand() * range - range/2)
}

function updatePoints(points){
  //control points
  points[4] += fxrand() * 32 - 16
  points[5] += fxrand() * 16 - 8
  points[8] += fxrand() * 32 - 16
  points[9] += fxrand() * 16 - 8
  points[12] += fxrand() * 32 - 16
  points[13] += fxrand() * 16 - 8
  points[13] += fxrand() * 16 - 8
  points[16] += fxrand() * 16- 8
  points[17] += fxrand() * 32 - 16

  //vertices
    points[2] += fxrand() * 8 - 4
  points[11] += fxrand() * 6 - 3
  points[15] += fxrand() * 6 - 3
  points[19] += fxrand() * 2 - 1
    points[14] += fxrand() * 8 - 4

}
