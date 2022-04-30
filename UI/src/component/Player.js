import React,{useState,useRef,useEffect} from 'react';
import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";
import {
    Shuffle,
    ArrowRepeat,
    Heart,
    BoxArrowUpRight,
    HeartFill
} from "https://cdn.skypack.dev/react-bootstrap-icons@1.5.0";

function Player(props) {
    const audioElement = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const userOptions = React.createContext({shuffle: false, repeat: false });

    const options = React.useContext(userOptions)
    const [shuffl, setShuffle] = React.useState(options.shuffle)
    const [repet, setRepeat] = React.useState(options.repeat)
    const [fav, setFav] = React.useState(props.songs[props.currentSongIndex].favorited)


    useEffect(() => setFav(props.songs[props.currentSongIndex].favorited))

    const shuffle = ()=>{
        options.shuffle = !options.shuffle
        options.repeat = false
        setShuffle(!shuffl)
        setRepeat(false)
    }

    const repeat = () => {
        options.repeat = !options.repeat
        options.shuffle = false
        setShuffle(false)
        setRepeat(!repet)
    }

    const favorite = () => {
        props.songs[props.currentSongIndex].favorited = !props.songs[props.currentSongIndex].favorited
        setFav(props.songs[props.currentSongIndex].favorited)
    }

    const openURL = () => {
        window.open(props.songs[props.currentSongIndex].url, "_blank")
    }

    useEffect(() => {
        if (isPlaying) {
            if (shuffl === true){
                props.setCurrentSongIndex(Math.floor(Math.random() * props.songs.length));
            }
            if (repet === true) {
                props.setNextSongIndex(props.currentSongIndex);
            }
            audioElement.current.play();
        }
        else {
            audioElement.current.pause();
        }
    });

    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.songs.length - 1) {
                    temp = 0;
                }

                return temp;
            });
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.songs.length - 1;
                }

                return temp;
            });
        }
    };

    //console.log(audioElement.current.currentTime)

    return (
        <>
            <div className="music-player" style={{display: "inline-block"}}>
                <audio
                    src={props.songs[props.currentSongIndex].src}
                    ref={audioElement}
                ></audio>
                <PlayerDetails song={props.songs[props.currentSongIndex]} />

                <PlayerControls
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    SkipSong={SkipSong}
                />

                <div className="player__footer">
                    <ul className="list list--footer">
                        <li>
                            {
                                shuffl &&
                                <button onClick={shuffle} className="opt" style={{color: '#147CC0'}}>
                                    <Shuffle/>
                                </button>
                                ||
                                <button onClick={shuffle} className="opt" >
                                    <Shuffle/>
                                </button>
                            }
                        </li>

                        <li>
                            <button className="opt" onClick={openURL}>
                                <BoxArrowUpRight/>
                            </button>
                        </li>

                        <li>
                            {
                                fav &&
                                <button onClick={favorite}  className="opt" style={{color: '#147CC0'}}>
                                    <HeartFill/>
                                </button>
                                ||
                                <button onClick={favorite}  className="opt" >
                                    <Heart/>
                                </button>

                            }
                        </li>

                        <li>
                            {
                                repet &&
                                <button onClick={repeat} className="opt" style={{color: '#147CC0'}}>
                                    <ArrowRepeat/>
                                </button>
                                ||
                                <button onClick={repeat} className="opt">
                                    <ArrowRepeat/>
                                </button>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
export default Player;
