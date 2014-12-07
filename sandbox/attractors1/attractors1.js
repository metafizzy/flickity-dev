var canvas, ctx;
var canvasW, canvasH;
var particle;

document.addEventListener( 'DOMContentLoaded', init, false );

function init() {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  // set size
  canvasW = canvas.width = window.innerWidth - 20;
  canvasH = canvas.height = window.innerHeight - 80;

  canvas.addEventListener( 'mousedown', onMousedown, false );

  particle = new Particle( canvasW / 2, canvasH / 2 );

  animate();
}

// -------------------------- animate, render, update -------------------------- //

function animate() {
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
  ctx.beginPath();
  ctx.arc( particle.x, particle.y, 15, 0, Math.PI * 2, true );
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
    previousX = null;
  }
  // console.log( particle.velocity );
  isDragging = false;
  window.removeEventListener( 'mousemove', onMousemove, false );
  window.removeEventListener( 'mousemove', onMouseup, false );
}
