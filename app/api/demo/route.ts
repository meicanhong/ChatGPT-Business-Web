import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));

export async function GET(req: NextRequest) {
  await client.connect();
  await client.set("key", "hello world");
  const value = await client.get("key");
  await client.disconnect();
  return NextResponse.json({
    hello: value,
  });
}
