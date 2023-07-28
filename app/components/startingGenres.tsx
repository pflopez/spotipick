'use client';

import { Spotify} from "@/app/lib/spotify";
import GenrePicker from "@/app/components/genre-picker";
import {useEffect, useState} from "react";

export default function StartingGenres(){
    const [genres, setGenres] = useState<string[]>([])
    const [spotify, setSpotify] = useState( new Spotify());
    useEffect(() => {
        async function pickGenres(){
            const {genres} = await spotify.getGenres();
            setGenres(genres);
        }

        async function authAndPickGenres(){
            const auth = await spotify.sdk.getAccessToken();

            if(!auth){
                 await spotify.authenticate();
            }else{
                return pickGenres();
            }

        }

       authAndPickGenres();
    }, [spotify]);

    function getSubmittedGenres(gens: string[]){
        console.log(gens);
    }


    return (
        <div>
            <GenrePicker genres={genres} submitGenres={getSubmittedGenres}></GenrePicker>
        </div>
        );
}
