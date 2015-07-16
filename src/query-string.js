const parameters = {},
      keyLength = {};

function parseParameter( param )
{
  if ( param === '' ) {
    return;
  }

  let arg  = param.split('='),
      val  = decodeURIComponent( arg[ 1 ] || '' ),
      part = decodeURIComponent( arg[ 0 ] ).match(/([\w_]+)(\[([\w\+\s_-]*)\])?/i);

  if ( part === null ) {
    return;
  }

  let key      = part[1],
      keyIndex = part[3];

  if ( keyIndex !== void 0 ) {

    if ( ! parameters[ key ] ) {
      parameters[ key ] = {};
      keyLength[ key ] = 0;
    }

    switch ( true ) {
      case keyIndex === '':
        parameters[ key ][ keyLength[ key ]++ ] = val;
        break;
      case /\d+/.test( keyIndex ):
        parameters[ key ][ parseInt( keyIndex, 10 ) ] = val;
        break;
      case /[\w\d\s_-]+/.test( keyIndex ):
        parameters[ key ][ keyIndex ] = val;
        break;
    }

  } else {

    parameters[ key ] = val;

  }
}

if ( document.location.search !== '' ) {

  document.location.search.substr(1).split('&').forEach( parseParameter );

}

const queryString = {
  getParameters: () => parameters,
  has: ( key ) => parameters.hasOwnProperty( key ),
  get: ( key, defaultValue = '' ) => {
    return parameters[ key ] !== void 0 ? parameters[ key ] : defaultValue;
  }
};

export default queryString;
