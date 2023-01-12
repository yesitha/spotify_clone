import react, {useEffect, useState}from 'react';
import './App.css';
import Login from './Login.js';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi  from 'spotify-web-api-js';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

const spotify=new SpotifyWebApi();

function App() {

 
  const [{user, token },dispatch]=useDataLayerValue();
  
  useEffect(()=>{
const hash=getTokenFromUrl();
window.location.hash="";
const _token=hash.access_token;
console.log('token:',_token);
if(_token){

  dispatch({
    type:"SET_TOKEN",
    token:_token,
  });
  
  
  spotify.setAccessToken(_token);
  
  spotify.getMe().then((user)=>{
    console.log("IMoji",user);
    console.log("ALieN",user)
    dispatch({
      type :'SET_USER',
      user:user,
    });
  });
  spotify.getUserPlaylists().then((playlists)=>{
    dispatch({
      type:"SET_PLAYLISTS",
      playlists:playlists,
    })
  });
  spotify.getPlaylist('51Ueo4JTyd6v7x44VmqwYl').then((response)=>{
    dispatch({
      type:"SET_DISCOVER_WEEKLY",
      discoverWeekly:response
      
    });
    console.log(response);
  })
  spotify.getMyTopArtists().then((response) =>
  dispatch({
    type: "SET_TOP_ARTISTS",
    top_artists: response,
  })
);

dispatch({
  type: "SET_SPOTIFY",
  spotify: spotify,
});
}
console.log('I Have Token>>>',token)
  },[]);

  return (
    <div className="App">
      {
        token?(
          <Player spotify={spotify}/>
        ):(
          <Login/> 
        )

      }
    
    </div>
    
  );
  
}


export default App;
