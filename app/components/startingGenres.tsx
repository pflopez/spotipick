import { Spotify } from "@/app/lib/spotify";
import GenrePicker from "@/app/components/genre-picker";
import { useContext, useEffect, useState } from "react";
import SpotifyContext from "@/app/lib/store";

export default function StartingGenres({
  submitGenres,
}: {
  submitGenres: (genre: string) => void;
}) {
  const [genres, setGenres] = useState<string[]>([]);
  const spotify = useContext<Spotify>(SpotifyContext);

  useEffect(() => {
    async function pickGenres() {
      const { genres } = await spotify.getGenres();
      setGenres(genres);
    }
    pickGenres();
  }, [spotify]);

  return (
    <div>
      <GenrePicker genres={genres} submitGenre={submitGenres}></GenrePicker>
    </div>
  );
}
