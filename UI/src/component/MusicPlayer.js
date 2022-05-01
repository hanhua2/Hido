import React from "react";
import {useState,useEffect} from "react";
import {Player} from "./index";
import '../Music.css'


const MusicPlayer = ()=>{
    const[songs, setSongs] = useState([
        {
            "title": "Save Your Tears",
            "artist": "The Weeknd",
            "album": "After Hours",
            "track": "Save Your Tears",
            "year": "2",
            "img_src": "../../songs_images/save-your-tears.jpg",
            "src": "../../songs/save-your-tears.mp3",
            "url":"https://www.youtube.com/watch?v=XXYlFuWEuKI",
            'favorited': false,
        },
        {
            "title": "Blinding Lights",
            "artist": "The Weeknd",
            "album": "After Hours",
            "track": "Blingding Lights",
            "year": "2",
            "img_src": "../../songs_images/blinding-lights.jpg",
            "src": "../../songs/Blinding-Lights.mp3",
            "url":"https://www.youtube.com/watch?v=4NRXx6U8ABQ",
            'favorited': false,
        },
        {
            "title": "Lemon",
            "artist": "Yonezu Kenshi",
            "album": "STRAY SHEEP",
            "track": "Lemon",
            "year": "4",
            "img_src": "../../songs_images/Lemon.jpg",
            "src": "../../songs/lemon.mp3",
            "url":"https://www.youtube.com/watch?v=SX_ViT4Ra7k",
            'favorited': false,
        },
        {
            "title": "小さな恋のうた",
            "artist": "MONGOL800",
            "album": "『MESSAGE』",
            "track": "小さな恋のうた",
            "year": "21",
            "img_src": "../../songs_images/MONGOL800.jpg",
            "src": "../../songs/MONGOL800.mp3",
            "url":"https://www.youtube.com/watch?v=u8EkSB9zSpE",
            'favorited': false,
        },
        {
            "title": "Loving Strangers",
            "artist": "Russian Red",
            "album": "Habitación en Roma",
            "track": "Loving Strangers",
            "year": "12",
            "img_src": "../../songs_images/loving_strangers.jpg",
            "src": "../../songs/loving_strangers.mp3",
            "url":"https://www.youtube.com/watch?v=NgbcXig1TZ8",
            'favorited': false,
        },
        {
            "title": "Something Just Like This",
            "artist": "The Chainsmokers",
            "album": "Memories...Do Not Open",
            "track": "Something Just Like This",
            "year": "5",
            "img_src": "../../songs_images/Something_Just_Like_This.jpg",
            "src": "../../songs/Just_Like_This.mp3",
            "url":"https://www.youtube.com/watch?v=FM7MFYoylVs",
            'favorited': false,
        },
        {
            "title": "How Long Will I love You",
            "artist": "Ellie Goulding",
            "album": "Halcyon Days",
            "track": "How Long Will I love You",
            "year": "8",
            "img_src": "../../songs_images/howlong.jpg",
            "src": "../../songs/howlong.mp3",
            "url":"https://www.youtube.com/watch?v=an4ySOlsUMY",
            'favorited': false,
        },
        ]
    )

    const [currentSongIndex,setCurrentSongIndex] = useState(0);
    const [nextSongIndex,setNextSongIndex] = useState(currentSongIndex + 1);


    useEffect(()=>{
        setNextSongIndex(()=>{
            if (currentSongIndex + 1 >songs.length - 1 ){
                return 0;
            } else{
                return currentSongIndex + 1;
            }
        });
    },[currentSongIndex])

    return (
            <div className="Music">
                <Player currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} nextSongIndex={nextSongIndex} songs={songs}
                        setNextSongIndex={setNextSongIndex}/>
            </div>
    );
}

export default MusicPlayer;
