// -------------------------- quadLimit -------------------------- //

// limits a value with a quadratic curve, feels nice

( function() {

function lerp( a, b, i ) {
  return ( b - a ) * i + a;
}

function quadLimit( value, curveStart, limit, reach ) {
  var direction = curveStart < limit ? 1 : -1;
  if ( value * direction < curveStart * direction ) {
    return value;
  } else if ( value * direction > reach * direction ) {
    return limit;
  }

  // within curve, let's get y value
  var denom = reach - 2 * limit + curveStart;
  // prevent divide by 0
  denom = denom === 0 ? 1 : denom;
  var a = ( limit - curveStart ) / denom;
  var b = Math.sqrt( ( value - curveStart ) / denom + a * a );
  var i1 = b - a;
  var i2 = -b - a;
  // since sqrt can be +/-, use value that is less than 1
  var i = i1 <= 1 ? i1 : i2;
  // lerp between curveStart and the limit
  var lp1 = lerp( curveStart, limit, i );
  // lerp that with the limit again
  var lp2 = lerp( lp1, limit, i );

  return lp2;
}

window.quadLimit = quadLimit;

})();
