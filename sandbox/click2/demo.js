var box;
var boxX = 0, boxY = 0;

document.addEventListener( 'DOMContentLoaded', init, false );

function init() {
  box = document.querySelector('#box');

  // box.querySelector('a').addEventListener( 'click', onAMousedown, false );
  // box.addEventListener( 'click', onClick, false );
  box.addEventListener( 'mousedown', onMousedown, false );

}

// -----  ----- //

function onAMousedown( event ) {
  console.log('on a mousedown');
  event.preventDefault();
  event.stopPropagation();
}

// ----- mouse ----- //

var mousedownX, mousedownY;
var dragStartX, dragStartY;
var dragStartBoxX, dragStartBoxY;
var mouseDownEvent;

function onMousedown( event ) {
  mouseDownEvent = event;
  event.preventDefault();
  mousedownX = event.pageX;
  mousedownY = event.pageY;

  window.addEventListener( 'mousemove', onMousemove, false );
  window.addEventListener( 'mouseup', onMouseup, false );
}

var isDragging = false;

function onMousemove( event ) {
  // don't move until mouse has moved at least 3 pixels in any direction

  var moveX = event.pageX - mousedownX;
  var moveY = event.pageY - mousedownY;
  var bigMove = Math.max( Math.abs( moveX ), Math.abs( moveY ) );

  if ( !isDragging && bigMove > 3 ) {
    mouseDownEvent.preventDefault();
    mouseDownEvent.stopPropagation();

    dragStartX = event.pageX;
    dragStartY = event.pageY;
    // position of box when drag started
    dragStartBoxX = boxX;
    dragStartBoxY = boxY;

    isDragging = true;
  }

  if ( isDragging ) {
    boxX = dragStartBoxX + ( event.pageX - dragStartX );
    boxY = dragStartBoxY + ( event.pageY - dragStartY );
    box.style.left = boxX + 'px';
    box.style.top = boxY + 'px';
  }

}

function onMouseup() {
  if ( !isDragging ) {
    console.log('non drag click');
  }

  isDragging = false;
  window.removeEventListener( 'mousemove', onMousemove, false );
  window.removeEventListener( 'mouseup', onMouseup, false );
}

// ----- click ----- //

function onClick() {
  console.log('click');
}
