// ----- Slider ----- //

( function() {

function Slider() {
  this.x = 0;
  this.accel = 0;
  this.velocity = 0;
  this.friction = 0.3;
}

Slider.prototype.update = function() {
  this.velocity += this.accel;
  this.velocity *= ( 1 - this.friction );
  this.x += this.velocity;
  // reset acceleration
  this.accel = 0;
};

Slider.prototype.applyForce = function( force ) {
  this.accel += force;
};

Slider.prototype.getRestingPosition = function() {
  // little simulation where thing will rest
  var restingVelo = 0.07;
  var velo = this.velocity;
  var restX = this.x;
  while ( Math.abs( velo ) > restingVelo ) {
    velo *= 1 - this.friction;
    restX += velo;
  }
  return restX;
};

window.Slider = Slider;

})();
