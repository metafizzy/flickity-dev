( function() {

function Cell( props ) {
  this.width = props.width;
  this.height = props.height;
  this.x = props.x;
  this.index = props.index;

  this.target = this.x + this.width * 0.5;
}

window.Cell = Cell;

})();
