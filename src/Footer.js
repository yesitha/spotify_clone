import React, { useEffect } from 'react'
import "./Footer.css"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import {Grid,Slider} from "@mui/material";
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import { useDataLayerValue} from "./DataLayer";



function Footer({spotify}) {
    const [{ token, item, playing }, dispatch] = useDataLayerValue();
    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
          console.log(r);
    
          dispatch({
            type: "SET_PLAYING",
            playing: r.is_playing,
          });
    
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
        });
      }, [spotify]);
    
      const handlePlayPause = () => {
        if (playing) {
          spotify.pause();
          dispatch({
            type: "SET_PLAYING",
            playing: false,
          });
        } else {
          spotify.play();
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        }
      };
    
      const skipNext = () => {
        spotify.skipToNext();
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
      };
    
      const skipPrevious = () => {
        spotify.skipToPrevious();
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
      };

  return (
    <div className='footer'>
        <div className='footer_left'>
            <img src=''className='footer_album_logo'></img>
            <div className='footer_songInfo'>
                <h4>YEah..</h4>
                <p>User</p>
            </div>
        </div>
        <div className='footer_center'>
            <ShuffleIcon className='footer_green'/>
            <SkipPreviousIcon className='footer_icon'/>
            <PlayCircleOutlineIcon fontSize="large" className='footer_icon'/>
            <SkipNextIcon className='footer_icon'/>
            <RepeatIcon className="footer_green"/>
        </div>
        <div className='footer_right'>
        <Grid container spacing={2}>
            <Grid item >
                <PlaylistPlayIcon/>
            </Grid>
            <Grid item>
                <VolumeDownIcon/>
            </Grid>
            <Grid item xs>
               <Slider/>
            </Grid>
            
        </Grid>
        </div>
    </div>
  )
}

export default Footer