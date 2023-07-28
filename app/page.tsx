import {topTracks} from "@/app/lib/spotify";

export default async function Home() {
    const tracks = await topTracks();
    return (
        <div>
            hi
            <div>
                {tracks.map( (track,i) =>
                    <div key={i}>track: {track.name}</div>)}
            </div>
        </div>
    );
}


