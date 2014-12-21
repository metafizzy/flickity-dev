( function() {

function Particle( x, y ) {
  this.x = x;
  this.y = y;
  this.velocity = 0;
  this.accel = 0;
  this.friction = 0.25;
}


Particle.prototype.update = function() {
  this.velocity += this.accel;
  this.velocity *= ( 1 - this.friction );
  this.x += this.velocity;
  this.accel = 0;
};

Particle.prototype.applyForce = function( force ) {
  this.accel += force;
};

Particle.prototype.getRestingPosition = function() {
  // get how many ticks until velocity is slow
  var restingVelo = 0.07;
  var ticks = getBaseLog( 1 - this.friction, restingVelo / Math.abs( this.velocity ) );
  // integrate to determine resting position
  /*
  var x = this.x;
  var velo = this.velocity;
  while ( ticks > 0 ) {
    velo *= 1 - this.friction;
    x += velo;
    ticks--;
  }
  */
  // http://mikestoolbox.com/powersum.html
  var damping = 1 - this.friction;
  var sum = ( Math.pow( damping, ticks + 1 ) - 1 ) / ( damping - 1 );
  return this.x + this.velocity * damping * sum;
}

function getBaseLog( a, b ) {
  return Math.log( b ) / Math.log( a );
}



window.Particle = Particle;

})();
