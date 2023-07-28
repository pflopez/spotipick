import {getItems} from "@/app/lib/spotify";
import {NextResponse} from "next/server";

export async function GET(request: Request){
    const { searchParams } = new URL(request.url)
    const search   = searchParams.get('q') || '';
    const results =  await getItems(search);
    return NextResponse.json( results );
}

