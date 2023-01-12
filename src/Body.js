import React from 'react'
import "./Body.css"
import { useDataLayerValue } from './DataLayer'
import Header from './Header'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from './SongRow';

function Body({spotify}) {
    const[{discoverWeekly},dispatch]=useDataLayerValue();

    const playPlaylist = (id) => {
      spotify
        .play({
          context_uri: `spotify:playlist:51Ueo4JTyd6v7x44VmqwYl`,
        })
        .then((res) => {
          spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
              type: "SET_ITEM",
              item: r.item,
            });
            dispatch({
              type: "SET_PLAYING",
              playing: true,
            });
          });
        });
    };
  
    const playSong = (id) => {
      spotify
        .play({
          uris: [`spotify:track:${id}`],
        })
        .then((res) => {
          spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
              type: "SET_ITEM",
              item: r.item,
            });
            dispatch({
              type: "SET_PLAYING",
              playing: true,
            });
          });
        });
    };

  return (
    <div className='body'>
        <Header spotify={spotify}/>
        <div className="body_info">
            <img src={discoverWeekly?.images[0].url} alt=''/>
            <div className="body_infoText">
                <strong>PLAYLIST</strong>
                <h2>Discover Weekly</h2>
                <p>{discoverWeekly?.description}</p>
            </div>    
          </div>
          <div className="body_songs">
            <div className="body_icons">
              <PlayCircleFilledIcon className='Body_shuffle' onClick={playPlaylist}/>
              <FavoriteIcon fontSize='large'/>
              <MoreHorizIcon/>
            </div>
                
            {discoverWeekly?.tracks.items.map((item)=>(
                  <SongRow playSong={playSong} track={item.track}/>
                   
                ))}
                
              </div>          
             </div>
    
  );
}


export default Body;