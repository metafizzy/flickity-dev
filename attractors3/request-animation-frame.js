// -------------------------- requestAnimationFrame -------------------------- //

// https://gist.github.com/1866474

var lastTime = 0;
var prefixes = 'webkit moz ms o'.split(' ');
// get unprefixed rAF and cAF, if present
var rAF = window.requestAnimationFrame;
var cAF = window.cancelAnimationFrame;
// loop through vendor prefixes and get prefixed rAF and cAF
var prefix;
for( var i = 0; i < prefixes.length; i++ ) {
  if ( rAF && cAF ) {
    break;
  }
  prefix = prefixes[i];
  rAF = rAF || window[ prefix + 'RequestAnimationFrame' ];
  cAF  = cAF || window[ prefix + 'CancelAnimationFrame' ] ||
    window[ prefix + 'CancelRequestAnimationFrame' ];
}

// fallback to setTimeout and clearTimeout if either request/cancel is not supported
if ( !rAF || !cAF )  {
  rAF = function( callback ) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
    var id = window.setTimeout( function() {
      callback( currTime + timeToCall );
    }, timeToCall );
    lastTime = currTime + timeToCall;
    return id;
  };

  cAF = function( id ) {
    window.clearTimeout( id );
  };
}

