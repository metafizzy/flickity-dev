var box;
var boxX = 0, boxY = 0;

document.addEventListener( 'DOMContentLoaded', init, false );

function init() {
  box = document.querySelector('#box');

  // box.addEventListener( 'click', onClick, false );

  var clickables = box.querySelectorAll('a, button, input');

  for ( var i=0, len = clickables.length; i < len; i++ ) {
    var clickable = clickables[i];
    clickable.addEventListener( 'click', onClickableClick, true );
  }

  box.querySelector('button').addEventListener( 'click', function( event ) {
    console.log('button click');
  }, false );

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
  mouseDownEvent = event;
  event.preventDefault();
  // kludge to blur focused inputs in dragger
  var focused = document.activeElement;
  if ( focused && focused.blur ) {
    focused.blur()
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
    mouseDownEvent.preventDefault();

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

var isNonDragClick = false;
var isPreventingClicks = true;

function onMouseup( event) {
  if ( !isDragging ) {
    // console.log( event.target.click );
    // event.target.click();
    // event.target.focus();
    // set flag so click things can happen
    isPreventingClicks = false;

    if ( event.target.nodeName === 'INPUT' && event.target.type === 'text' ) {
      event.target.focus();
    }

    console.log(  event.target.nodeName === 'INPUT' && event.target.type );

    // HACK, reset flag
    setTimeout( function() {
      isPreventingClicks = true;
    });
  }

  isDragging = false;
  window.removeEventListener( 'mousemove', onMousemove, false );
  window.removeEventListener( 'mouseup', onMouseup, false );
}

// ----- click ----- //

function onClick() {
  console.log('click');
}

function onClickableClick( event ) {
  if ( isPreventingClicks ) {
    event.preventDefault();
  } else {
    console.log('non drag click');
  }
}
