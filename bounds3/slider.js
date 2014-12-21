( function() {

function Slider( x, y ) {
  this.x = x;
  this.y = y;
  this.velocity = 0;
  this.accel = 0;
  this.friction = 0.15;
}

Slider.prototype.update = function() {
  this.velocity += this.accel;
  this.velocity *= ( 1 - this.friction );
  this.x += this.velocity;
  this.accel = 0;
};

Slider.prototype.applyForce = function( force ) {
  this.accel += force;
};


Slider.prototype.getRestingPosition = function() {

  var fFriction = 1 - this.friction;
  var restingVelo = 0.07;
  var ticks = getBaseLog( fFriction, restingVelo / Math.abs( this.velocity ) );
  var frictionSum = ( Math.pow( fFriction, ticks + 1 ) - 1 ) / ( fFriction - 1 );
  var restX = this.x + this.velocity * fFriction * frictionSum;

  return {
    x: restX,
    frictionSum: frictionSum
  };
};


function getBaseLog( a, b ) {
  return Math.log( b ) / Math.log( a );
}


window.Slider = Slider;

})();
