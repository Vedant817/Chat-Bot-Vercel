import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json(); // Parse JSON body from request
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ text }, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while generating content.' }, { status: 500 });
    }
}
