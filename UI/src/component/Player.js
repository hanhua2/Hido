import React,{useState,useRef,useEffect} from 'react';
import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";


function Player(props) {
    const audioElement = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            audioElement.current.play();
        } else {
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
                            <a href="#" className="list__link">
                                <i className="fa fa-heart-o"></i>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="list__link">
                                <i className="fa fa-random"></i>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="list__link">
                                <i className="fa fa-undo"></i>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="list__link">
                                <i className="fa fa-ellipsis-h"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
export default Player;
