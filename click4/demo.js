document.addEventListener( 'DOMContentLoaded', init, false );

var button;

function init() {

  button = document.querySelector('button');

  button.addEventListener( 'click', onButtonClick2, true );
  button.addEventListener( 'click', onButtonClick1, false );

}

function onButtonClick1() {
  console.log('button click');
}

function onButtonClick2( event ) {
  event.preventDefault();
  event.stopPropagation();
}

function disable() {
  button.addEventListener( 'click', onButtonClick2, true );
}

function enable() {
  button.removeEventListener( 'click', onButtonClick2, true );
}
