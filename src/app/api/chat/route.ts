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

        //! Simulate a streaming response with a delay
        let responseText = '';
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                for (const word of text.split(' ')) {
                    responseText += `${word} `;
                    controller.enqueue(encoder.encode(`${word} `));
                    await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate delay
                }
                controller.close();
            }
        });

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while generating content.' }, { status: 500 });
    }
}
