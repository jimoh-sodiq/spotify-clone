var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
                clientId: process.env.clientId,
                clientSecret: process.env.clientSecret,
                });
 
export  { spotifyApi };
