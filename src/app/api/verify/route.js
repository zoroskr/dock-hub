import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(request) {
  const body = await request.json();
  const response = await fetch("https://pwc9ly0elf.execute-api.sa-east-1.amazonaws.com/default/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "TcWtLz6t38akcV9uG1gKg4z4vgM6fbdt4U9BgGXR",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return NextResponse.json(data);
}
