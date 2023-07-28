import {SimplifiedAlbum} from "@spotify/web-api-ts-sdk";
export default function Album(props: { album: SimplifiedAlbum }){
    return (<article className="bg-slate-200 flex flex-col justify-items-center items-center rounded p-2 pt-5 text-center">
        <img src={props.album.images[0].url} alt={props.album.name} className="rounded w-48 mb-5"/>
        <h3 className="text-lg font-bold leading-tight max-w-xs">{props.album.name}</h3>
        <h4 className="max-w-xs">{props.album.artists.map(artist => artist.name).join(',')}</h4>
        <div>Popularity: {props.album.popularity}</div>
    </article>);
}
