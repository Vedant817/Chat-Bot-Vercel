import { account, database, ID } from "@/lib/appwrite";
import { Query } from "appwrite";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { userId } = await request.json()
        const chats = await database.listDocuments(
            '666f3d2b00333918f75c',
            '666f3d3800343b0f6912',
            [
                Query.equal('userId', userId)
            ]
        )
        console.log(chats)
        return NextResponse.json({ chats }, { status: 201 })
    } catch (error) {
        console.error('Error fetching chats:', error);
        return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 });
    }
}