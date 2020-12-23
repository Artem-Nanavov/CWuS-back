const allowedOrigins: string[] = ['http://localhost:3000', 'http://localhost:8000'];

export const corsOptions = {
  origin: function(origin: any, callback: Function) {
    if( !origin ) {
      return callback(null, true);
    }

    if( allowedOrigins.indexOf(origin) === -1 ){
      const msg: string = 'The CORS policy for this site does not allow access from the specified Origin.';

      return callback( new Error(msg), false );
    }

    return callback( null, true );
  },
  credentials: true,
};