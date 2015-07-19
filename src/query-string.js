const parameters = {};

function isArray( obj )
{
  return Array.isArray ? Array.isArray( obj ) : Object.prototype.toString.call( obj ) === '[object Array]';
}

function toArray( obj )
{
  const data = [];

  for ( let key in obj ) {
    if ( obj.hasOwnProperty( key ) ) {
      data[ key ] = obj[ key ];
    }
  }

  return data;
}

function splitParameter( param )
{
  const eq = param.indexOf('='),
        data = {
          key: decodeURIComponent( eq === -1 ? param : param.substring( 0, eq ) ),
          value: decodeURIComponent( eq === -1 ? '' : param.substring( eq + 1 ) ),
          index: null
        },
        parts = data.key.match(/([\w\d_-]+)(\[([\w\d\+\s_-]*)\])?/i);

  if ( parts !== null ) {

    if ( parts[1] !== void 0 ) {
      data.key = parts[1];
    }

    if ( parts[3] !== void 0 ) {
      data.index = parts[3];
    }

  }

  return data;
}

function parseParameter( param )
{
  if ( ! param ) {
    return;
  }

  const { key, value, index } = splitParameter( param );

  if ( index !== null ) {

    if ( ! parameters[ key ] ) {
      parameters[ key ] = index === '' || /\d+/.test( index ) ? [] : {};
    }

    switch ( true ) {
      case index === '':

        if ( ! isArray( parameters[ key ] ) ) {
          parameters[ key ] = toArray( parameters[ key ] );
        }

        parameters[ key ].push( value );

        break;
      case /\d+/.test( index ):

        parameters[ key ][ parseInt( index, 10 ) ] = value;

        break;
      case /[\w\d\+\s_-]+/.test( index ):

        parameters[ key ][ index ] = value;

        break;
    }

  } else {

    parameters[ key ] = value;

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
