( function() {

function Particle( x, y ) {
  this.x = x;
  this.y = y;
  this.velocity = 0;
  this.accel = 0;
}

var friction = 0.04;


Particle.prototype.update = function() {
  this.velocity += this.accel;
  this.velocity *= ( 1 - friction );
  this.x += this.velocity;
  this.accel = 0;
};

Particle.prototype.applyForce = function( force ) {
  this.accel += force;
};

window.Particle = Particle;

})();
