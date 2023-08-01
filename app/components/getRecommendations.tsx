import { Track } from "@spotify/web-api-ts-sdk";
import { useContext, useEffect, useState } from "react";
import { Spotify } from "@/app/lib/spotify";
import SpotifyContext from "@/app/lib/store";
import TrackRow from "@/app/components/trackRow";
import TrackComponent from "@/app/components/track";

type PageState = "recommendations" | "saving" | "done";
interface Props {
  tracks: Track[];
  genre: string;
}
export default function GetRecommendations({ tracks, genre }: Props) {
  const spotify = useContext<Spotify>(SpotifyContext);
  const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([]);
  const [state, setState] = useState<PageState>("recommendations");

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

  async function createPlaylist() {
    setState("saving");
    const result = await spotify.createPlaylist(
      [...tracks, ...recommendedTracks],
      `${genre} recommendations`,
    );
    setState("done");
  }

  return (
    <section>
      {state === "recommendations" && (
        <div>
          <h1>Sweet getting recommendations...</h1>
          <div className="grid grid-cols-5 gap-2 ">
            {recommendedTracks.map((track) => (
              <TrackComponent
                key={track.id}
                track={track}
                selectTrack={selectTrack}
              />
            ))}
          </div>
          <div>
            <button onClick={createPlaylist}>Create Playlist</button>
          </div>
        </div>
      )}
      {state === "saving" && <div>Saving playlist</div>}
      {state === "done" && <div>Playlist Saved!</div>}
    </section>
  );
}
