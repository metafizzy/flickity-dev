/*global Slider: false, rAF: false */

// -------------------------- demo  -------------------------- //

var canvas, ctx;
var canvasW, canvasH;
var slider;
var cells = [];
var leftBound, rightBound;
var cellWidths = [ 0.2, 0.2, 0.4, 0.2, 0.3 ];

document.addEventListener( 'DOMContentLoaded', init, false );

function init() {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  // set size
  canvasW = canvas.width = window.innerWidth - 20;
  canvasH = canvas.height = 300;

  // create cells
  var cellX = 0;
  var gutter = 40;
  for ( var i=0, len = cellWidths.length; i < len; i++ ) {
    var cellWidth = cellWidths[i];
    var cell = {
      width: canvasW * cellWidth,
      height: canvasH - 40,
      x: cellX,
      index: i
    };
    cellX += cell.width + gutter;
    cells.push( cell );
  }

  leftBound = 100;
  rightBound = canvasW - 100;

  canvas.addEventListener( 'mousedown', onMousedown, false );

  slider = new Slider( leftBound, 0 );
  slider.width = cellX - gutter;

  animate();
}

// -------------------------- animate -------------------------- //

function animate() {
  if ( !isDragging ) {
    applyLeftBoundForce();
    applyRightBoundForce();
  }

  slider.update();

  render();
  rAF( animate );
}

function applyLeftBoundForce() {
  var sliderX = slider.x;

  var distance = leftBound - sliderX;
  var force = distance * 0.05;
  force = Math.min( force, 0 );
  // prevent slider from bounds too far back
  // don't apply force if slider is returning from outside bounds
  if ( force && slider.velocity < 0 ) {
    // resting position
    var restPosition = slider.getRestingPosition();
    if ( restPosition.x < leftBound ) {
      force = ( leftBound - slider.x ) / restPosition.frictionSum - slider.velocity;
    }
  }
  slider.applyForce( force );
}

function applyRightBoundForce() {
  var sliderX = slider.x + slider.width;

  var distance = rightBound - sliderX;
  var force = distance * 0.05;
  force = Math.max( force, 0 );
  // prevent slider from bounds too far back
  // don't apply force if slider is returning from outside bounds
  if ( force && slider.velocity > 0 ) {
    // resting position
    var restPosition = slider.getRestingPosition();
    if ( restPosition.x + slider.width > rightBound ) {
      force = ( rightBound - sliderX ) / restPosition.frictionSum - slider.velocity;
    }
  }
  slider.applyForce( force );
}

// -------------------------- render -------------------------- //

function render() {
  ctx.clearRect( 0, 0, canvasW, canvasH );

  // bounds
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'hsla(300, 100%, 40%, 1)';
  line( leftBound, 0, leftBound, canvasH );
  line( rightBound, 0, rightBound, canvasH );

  // cells
  ctx.save();
  ctx.translate( slider.x, 0 );
  for ( var i=0, len = cells.length; i < len; i++ ) {
    var cell = cells[i];
    var hue = i * 70;
    ctx.fillStyle = 'hsla(' + hue + ', 100%, 40%, 0.5)';
    ctx.fillRect( cell.x, 20, cell.width, cell.height );
    // target line
    ctx.strokeStyle  = 'yellow';
    line( cell.target, 40, cell.target, cell.height );
  }

  ctx.restore();
}

function line( x1, y1, x2, y2 ) {
  ctx.beginPath();
  ctx.moveTo( x1, y1 );
  ctx.lineTo( x2, y2 );
  ctx.stroke();
  ctx.closePath();
}

function circle( x, y, radius ) {
  ctx.beginPath();
  ctx.arc( x, y, radius, 0, Math.PI * 2 );
  ctx.fill();
  ctx.closePath();
}

// -------------------------- mouse -------------------------- //

var isDragging = false;

var dragStartX;

function onMousedown( event ) {
  event.preventDefault();
  isDragging = true;
  window.addEventListener( 'mousemove', onMousemove, false );
  window.addEventListener( 'mouseup', onMouseup, false );
  dragStartX = event.pageX;
  slider.dragStartX = slider.x;
  slider.velocity = 0;
}

var previousX;
var previousTime;
var currentTime;

function onMousemove( event ) {
  // previous
  previousX = slider.x;
  previousTime = currentTime;
  // current
  var moveX = event.pageX - dragStartX;
  slider.x = slider.dragStartX + moveX;
  currentTime = new Date();
}

function onMouseup( event ) {
  dragEnd();
  window.removeEventListener( 'mousemove', onMousemove, false );
  window.removeEventListener( 'mousemove', onMouseup, false );
}

function dragEnd() {
  if ( previousX ) {
    // set slider velocity
    slider.velocity = ( slider.x - previousX ) / ( currentTime - previousTime );
    slider.velocity *= 1000 / 60;
    // reset previousX
    previousX = null;
  } else {
    estimateX = slider.x;
  }

  isDragging = false;

}
