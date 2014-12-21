var box;
var boxX = 0, boxY = 0;

document.addEventListener( 'DOMContentLoaded', init, false );

function init() {
  box = document.querySelector('#box');
  box.addEventListener( 'click', onClick, false );
  box.addEventListener( 'mousedown', onMousedown, false );
}

// -----  ----- //

var linkClickEvent;



// ----- mouse ----- //

var mousedownX, mousedownY;
var dragStartX, dragStartY;
var dragStartBoxX, dragStartBoxY;
var mouseDownEvent;

function onMousedown( event ) {
  event.preventDefault();
  // kludge to blur focused inputs in dragger
  var focused = document.activeElement;
  if ( focused && focused.blur ) {
    focused.blur();
  }
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
    dragStartX = event.pageX;
    dragStartY = event.pageY;
    // position of box when drag started
    dragStartBoxX = boxX;
    dragStartBoxY = boxY;

    isDragging = true;
    // disable clicks
    shouldClick = false;
  }

  if ( isDragging ) {
    boxX = dragStartBoxX + ( event.pageX - dragStartX );
    boxY = dragStartBoxY + ( event.pageY - dragStartY );
    box.style.left = boxX + 'px';
    box.style.top = boxY + 'px';
  }

}

var shouldClick = true;

function onMouseup( event) {
  if ( !isDragging ) {
    // allow click in text input
    if ( event.target.nodeName === 'INPUT' && event.target.type === 'text' ) {
      event.target.focus();
    }
  }
  console.log('mouse up');
  isDragging = false;
  setTimeout( function() {
    shouldClick = true;
  })
  
  window.removeEventListener( 'mousemove', onMousemove, false );
  window.removeEventListener( 'mouseup', onMouseup, false );
}

// ----- click ----- //

function onClick( event ) {
  if ( !shouldClick ) {
    event.preventDefault();
  } else {
    console.log('non drag click');
  }
}
