import {topTracks} from "@/app/lib/spotify";
import {NextResponse} from "next/server";

export async function GET(request: Request, ) {

    const response = await topTracks();
    console.log(response);
    const { items } = await response.json();

    console.log(items);

    const tracks = items.slice(0, 5).map((track) => ({
        title: track.name,
        artist: track.artists.map((_artist) => _artist.name).join(", "),
        url: track.external_urls.spotify,
        coverImage: track.album.images[1],
    }));


    return NextResponse.json({tracks});
}
