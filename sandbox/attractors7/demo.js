var canvas, ctx;
var canvasW, canvasH;
var particle;
var attractors = [];
var maxDistance;
var estimateX;

document.addEventListener( 'DOMContentLoaded', init, false );

function init() {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  // set size
  canvasW = canvas.width = window.innerWidth - 20;
  canvasH = canvas.height = 240;
  

  canvas.addEventListener( 'mousedown', onMousedown, false );

  particle = new Particle( canvasW / 2, canvasH / 2 );
  var x0 = canvasW * 0.15;
  var x1 = canvasW * 0.5;
  var x2 = canvasW * 0.85;
  attractors.push( new Attractor( x0, canvasH / 2 ) );
  attractors.push( new Attractor( x1, canvasH / 2 ) );
  attractors.push( new Attractor( x2, canvasH / 2 ) );
  maxDistance = Math.abs( x1 - x0 ) * 0.5;

  animate();
}

// -------------------------- animate, render, update -------------------------- //


 ;

function animate() {
  // apply force of attractors to particle
  if ( !isDragging ) {

    for ( var i=0, len = attractors.length; i < len; i++ ) {
      var attractor = attractors[i];
      var distance = attractor.x - particle.x;
      var sign = distance < 0 ? -1 : 1;
      // normalize
      var force = Math.abs( distance ) < maxDistance ?
        Math.abs( distance ) / maxDistance : 0;
      force *= 8;
      force = distance < 0 ? -force : force;
      // particle.applyForce( force );
    }
  }

  particle.update();
  // wrap around
  if ( !isDragging ) {
    particle.x = ( particle.x + canvasW ) % canvasW;
  }
  render();
  rAF( animate );
}

function render() {
  ctx.clearRect( 0, 0, canvasW, canvasH );

  // render particle
  ctx.fillStyle = 'hsla(0, 100%, 50%, 0.5)';
  circle( particle.x, particle.y, 15 );

  // render attractor
  ctx.fillStyle = 'hsla(240, 100%, 50%, 0.5)';
  for ( var i=0, len = attractors.length; i < len; i++ ) {
    var attractor = attractors[i];
    circle( attractor.x, attractor.y, 8 );
  }

  // render estimate
  ctx.fillStyle = 'hsla(150, 100%, 25%, 0.5)';
  circle( estimateX, canvasH / 2, 4 );
}

function circle( x, y, radius ) {
  ctx.beginPath();
  ctx.arc( x, y, radius, 0, Math.PI * 2, true );
  ctx.fill();
  ctx.closePath();
}

// -------------------------- mouse -------------------------- //

var isDragging = false;

function onMousedown( event ) {
  event.preventDefault();
  isDragging = true;
  window.addEventListener( 'mousemove', onMousemove, false );
  window.addEventListener( 'mouseup', onMouseup, false );
  particle.x = event.pageX;
  particle.velocity = 0;
}

var previousX;
var previousTime;
var currentTime;

function onMousemove( event ) {
  // previous
  previousX = particle.x;
  previousTime = currentTime;
  // current
  particle.x = event.pageX;
  currentTime = new Date();
}

function onMouseup( event ) {
  if ( previousX ) {
    particle.velocity = ( particle.x - previousX ) / ( currentTime - previousTime );
    particle.velocity *= 17;
    estimateX = particle.getRestingPosition();
    previousX = null;
  }
  // console.log( particle.velocity );
  isDragging = false;
  window.removeEventListener( 'mousemove', onMousemove, false );
  window.removeEventListener( 'mousemove', onMouseup, false );
}
