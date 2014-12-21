/*global Cell: false, Slider: false, rAF: false */

// -------------------------- demo  -------------------------- //

var canvas, ctx;
var canvasW, canvasH;
var slider;
var cells = [];
var estimateX = 0;
var selectedIndex = 0;
// var cellWidths = [ 0.33, 0.5, 0.2, 0.33, 0.4 ];
// var cellWidths = [ 0.8, 0.3, 0.8, 0.8, 0.8 ];
var cellWidths = [ 0.2, 0.2, 0.5, 0.2, 0.3, 0.2, 0.3 ];

var activeAttractor;
var activeAttractorIndex = 1;

document.addEventListener( 'DOMContentLoaded', init, false );

function init() {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  // set size
  canvasW = canvas.width = window.innerWidth - 20;
  canvasH = canvas.height = 300;

  // create cells
  var cellX = 0;
  for ( var i=0, len = cellWidths.length; i < len; i++ ) {
    var cellWidth = cellWidths[i];
    var cell = new Cell({
      width: canvasW * cellWidth,
      height: canvasH - 40,
      x: cellX,
      index: i
    });
    cellX += cell.width + 40;
    cells.push( cell );
  }

  canvas.addEventListener( 'mousedown', onMousedown, false );

  slider = new Slider();


  animate();
}

// -------------------------- animate -------------------------- //

function animate() {
  if ( !isDragging ) {
    slider.applyForce( getAttraction() );
  }

  slider.update();

  render();
  rAF( animate );
}

function getAttraction() {
  var cell = cells[ selectedIndex ];
  var attractorX = cell.x + cell.width / 2;
  var distance = -attractorX - slider.x;
  var force = distance * 0.03;
  return force;
}

// -------------------------- render -------------------------- //

function render() {
  ctx.clearRect( 0, 0, canvasW, canvasH );

  // cursor
  var cursorX = canvasW / 2;
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'hsla(300, 100%, 40%, 1)';
  ctx.beginPath();
  ctx.moveTo( cursorX, 0 );
  ctx.lineTo( cursorX , canvasH );
  ctx.stroke();
  ctx.closePath();

  // cells
  ctx.save();
  ctx.translate( slider.x + cursorX, 0 );
  for ( var i=0, len = cells.length; i < len; i++ ) {
    var cell = cells[i];
    var hue = i * 70;
    ctx.fillStyle = 'hsla(' + hue + ', 100%, 40%, 0.5)';
    ctx.fillRect( cell.x, 20, cell.width, cell.height );
    // target line
    var cellTargetX = cell.x + cell.width / 2;
    ctx.strokeStyle  = 'yellow';
    line( cellTargetX, 40, cellTargetX, cell.height );
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
  // console.log( particle.velocity );
  window.removeEventListener( 'mousemove', onMousemove, false );
  window.removeEventListener( 'mousemove', onMouseup, false );
}

function dragEnd() {
  if ( previousX ) {
    // set particle velocity
    slider.velocity = ( slider.x - previousX ) / ( currentTime - previousTime );
    slider.velocity *= 1000 / 60;
    estimateX = slider.getRestingPosition();
    // reset previousX
    previousX = null;
  } else {
    estimateX = slider.x;
  }

  // remember this for checking later
  var prevIndex = selectedIndex;

  // get closest attractor to end position
  var minDistance = Infinity;
  var targetX, distance;
  for ( var i=0, len = cells.length; i < len; i++ ) {
    var cell = cells[i];
    targetX = cell.x + cell.width / 2;
    distance = Math.abs( -estimateX - targetX );
    if ( distance < minDistance ) {
      selectedIndex = i;
      minDistance = distance;
    }
  }

  // if not enough velocity to escape current attractor
  // boost it
  if ( selectedIndex === prevIndex  ) {
    var selectedCell = cells[ selectedIndex ];
    targetX = selectedCell.x + selectedCell.width / 2;
    distance = -slider.x - targetX;
    // console.log( ~~distance, ~~slider.velocity );
    if ( distance > 0 && slider.velocity < -1 && cells[ selectedIndex + 1 ] ) {
      // if moving towards the right, and positive velocity, and the next attractor
      selectedIndex++;
    } else if ( distance < 0 && slider.velocity > 1 && cells[ selectedIndex - 1 ] ) {
      // if moving towards the left, and negative velocity, and previous attractor
      selectedIndex--;
    }
  }


  isDragging = false;

}
