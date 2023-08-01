"use client";
import { useEffect, useRef, useState } from "react";

type Step = "pick-genre" | "pick-album" | "get-recommendations";
import SpotifyContext from "@/app/lib/store";
import StartingGenres from "@/app/components/startingGenres";
import { Spotify } from "@/app/lib/spotify";
import TracksPicker from "@/app/components/tracks-picker";
import { Track } from "@spotify/web-api-ts-sdk";
import GetRecommendations from "@/app/components/getRecommendations";
import Connector from "@/app/components/connector";
export default function Home() {
  const [step, setStep] = useState<Step>("pick-genre");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [spotify] = useState(new Spotify());

  useEffect(() => {
    async function doAuth() {
      const auth = await spotify.sdk.getAccessToken();

      if (!auth) {
        await spotify.authenticate();
      }
    }
    doAuth();
  }, [spotify]);

  function setGenres(gens: string) {
    setSelectedGenre(gens);
    setStep("pick-album");
  }

  function getSumittedTracks(tracks: Track[]) {
    setSelectedTracks(tracks);
    setStep("get-recommendations");
  }

  return (
    <div className="max-w-5xl m-auto">
      <SpotifyContext.Provider value={spotify}>
        <Connector></Connector>
        {step === "pick-genre" && <StartingGenres submitGenres={setGenres} />}

        {step === "pick-album" && (
          <TracksPicker
            selectedGenre={selectedGenre}
            onSubmitTracks={getSumittedTracks}
          />
        )}
        {step === "get-recommendations" && (
          <GetRecommendations tracks={selectedTracks} />
        )}
      </SpotifyContext.Provider>
    </div>
  );
}
