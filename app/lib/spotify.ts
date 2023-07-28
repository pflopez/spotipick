

export const getAccessToken = async () => {
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN || '';

    console.log('the refresh token is :', 's:', refresh_token)

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    });


    return  await response.json();;
};

export async function topTracks(): Promise<any[]> {
    const { access_token } = await getAccessToken();
    const res = await fetch("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log(res);
        throw new Error('Failed to fetch data')
    }
    // @ts-ignore
    const json = await res.json();
    console.log('the json is:', json);

    return json.items;
};

export const topArtists = async () => {
    const { access_token } = await getAccessToken();

    return fetch("https://api.spotify.com/v1/me/top/artists", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};
