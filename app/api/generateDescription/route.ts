import { NextResponse } from "next/server";

const HUGGING_FACE_API_URL =
  "https://api-inference.huggingface.co/models/imvladikon/het5_summarization";

export async function POST(request: Request) {
  console.log("Received request at /api/generateDescription");

  try {
    const { content } = await request.json();

    const response = await fetch(HUGGING_FACE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: content,
        parameters: {
          max_length: 100, // Specify max length for summarization
          min_length: 50, // Optionally specify min length for summarization
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error from Hugging Face: ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();

    // Reverse the Hebrew text
    const reverseString = (str: string) => str.split("").reverse().join("");
    const correctedDescription = reverseString(
      data[0]?.summary_text || "No summary available"
    );

    return NextResponse.json({
      description: correctedDescription,
    });
  } catch (error: any) {
    console.error("Error generating description:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
