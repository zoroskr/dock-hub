import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(request) {
  const body = await request.json();
  const response = await fetch(process.env.API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.API_KEY,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log("🚀 ~ POST ~ data:", data);
  return NextResponse.json(data);
}
