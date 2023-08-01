import { Track } from "@spotify/web-api-ts-sdk";
import { useContext, useEffect, useState } from "react";
import { Spotify } from "@/app/lib/spotify";
import SpotifyContext from "@/app/lib/store";
import TrackComponent from "@/app/components/track";

interface Props {
  tracks: Track[];
}
export default function GetRecommendations({ tracks }: Props) {
  const spotify = useContext<Spotify>(SpotifyContext);
  const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([]);

  useEffect(() => {
    async function getRecommendations() {
      const recommendations = await spotify.getRecommendations(tracks);
      setRecommendedTracks(recommendations.tracks);
    }

    getRecommendations();
  }, [spotify, tracks]);

  function selectTrack(track: Track) {
    console.log(track);
  }

  return (
    <section>
      <h1>Sweet getting recommendations...</h1>
      <div className="grid grid-cols-5  gap-2">
        {recommendedTracks.map((track) => (
          <TrackComponent
            key={track.id}
            track={track}
            selectTrack={selectTrack}
          />
        ))}
      </div>
    </section>
  );
}
