var box;
var boxX = 0, boxY = 0;

document.addEventListener( 'DOMContentLoaded', init, false );

function init() {
  box = document.querySelector('#box');

  box.addEventListener( 'mousedown', onMousedown, false );
  box.addEventListener( 'click', onClick, false );
}

// ----- mouse ----- //

var dragStartX, dragStartY;
var dragStartBoxX, dragStartBoxY;
var mouseDownEvent;

function onMousedown( event ) {
  // event.preventDefault();
  dragStartX = event.pageX;
  dragStartY = event.pageY;
  // position of box when drag started
  dragStartBoxX = boxX;
  dragStartBoxY = boxY;

  window.addEventListener( 'mousemove', onMousemove, false );
  window.addEventListener( 'mouseup', onMouseup, false );
}

function onMousemove( event ) {
  boxX = dragStartBoxX + ( event.pageX - dragStartX );
  boxY = dragStartBoxY + ( event.pageY - dragStartY );
  box.style.left = boxX + 'px';
  box.style.top = boxY + 'px';
}

function onMouseup() {
  window.removeEventListener( 'mousemove', onMousemove, false );
  window.removeEventListener( 'mouseup', onMouseup, false );
}

// ----- click ----- //

function onClick() {
  console.log('click');
}
